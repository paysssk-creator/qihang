import { Globe, Plus, Play, Square, Settings } from "lucide-react";

export function BrowserManager() {
  const profiles = [
    { id: "profile-1", name: "Profile #1", proxy: "US-01", status: "running", url: "twitter.com" },
    { id: "profile-2", name: "Profile #2", proxy: "UK-02", status: "running", url: "gmail.com" },
    { id: "profile-3", name: "Profile #3", proxy: "JP-03", status: "idle", url: "—" },
    { id: "profile-4", name: "Profile #4", proxy: "HK-04", status: "idle", url: "—" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">浏览器</h1>
        <button className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
          <Plus size={16} />
          新建 Profile
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {profiles.map((p) => (
          <div key={p.id} className="rounded-xl border border-atlas-border bg-atlas-panel p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${p.status === "running" ? "bg-atlas-accent" : "bg-atlas-dim"}`} />
                <span className="text-sm font-medium">{p.name}</span>
              </div>
              <div className="flex gap-1">
                {p.status === "running" ? (
                  <button className="rounded p-1 text-atlas-dim hover:bg-atlas-hover hover:text-red-400">
                    <Square size={14} />
                  </button>
                ) : (
                  <button className="rounded p-1 text-atlas-dim hover:bg-atlas-hover hover:text-atlas-accent">
                    <Play size={14} />
                  </button>
                )}
                <button className="rounded p-1 text-atlas-dim hover:bg-atlas-hover hover:text-atlas-text">
                  <Settings size={14} />
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-atlas-dim">代理:</span>
                <span className="text-atlas-muted">{p.proxy}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-atlas-dim">当前:</span>
                <span className="text-atlas-muted">{p.url}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
