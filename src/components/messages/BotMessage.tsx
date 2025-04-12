import React, { memo } from 'react';
import { MessageProps } from '@/store/agent';
import { MessageBadge } from './MessageBadge';

/**
 * Props for the BotMessage component
 */
interface BotMessageProps {
  /** Message data */
  item: MessageProps;
}

/**
 * Bot message UI component
 */
export const BotMessage = memo(({ item }: BotMessageProps) => {
  return (
    <div className="bg-gray-100 rounded-md p-2 flex gap-2 items-center">
      <MessageBadge label="bot" />
      <MessageBadge label={item.id} bgColor="bg-blue-300" textColor="text-white" />
      <MessageBadge label={item.content} bgColor="bg-green-500" textColor="text-white" />
      {item.timestamp && (
        <span className="text-xs text-gray-600">
          {new Date(item.timestamp).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
});
