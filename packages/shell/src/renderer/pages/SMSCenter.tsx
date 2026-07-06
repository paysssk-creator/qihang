import { Smartphone, RefreshCw, Copy, Check } from "lucide-react";

export function SMSCenter() {
  const numbers = [
    { phone: "+1 917-555-0123", country: "🇺🇸", platform: "Tiger SMS", status: "等待中", code: null },
    { phone: "+44 7700-123456", country: "🇬🇧", platform: "SuperCloud", status: "已验证", code: "889912" },
    { phone: "+86 138-0000-1234", country: "🇨🇳", platform: "超级云短信", status: "已过期", code: null },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">接码中心</h1>
        <button className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
          <Smartphone size={16} />
          获取新号码
        </button>
      </div>

      <div className="flex gap-3">
        {["🇺🇸 美国", "🇬🇧 英国", "🇨🇳 中国", "🇭🇰 香港", "🇯🇵 日本"].map((c) => (
          <button key={c} className="rounded-full border border-atlas-border px-3 py-1 text-xs text-atlas-muted hover:bg-atlas-hover">
            {c}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-atlas-border bg-atlas-panel">
        <div className="grid grid-cols-5 gap-4 border-b border-atlas-border px-5 py-3 text-xs text-atlas-dim">
          <span>号码</span>
          <span>国家</span>
          <span>平台</span>
          <span>状态</span>
          <span>验证码</span>
        </div>
        {numbers.map((n, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 px-5 py-3 text-sm">
            <span className="font-mono text-atlas-text">{n.phone}</span>
            <span>{n.country}</span>
            <span className="text-atlas-muted">{n.platform}</span>
            <span>
              {n.status === "已验证" ? (
                <span className="text-atlas-accent">{n.status}</span>
              ) : n.status === "等待中" ? (
                <span className="text-brand">{n.status} <RefreshCw size={12} className="inline animate-spin" /></span>
              ) : (
                <span className="text-atlas-dim">{n.status}</span>
              )}
            </span>
            <span>
              {n.code ? (
                <span className="flex items-center gap-1 font-mono text-atlas-accent">
                  {n.code} <Copy size={14} className="cursor-pointer text-atlas-dim hover:text-atlas-text" />
                </span>
              ) : (
                <span className="text-atlas-dim">—</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
