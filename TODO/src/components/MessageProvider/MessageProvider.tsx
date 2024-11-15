import { createContext, CSSProperties, ReactNode, useState } from "react";
import MessageContextEnam from "../../Enums/MessageContextEnums";
import MessageContextType from "../../Interfaces/MessageContextType";

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [taskMessage, setTaskMessage] = useState<string | null>(null);
  const [avatarMessage, setAvatarMessage] = useState<string | null>(null);

  function getMessageColor(message: string | null): CSSProperties {
    switch (message) {
      case MessageContextEnam.success:
        return { color: "green" };
      case MessageContextEnam.error:
        return { color: "red" };
      case MessageContextEnam.errorTime:
        return { color: "red" };
      case MessageContextEnam.info:
        return { color: "blue" };
      default:
        return { color: "black" };
    }
  }

  const taskMessageStyle = getMessageColor(taskMessage);
  const avatarMessageStyle = getMessageColor(avatarMessage);
  return (
    <MessageContext.Provider
      value={{
        taskMessage,
        avatarMessage,
        setTaskMessage,
        setAvatarMessage,
        taskMessageStyle,
        avatarMessageStyle,
      }}
    >
      {" "}
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
