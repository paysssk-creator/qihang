import { Search, Globe, Shield, Bug } from "lucide-react";

export function SearchTools() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">搜索工具</h1>

      <div className="rounded-xl border border-atlas-border bg-atlas-panel p-1">
        <div className="flex items-center rounded-lg bg-atlas-input">
          <Search size={18} className="ml-3 text-atlas-dim" />
          <input
            type="text"
            placeholder="输入 URL / 域名 / IP ..."
            className="flex-1 bg-transparent px-3 py-3 text-sm text-atlas-text outline-none placeholder:text-atlas-dim"
          />
          <span className="mr-2 rounded bg-atlas-hover px-3 py-1 text-xs text-atlas-muted">模式</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { title: "🌐 浏览模式", desc: "AI 智能浏览操作", icon: Globe, active: true },
          { title: "🕷️ 爬虫模式", desc: "深度抓取 + AI 提取", icon: Bug, active: false },
          { title: "🛡️ 渗透模式", desc: "漏洞扫描 + 信息收集", icon: Shield, active: false },
        ].map((mode) => (
          <button
            key={mode.title}
            className={`rounded-xl border p-5 text-left transition-colors ${
              mode.active
                ? "border-brand bg-brand-dim"
                : "border-atlas-border bg-atlas-panel hover:bg-atlas-hover"
            }`}
          >
            <mode.icon size={24} className={mode.active ? "text-brand" : "text-atlas-muted"} />
            <div className="mt-3 text-sm font-medium">{mode.title}</div>
            <div className="mt-1 text-xs text-atlas-dim">{mode.desc}</div>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-atlas-border bg-atlas-panel p-5">
        <div className="text-sm text-atlas-muted">最近扫描</div>
        <div className="mt-3 space-y-2 text-sm text-atlas-dim">
          <div>暂无扫描记录 — 在上方输入目标开始</div>
        </div>
      </div>
    </div>
  );
}
