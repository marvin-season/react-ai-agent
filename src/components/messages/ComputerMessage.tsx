import React, { memo } from 'react';
import { MessageProps } from '@/store/agent';
import { MessageBadge } from './MessageBadge';

/**
 * Props for the BotMessage component
 */
interface ComputerMessageProps {
    /** Message data */
    item: MessageProps & {
        event?: string
    };
}

/**
 * Computer message UI component
 */
export const ComputerMessage = memo(({ item }: ComputerMessageProps) => {
    return (
        <div className="bg-gray-300 border rounded-md p-4 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
                <MessageBadge label="computer" />
                <MessageBadge label={item.id} bgColor="bg-blue-300" textColor="text-white" />
                {item.timestamp && (
                    <span className="text-xs text-gray-600">
                        {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                )}
            </div>
            <div className="w-full max-w-[500px] max-h-36 break-words bg-white px-2 py-1 rounded-xl text-sm overflow-y-auto">
                {item.content}
            </div>
        </div>
    );
});
