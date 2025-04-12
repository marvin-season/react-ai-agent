import React, { memo } from 'react';
import { MessageProps } from '@/store/agent';
import { MessageBadge } from './MessageBadge';

/**
 * Props for the SystemMessage component
 */
interface SystemMessageProps {
  /** Message data */
  item: MessageProps;
}

/**
 * System message UI component
 */
export const SystemMessage = memo(({ item }: SystemMessageProps) => {
  return (
    <div className="bg-gray-300 rounded-md p-2 flex gap-2 items-center">
      <MessageBadge label="system" />
      <MessageBadge label={item.id} bgColor="bg-blue-500" textColor="text-white" />
      <MessageBadge label={item.content} bgColor="bg-green-400" textColor="text-white" />
      {item.timestamp && (
        <span className="text-xs text-gray-600">
          {new Date(item.timestamp).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
});
