"""
启航优选 — 审计日志系统
每笔交易、每次AI操作、每次链上变动，全量记录，不可篡改
"""

import json
import os
import hashlib
from datetime import datetime, timezone
from pathlib import Path


DATA_DIR = Path(os.getenv("QIHANG_DATA_DIR", "./data"))
DATA_DIR.mkdir(parents=True, exist_ok=True)


def _hash(data: str) -> str:
    return hashlib.sha256(data.encode()).hexdigest()[:16]


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


# ============================================================
# 审计日志核心
# ============================================================

class AuditLog:
    """不可变审计日志"""

    def __init__(self, name: str):
        self.name = name
        self.path = DATA_DIR / f"audit_{name}.jsonl"
        self._hash_chain: list[str] = []

    def write(self, event: str, data: dict) -> str:
        """写入一条审计记录，返回记录ID"""
        entry = {
            "id": _hash(f"{_now()}{json.dumps(data)}"),
            "timestamp": _now(),
            "event": event,
            "data": data,
            "prev_hash": self._hash_chain[-1] if self._hash_chain else "genesis",
        }
        entry["hash"] = _hash(json.dumps(entry, sort_keys=True))
        self._hash_chain.append(entry["hash"])

        with open(self.path, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")

        return entry["id"]

    def read_all(self, limit: int = 100) -> list[dict]:
        """读取最近N条记录"""
        if not self.path.exists():
            return []
        lines = self.path.read_text().strip().split("\n")[-limit:]
        return [json.loads(line) for line in lines if line]

    def verify_chain(self) -> bool:
        """验证哈希链完整性——检测篡改"""
        records = self.read_all(99999)
        prev = "genesis"
        for r in records:
            if r.get("prev_hash") != prev:
                return False
            recalc = _hash(json.dumps({k: r[k] for k in r if k != "hash"}, sort_keys=True))
            if recalc != r.get("hash"):
                return False
            prev = r["hash"]
        return True


# ============================================================
# 三个专用审计日志
# ============================================================

# 1. 交易审计
tx_audit = AuditLog("transactions")

def log_exchange_order(user_id: str, fiat: str, amount: float, exchanger: str) -> str:
    return tx_audit.write("exchange_order_created", {
        "user_id": user_id,
        "fiat_currency": fiat,
        "fiat_amount": amount,
        "exchanger": exchanger,
    })

def log_exchange_completed(order_id: str, usdt_total: float, fee: float, net: float, tx_hash: str):
    tx_audit.write("exchange_completed", {
        "order_id": order_id,
        "usdt_total": usdt_total,
        "fee": fee,
        "net": net,
        "tx_hash": tx_hash,
    })

def log_exchange_failed(order_id: str, reason: str):
    tx_audit.write("exchange_failed", {
        "order_id": order_id,
        "reason": reason,
    })

# 2. 链上审计
chain_audit = AuditLog("chain")

def log_deposit_detected(tx_id: str, amount: float, from_addr: str):
    chain_audit.write("deposit_detected", {
        "tx_id": tx_id,
        "amount": amount,
        "from": from_addr,
    })

def log_forward_sent(tx_id: str, to_addr: str, amount: float, tx_hash: str):
    chain_audit.write("forward_sent", {
        "deposit_tx_id": tx_id,
        "to": to_addr,
        "amount": amount,
        "forward_tx_hash": tx_hash,
    })

# 3. AI 操作审计
ai_audit = AuditLog("ai_actions")

def log_ai_action(profile_id: str, action: str, result: str, duration_ms: int):
    ai_audit.write("ai_action", {
        "profile_id": profile_id,
        "action": action,
        "result": result,
        "duration_ms": duration_ms,
    })


# ============================================================
# 营收日报生成
# ============================================================

def generate_daily_report(date: str = None) -> dict:
    """生成指定日期的营收报告"""
    if date is None:
        date = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    records = tx_audit.read_all(99999)
    day_records = [r for r in records if r["timestamp"].startswith(date)]

    total_fee = 0.0
    total_volume = 0.0
    completed = 0
    failed = 0

    for r in day_records:
        if r["event"] == "exchange_completed":
            total_fee += r["data"]["fee"]
            total_volume += r["data"]["usdt_total"]
            completed += 1
        elif r["event"] == "exchange_failed":
            failed += 1

    return {
        "date": date,
        "completed_orders": completed,
        "failed_orders": failed,
        "total_volume_usdt": round(total_volume, 2),
        "total_fee_usdt": round(total_fee, 2),
        "hash_chain_verified": tx_audit.verify_chain(),
    }


# ============================================================
# CLI
# ============================================================

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("用法: python audit.py [report|verify|tail]")
        sys.exit(1)

    cmd = sys.argv[1]

    if cmd == "report":
        report = generate_daily_report()
        print(json.dumps(report, indent=2, ensure_ascii=False))
    elif cmd == "verify":
        ok = tx_audit.verify_chain() and chain_audit.verify_chain() and ai_audit.verify_chain()
        print(f"哈希链完整性: {'✅ 通过' if ok else '❌ 异常'}")
    elif cmd == "tail":
        for r in tx_audit.read_all(20):
            print(f"[{r['timestamp'][:19]}] {r['event']}: {json.dumps(r['data'], ensure_ascii=False)}")
    else:
        print(f"未知命令: {cmd}")
