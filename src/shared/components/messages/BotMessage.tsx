import React from "react";
import { MessageProps } from "../../types/message";
import { BaseMessage } from "./BaseMessage";

/**
 * Props for the BotMessage component
 */
interface BotMessageProps {
  /** Message data */
  message: MessageProps;
}

/**
 * Component for rendering bot messages
 */
export const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return (
    <BaseMessage
      message={message}
      bgColor="bg-gray-100"
      typeLabel="bot"
      idBadgeBg="bg-blue-300"
      contentBadgeBg="bg-green-500"
    />
  );
};
