import React from "react";
import { MessageProps } from "../../types/message";
import { MessageBadge } from "./MessageBadge";

/**
 * Props for the BaseMessage component
 */
interface BaseMessageProps {
  /** Message data */
  message: MessageProps;
  /** Background color class */
  bgColor?: string;
  /** Type label to display */
  typeLabel: string;
  /** Type badge background color */
  typeBadgeBg?: string;
  /** Type badge text color */
  typeBadgeText?: string;
  /** ID badge background color */
  idBadgeBg?: string;
  /** ID badge text color */
  idBadgeText?: string;
  /** Content badge background color */
  contentBadgeBg?: string;
  /** Content badge text color */
  contentBadgeText?: string;
  /** Additional content to render */
  children?: React.ReactNode;
}

/**
 * Base message component that all message types extend
 */
export const BaseMessage: React.FC<BaseMessageProps> = ({
  message,
  bgColor = "bg-gray-200",
  typeLabel,
  typeBadgeBg = "bg-white",
  typeBadgeText = "text-gray-800",
  idBadgeBg = "bg-blue-500",
  idBadgeText = "text-white",
  contentBadgeBg = "bg-green-500",
  contentBadgeText = "text-white",
  children,
}) => {
  return (
    <div className={`${bgColor} rounded-md p-2 flex flex-col gap-2`}>
      <div className="flex gap-2 items-center">
        <MessageBadge 
          label={typeLabel} 
          bgColor={typeBadgeBg} 
          textColor={typeBadgeText} 
        />
        <MessageBadge 
          label={message.id} 
          bgColor={idBadgeBg} 
          textColor={idBadgeText} 
        />
        {message.timestamp && (
          <span className="text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
      
      {message.content && (
        <MessageBadge 
          label={message.content} 
          bgColor={contentBadgeBg} 
          textColor={contentBadgeText} 
        />
      )}
      
      {children}
    </div>
  );
};
