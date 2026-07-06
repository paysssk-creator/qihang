"""
启航优选 — Onramper 报价引擎
替代 BestChange 爬虫：API 原生支持 walletAddress
"""

import os
import httpx
from dotenv import load_dotenv

load_dotenv()

ONRAMPER_API = os.getenv("ONRAMPER_API_URL", "https://api.onramper.com")
ONRAMPER_KEY = os.getenv("ONRAMPER_API_KEY", "")
PLATFORM_WALLET = os.getenv("PLATFORM_USDT_WALLET", "TLyD5v9eTDp3mMzpYT3kprF6WdsUc3W99d")
FEE_RATE = 0.05


async def get_quotes(
    fiat: str = "cny",
    crypto: str = "usdt_trc20",
    amount: int = 5000,
    payment_method: str = "alipay",
    country: str = "cn",
) -> dict:
    """
    获取 Onramper 实时报价
    walletAddress 直接指定我们平台钱包，买完币自动到账
    """
    url = f"{ONRAMPER_API}/quotes/{fiat}/{crypto}"

    params = {
        "amount": amount,
        "paymentMethod": payment_method,
        "walletAddress": PLATFORM_WALLET,
        "country": country,
    }

    headers = {"Authorization": ONRAMPER_KEY}

    async with httpx.AsyncClient(timeout=15) as http:
        resp = await http.get(url, params=params, headers=headers)
        quotes = resp.json()

    valid = [q for q in quotes if q.get("payout", 0) > 0]
    valid.sort(key=lambda q: q["payout"], reverse=True)

    if not valid:
        return {"error": "no_quotes_available"}

    best = valid[0]
    return {
        "provider": best.get("ramp", "unknown"),
        "rate": best.get("rate", 0),
        "usdt_total": best.get("payout", 0),
        "fee": round(best.get("payout", 0) * FEE_RATE, 2),
        "user_gets": round(best.get("payout", 0) * (1 - FEE_RATE), 2),
        "quote_id": best.get("quoteId"),
        "payment_method": best.get("paymentMethod", payment_method),
        "alternatives": [
            {
                "provider": q.get("ramp"),
                "payout": q.get("payout"),
                "payment": q.get("paymentMethod", payment_method),
            }
            for q in valid[1:6]
        ],
    }
