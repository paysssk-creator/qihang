import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { QuantPanel } from "./pages/QuantPanel";
import { SMSCenter } from "./pages/SMSCenter";
import { EmailCenter } from "./pages/EmailCenter";
import { SearchTools } from "./pages/SearchTools";
import { BrowserManager } from "./pages/BrowserManager";
import { AIChatBar } from "./components/AIChatBar";
import type { PageId } from "./types";

export function App() {
  const [page, setPage] = useState<PageId>("dashboard");

  const pages: Record<PageId, JSX.Element> = {
    dashboard: <Dashboard />,
    quant: <QuantPanel />,
    sms: <SMSCenter />,
    email: <EmailCenter />,
    search: <SearchTools />,
    browser: <BrowserManager />,
  };

  return (
    <div className="flex h-screen w-screen bg-atlas-bg text-atlas-text">
      <Sidebar active={page} onChange={setPage} />
      <main className="flex flex-1 flex-col min-w-0">
        <div className="flex-1 overflow-auto p-6">{pages[page]}</div>
        <AIChatBar />
      </main>
    </div>
  );
}
