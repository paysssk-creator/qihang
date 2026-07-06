// IPC 消息协议定义（Shell ↔ Browser Host ↔ AI Agent）

export interface IpcMessage {
  type: string;
  payload: unknown;
  timestamp: number;
}

// Shell → Host
export interface NavigateMessage extends IpcMessage {
  type: "navigate";
  payload: { profileId: string; url: string };
}

export interface ExecuteActionMessage extends IpcMessage {
  type: "execute_action";
  payload: {
    profileId: string;
    action: string;
    params: Record<string, unknown>;
  };
}

// Host → Shell
export interface DomTreeMessage extends IpcMessage {
  type: "dom_tree_updated";
  payload: { profileId: string; dom: unknown };
}

export interface ActionResultMessage extends IpcMessage {
  type: "action_result";
  payload: {
    profileId: string;
    success: boolean;
    error?: string;
    data?: unknown;
    screenshot?: string;
  };
}

// Shell → Agent
export interface AgentTaskMessage extends IpcMessage {
  type: "agent_task";
  payload: { task: string; profileId: string };
}

// Agent → Shell
export interface AgentResponseMessage extends IpcMessage {
  type: "agent_response";
  payload: { taskId: string; result: string; done: boolean };
}

// Agent → Shell (钱包到账通知)
export interface DepositNotification extends IpcMessage {
  type: "deposit_detected";
  payload: {
    tx_id: string;
    amount: number;
    from: string;
    fee: number;
    net: number;
    time: string;
  };
}

export const PLATFORM_WALLET = "TLyD5v9eTDp3mMzpYT3kprF6WdsUc3W99d";
