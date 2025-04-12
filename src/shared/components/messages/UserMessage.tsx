import React from "react";
import { MessageProps } from "../../types/message";
import { BaseMessage } from "./BaseMessage";

/**
 * Props for the UserMessage component
 */
interface UserMessageProps {
  /** Message data */
  message: MessageProps;
}

/**
 * Component for rendering user messages
 */
export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <BaseMessage
      message={message}
      bgColor="bg-gray-200"
      typeLabel="user"
      idBadgeBg="bg-blue-400"
      contentBadgeBg="bg-green-400"
    />
  );
};
