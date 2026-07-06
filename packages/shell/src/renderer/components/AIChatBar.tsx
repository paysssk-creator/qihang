import { Send } from "lucide-react";
import { useState } from "react";

export function AIChatBar() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // TODO: send to AI agent
    setInput("");
  };

  return (
    <div className="border-t border-atlas-border bg-atlas-panel px-4 py-3">
      <div className="flex items-center gap-2 rounded-lg border border-atlas-border bg-atlas-input px-3 py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="输入任务，AI 帮你完成..."
          className="flex-1 bg-transparent text-sm text-atlas-text outline-none placeholder:text-atlas-dim"
        />
        <div className="flex items-center gap-2">
          <span className="rounded bg-atlas-hover px-2 py-0.5 text-[11px] text-atlas-muted">
            🤖 Agent
          </span>
          <button
            onClick={handleSend}
            className="rounded p-1 text-atlas-muted hover:bg-atlas-hover hover:text-atlas-accent"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
