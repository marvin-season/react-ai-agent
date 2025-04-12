import React from "react";
import { MessageProps } from "../../types/message";
import { BaseMessage } from "./BaseMessage";

/**
 * Props for the SystemMessage component
 */
interface SystemMessageProps {
  /** Message data */
  message: MessageProps;
}

/**
 * Component for rendering system messages
 */
export const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => {
  return (
    <BaseMessage
      message={message}
      bgColor="bg-gray-300"
      typeLabel="system"
      idBadgeBg="bg-blue-500"
      contentBadgeBg="bg-green-400"
    />
  );
};
