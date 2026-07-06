"""
启航优选 — 链上监听引擎
监听平台 USDT 钱包：TLyD5v9eTDp3mMzpYT3kprF6WdsUc3W99d
每3秒轮询，到账后 AI 自动通知 + 触发转发流程
"""

import asyncio
import os
from datetime import datetime
from dotenv import load_dotenv
from tronpy import Tron
from tronpy.providers import HTTPProvider

load_dotenv()

# ============================================================
# 配置
# ============================================================
PLATFORM_WALLET = "TLyD5v9eTDp3mMzpYT3kprF6WdsUc3W99d"
USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"  # USDT TRC20 合约地址
TRONGRID_API = "https://api.trongrid.io"
FEE_RATE = 0.05  # 5% 服务费
POLL_INTERVAL = 3  # 每3秒查一次

client = Tron(provider=HTTPProvider(TRONGRID_API))
known_txs: set[str] = set()  # 已处理的交易，防重复


# ============================================================
# 交易监听
# ============================================================

async def fetch_usdt_transfers(address: str) -> list[dict]:
    """从 TronGrid 获取 USDT TRC20 转账记录"""
    url = f"{TRONGRID_API}/v1/accounts/{address}/transactions/trc20"
    params = {
        "contract_address": USDT_CONTRACT,
        "only_to": True,       # 只看转入
        "limit": 20,
        "order_by": "block_timestamp,desc",
    }
    async with httpx.AsyncClient() as http:
        resp = await http.get(url, params=params)
        data = resp.json()
        return data.get("data", [])


def parse_transfer(tx: dict) -> dict | None:
    """解析单笔转账"""
    try:
        tx_id = tx["transaction_id"]
        if tx_id in known_txs:
            return None

        value = int(tx["value"]) / 1_000_000  # USDT 精度 6
        token = tx.get("token_info", {}).get("symbol", "USDT")
        from_addr = tx.get("from", "unknown")
        block_time = datetime.fromtimestamp(
            tx.get("block_timestamp", 0) / 1000
        )

        known_txs.add(tx_id)

        return {
            "tx_id": tx_id,
            "amount": value,
            "token": token,
            "from": from_addr,
            "to": PLATFORM_WALLET,
            "time": block_time.isoformat(),
        }
    except Exception:
        return None


async def process_deposit(tx: dict):
    """AI 处理到账"""
    fee = tx["amount"] * FEE_RATE
    net = tx["amount"] - fee

    print(f"""
    ╔══════════════════════════════════════╗
    ║  💰 USDT 到账检测                     ║
    ╠══════════════════════════════════════╣
    ║  金额:   {tx['amount']:>12.2f} USDT  ║
    ║  来自:   {tx['from']}               ║
    ║  交易:   {tx['tx_id'][:16]}...       ║
    ║  时间:   {tx['time']}               ║
    ║                                     ║
    ║  服务费: {fee:>12.2f} USDT (10%)    ║
    ║  净额:   {net:>12.2f} USDT          ║
    ╚══════════════════════════════════════╝
    """)

    # 这里触发后续流程:
    # 1. 查找这笔到账对应的用户订单
    # 2. 转发净额到用户钱包
    # 3. 通知用户 "到账了"
    return {"amount": tx["amount"], "fee": fee, "net": net, "tx_id": tx["tx_id"]}


# ============================================================
# 主循环
# ============================================================

async def monitor_loop():
    """持续监听平台钱包"""
    print(f"🔍 开始监听钱包: {PLATFORM_WALLET}")
    print(f"   每 {POLL_INTERVAL} 秒检查一次\n")

    while True:
        try:
            transfers = await fetch_usdt_transfers(PLATFORM_WALLET)
            for tx in transfers:
                parsed = parse_transfer(tx)
                if parsed:
                    await process_deposit(parsed)
        except Exception as e:
            print(f"⚠️ 查询异常: {e}")

        await asyncio.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    asyncio.run(monitor_loop())
