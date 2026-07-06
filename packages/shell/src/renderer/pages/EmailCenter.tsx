import { Mail, Plus, Trash2 } from "lucide-react";

export function EmailCenter() {
  const emails = [
    { address: "admin@your-domain.com", type: "永久", inbox: 23 },
    { address: "biz@your-domain.com", type: "永久", inbox: 5 },
    { address: "twitter-01@your-domain.com", type: "注册", inbox: 2 },
    { address: "temp-a8x3@your-domain.com", type: "临时", inbox: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">邮箱中心</h1>
        <button className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
          <Plus size={16} />
          新建邮箱
        </button>
      </div>

      <div className="rounded-xl border border-atlas-border bg-atlas-panel">
        <div className="grid grid-cols-4 gap-4 border-b border-atlas-border px-5 py-3 text-xs text-atlas-dim">
          <span>邮箱地址</span>
          <span>类型</span>
          <span>未读</span>
          <span>操作</span>
        </div>
        {emails.map((e, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 px-5 py-3 text-sm">
            <span className="font-mono text-atlas-text">{e.address}</span>
            <span>
              <span
                className={`rounded px-2 py-0.5 text-xs ${
                  e.type === "永久"
                    ? "bg-brand-dim text-brand"
                    : e.type === "临时"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-atlas-accent/10 text-atlas-accent"
                }`}
              >
                {e.type}
              </span>
            </span>
            <span className="text-atlas-muted">{e.inbox}</span>
            <span className="flex gap-2">
              <Mail size={16} className="cursor-pointer text-atlas-dim hover:text-atlas-text" />
              <Trash2 size={16} className="cursor-pointer text-atlas-dim hover:text-red-400" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
