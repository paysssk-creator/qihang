import { ArrowRightLeft, ChevronDown, Info, Zap } from "lucide-react";

export function QuantPanel() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">量化交易 · 法币换USDT</h1>

      <div className="rounded-xl border border-brand/30 bg-brand-dim p-5">
        <div className="flex items-start gap-3">
          <Info size={20} className="mt-0.5 shrink-0 text-brand" />
          <div className="space-y-2 text-sm text-atlas-muted">
            <div className="font-medium text-atlas-text">交易规则（Onramper 直连）</div>
            <ol className="list-inside list-decimal space-y-1">
              <li>选择法币和金额，系统实时调用 Onramper API 获取最优报价</li>
              <li>
                API 直接指定收款地址{" "}
                <span className="font-mono text-atlas-accent">TLyD5v9eTDp3...</span>
                ，买到的 USDT 自动到平台钱包
              </li>
              <li>你确认后跳转 Onramper 支付页面，用支付宝完成付款</li>
              <li>
                AI 监听链上到账，扣除{" "}
                <span className="text-atlas-accent font-semibold">5% 服务费</span>，
                剩余 USDT 自动转发到你的钱包
              </li>
              <li>
                <span className="flex items-center gap-1">
                  <Zap size={14} className="text-yellow-400" />
                  全 API 驱动，无需爬虫，秒级响应
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-atlas-border bg-atlas-panel p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm text-atlas-muted">支付方式</label>
            <button className="flex w-full items-center justify-between rounded-lg border border-atlas-border bg-atlas-input px-4 py-3 text-sm">
              <span className="flex items-center gap-2">
                <span>🇨🇳</span> CNY 支付宝
              </span>
              <ChevronDown size={16} className="text-atlas-dim" />
            </button>
          </div>
          <div>
            <label className="mb-2 block text-sm text-atlas-muted">金额 (CNY)</label>
            <input
              type="number"
              placeholder="5000"
              className="w-full rounded-lg border border-atlas-border bg-atlas-input px-4 py-3 text-sm text-atlas-text outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <ArrowRightLeft size={24} className="text-atlas-dim" />
        </div>

        <div className="mt-4 rounded-lg bg-atlas-input p-4">
          <div className="flex items-center justify-center gap-2 text-sm text-atlas-muted">
            <Zap size={14} className="text-yellow-400" /> Onramper 实时报价
          </div>
          <div className="mt-2 text-center text-3xl font-bold">5000 CNY ≈ 693.48 USDT</div>
          <div className="mt-1 text-center text-xs text-atlas-dim">
            服务费 5% (-34.67) · 到账{" "}
            <span className="text-atlas-accent">658.81 USDT</span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs text-atlas-dim">
              你的 USDT 收款地址 (到账用)
            </label>
            <input
              type="text"
              placeholder="TRx...你的钱包地址"
              className="w-full rounded-lg border border-atlas-border bg-atlas-input px-4 py-3 text-sm text-atlas-text outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-atlas-dim">
              真实姓名 (合规必需)
            </label>
            <input
              type="text"
              placeholder="张三"
              className="w-full rounded-lg border border-atlas-border bg-atlas-input px-4 py-3 text-sm text-atlas-text outline-none focus:border-brand"
            />
          </div>
          <button className="w-full rounded-lg bg-brand py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600">
            🚀 立即兑换
          </button>
        </div>
      </div>
    </div>
  );
}
