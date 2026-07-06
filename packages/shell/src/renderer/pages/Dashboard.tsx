import { DollarSign, TrendingUp, TrendingDown, Activity } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">仪表盘</h1>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "USDT 余额", value: "8,500.00", sub: "≈ $8,500.00", icon: DollarSign, up: true },
          { label: "今日交易", value: "12 笔", sub: "总额 $3,240", icon: Activity, up: true },
          { label: "活跃Profile", value: "5", sub: "3个运行中", icon: TrendingUp, up: false },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-atlas-border bg-atlas-panel p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-atlas-muted">{card.label}</span>
              <card.icon size={18} className="text-brand" />
            </div>
            <div className="mt-3 text-2xl font-bold">{card.value}</div>
            <div className="mt-1 text-xs text-atlas-dim">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-atlas-border bg-atlas-panel p-5">
        <h2 className="mb-4 text-sm font-medium text-atlas-muted">快速操作</h2>
        <div className="grid grid-cols-4 gap-3">
          {["法币换U", "打开浏览器", "新建Profile", "查看任务"].map((action) => (
            <button
              key={action}
              className="rounded-lg border border-atlas-border px-4 py-3 text-sm text-atlas-text transition-colors hover:bg-atlas-hover"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-atlas-border bg-atlas-panel p-5">
        <h2 className="mb-4 text-sm font-medium text-atlas-muted">最近活动</h2>
        <div className="space-y-2">
          {[
            { time: "12:03", text: "CNY ¥5,000 → 624.13 USDT", status: "✅" },
            { time: "11:45", text: "接码 +1 917-xxx → Google验证", status: "✅" },
            { time: "10:22", text: "邮箱 twitter-01@ 收到验证邮件", status: "✅" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="text-atlas-dim w-12">{item.time}</span>
              <span className="flex-1 text-atlas-muted">{item.text}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
