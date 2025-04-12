import React from "react";

/**
 * Props for the MessageBadge component
 */
interface MessageBadgeProps {
  /** Label text to display */
  label: string;
  /** Background color class */
  bgColor?: string;
  /** Text color class */
  textColor?: string;
}

/**
 * A badge component used in message displays
 */
export const MessageBadge: React.FC<MessageBadgeProps> = ({
  label,
  bgColor = "bg-white",
  textColor = "text-gray-800",
}) => {
  return (
    <span className={`${bgColor} ${textColor} px-2 py-1 rounded-xl text-sm`}>
      {label}
    </span>
  );
};
