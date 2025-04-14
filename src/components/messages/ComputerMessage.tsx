import React, { memo, useEffect, useState } from 'react';
import { MessageProps, UIId } from '@/store/agent';
import { MessageBadge } from './MessageBadge';
import { EE, genrateEventName } from '@/utils/events';

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
    // process of computer handle
    const [process, setProcess] = useState<number[]>([]);
    useEffect(() => {
        // Handler for tool events
        const handler = (data: { id: string; str: string }) => {
            console.log(data)
            if (data.id === item.id) {
                setProcess(prev => {
                    return prev.concat([Date.now()])
                })
            }
        };
        const event = genrateEventName(item)
        console.log('event', event)
        // Subscribe to tool events
        EE.on(event, handler);

        // Cleanup subscription on unmount
        return () => {
            EE.off(event, handler);
        };
    }, [item.id]);
    return (
        <div className="bg-gray-300 border rounded-md p-4 flex flex-col gap-2">
            <div className='flex gap-2 items-center'>
                <span className='text-lg font-bold'>Computer</span>
                {item.timestamp && (
                    <span className="text-xs text-gray-600">
                        {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                )}
            </div>
            <div className="w-full max-w-[500px] max-h-36 break-words bg-white px-2 py-1 rounded-xl text-sm overflow-y-auto">
                {
                    process.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
            </div>
        </div>
    );
});
