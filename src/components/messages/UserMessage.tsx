import React, { memo } from 'react';
import { MessageProps } from '@/store/agentStore';
import { MessageBadge } from './MessageBadge';

/**
 * Props for the UserMessage component
 */
interface UserMessageProps {
  /** Message data */
  item: MessageProps;
}

/**
 * User message UI component
 */
export const UserMessage = memo(({ item }: UserMessageProps) => {
  return (
    <div className="bg-gray-200 rounded-md p-2 flex gap-2 items-center">
      <MessageBadge label="user" />
      <MessageBadge label={item.id} bgColor="bg-blue-400" textColor="text-white" />
      <MessageBadge label={item.content} bgColor="bg-green-400" textColor="text-white" />
      {item.timestamp && (
        <span className="text-xs text-gray-600">
          {new Date(item.timestamp).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
});
