"""
启航优选 — 报价引擎（双引擎）
主线: BestChange（零门槛，468交易所实时爬取）
备线: Onramper（需API Key，秒级响应）
"""

import os
import httpx
from dotenv import load_dotenv

load_dotenv()

PLATFORM_WALLET = os.getenv("PLATFORM_USDT_WALLET", "TLyD5v9eTDp3mMzpYT3kprF6WdsUc3W99d")
FEE_RATE = 0.05

# ============================================================
# 引擎一：BestChange（主线，零门槛）
# ============================================================

async def bestchange_quotes(fiat: str = "cny", amount: int = 5000) -> dict:
    """从 BestChange 爬取最优报价"""
    # TODO: Crawl4AI 每5秒缓存一次，这里直接读缓存
    # 返回格式同 Onramper，统一接口
    return {
        "engine": "bestchange",
        "provider": "auto_select",
        "usdt_total": 0,
        "fee": 0,
        "user_gets": 0,
    }


# ============================================================
# 引擎二：Onramper（备线，需 API Key）
# ============================================================

ONRAMPER_KEY = os.getenv("ONRAMPER_API_KEY", "")

async def onramper_quotes(fiat: str = "cny", crypto: str = "usdt_trc20", amount: int = 5000, payment: str = "alipay") -> dict:
    """Onramper API 报价（需 API Key）"""
    if not ONRAMPER_KEY or ONRAMPER_KEY == "pk_prod_xxxxxxxxxxxxx":
        return {"error": "onramper_not_configured"}

    url = f"https://api.onramper.com/quotes/{fiat}/{crypto}"
    params = {
        "amount": amount,
        "paymentMethod": payment,
        "walletAddress": PLATFORM_WALLET,
        "country": "cn",
    }
    headers = {"Authorization": ONRAMPER_KEY}

    async with httpx.AsyncClient(timeout=15) as http:
        resp = await http.get(url, params=params, headers=headers)
        quotes = resp.json()

    valid = [q for q in quotes if q.get("payout", 0) > 0]
    valid.sort(key=lambda q: q["payout"], reverse=True)

    if not valid:
        return {"error": "no_quotes"}

    best = valid[0]
    return {
        "engine": "onramper",
        "provider": best.get("ramp", "unknown"),
        "rate": best.get("rate", 0),
        "usdt_total": best.get("payout", 0),
        "fee": round(best.get("payout", 0) * FEE_RATE, 2),
        "user_gets": round(best.get("payout", 0) * (1 - FEE_RATE), 2),
        "quote_id": best.get("quoteId"),
        "alternatives": [
            {"provider": q.get("ramp"), "payout": q.get("payout")}
            for q in valid[1:6]
        ],
    }


# ============================================================
# 统一入口
# ============================================================

async def get_best_quote(fiat: str = "cny", amount: int = 5000) -> dict:
    """自动选择可用引擎：Onramper > BestChange"""
    # 优先 Onramper（更快更稳定）
    if ONRAMPER_KEY and ONRAMPER_KEY != "pk_prod_xxxxxxxxxxxxx":
        result = await onramper_quotes(fiat=fiat, amount=amount)
        if "error" not in result:
            return result

    # 回退 BestChange
    return await bestchange_quotes(fiat=fiat, amount=amount)
