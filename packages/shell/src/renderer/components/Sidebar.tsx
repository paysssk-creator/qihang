import {
  LayoutDashboard,
  DollarSign,
  Smartphone,
  Mail,
  Search,
  Globe,
} from "lucide-react";
import type { PageId, NavItem } from "../types";

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "仪表盘", icon: "dashboard" },
  { id: "quant", label: "量化交易", icon: "dollar" },
  { id: "sms", label: "接码中心", icon: "phone" },
  { id: "email", label: "邮箱中心", icon: "mail" },
  { id: "search", label: "搜索工具", icon: "search" },
  { id: "browser", label: "浏览器", icon: "globe" },
];

const ICONS: Record<string, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  dollar: DollarSign,
  phone: Smartphone,
  mail: Mail,
  search: Search,
  globe: Globe,
};

interface SidebarProps {
  active: PageId;
  onChange: (page: PageId) => void;
}

export function Sidebar({ active, onChange }: SidebarProps) {
  return (
    <aside className="flex w-56 flex-col border-r border-atlas-border bg-atlas-panel">
      <div className="flex h-12 items-center gap-2 px-4 border-b border-atlas-border">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-brand text-xs font-bold text-white">
          启
        </div>
        <span className="text-sm font-semibold">启航优选</span>
      </div>

      <nav className="flex-1 space-y-0.5 p-2">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${isActive ? "bg-brand-dim text-brand" : "text-atlas-muted hover:bg-atlas-hover hover:text-atlas-text"}`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-atlas-border p-3">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-atlas-muted">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-atlas-hover text-[10px]">
            U
          </div>
          <span>未登录</span>
        </div>
      </div>
    </aside>
  );
}
