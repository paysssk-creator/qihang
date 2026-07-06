export type PageId = "dashboard" | "quant" | "sms" | "email" | "search" | "browser";

export interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}
