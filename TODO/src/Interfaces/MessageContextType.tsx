import { CSSProperties } from "react";

interface MessageContextType {
  taskMessage: string | null;
  avatarMessage: string | null;
  setTaskMessage: (message: string | null) => void;
  setAvatarMessage: (message: string | null) => void;
  taskMessageStyle: CSSProperties;
  avatarMessageStyle: CSSProperties;
}

export default MessageContextType;
