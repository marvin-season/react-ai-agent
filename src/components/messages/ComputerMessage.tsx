import React, { memo, ReactNode, useEffect, useState } from 'react';
import { MessageProps, MessageType } from '@/store/agentStore';
import { MessageBadge } from './MessageBadge';
import { EE, genrateEventName } from '@/utils/events';
import { randomColorHex } from '@/utils/common';

/**
 * Props for the BotMessage component
 */
interface ComputerMessageProps {
    /** Message data */
    item: MessageProps & {
        event?: string
    };
}

type processType = () => ReactNode

export const Process = memo(({ content }: { content: string }) => {
    return <div style={{
        color: randomColorHex()
    }}>{content}</div>
})

/**
 * Computer message UI component
 */
export const ComputerMessage = memo(({ item }: ComputerMessageProps) => {
    // process of computer handle
    const [processes, setProcesses] = useState<processType[]>([]);
    useEffect(() => {
        // Handler for tool events
        const handler = (data: { process: processType }) => {
            console.log(data)
            setProcesses(prev => {
                return prev.concat([data.process])
            })
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
                    processes.map((Processes, index) => {
                        return <Processes key={index} />
                    })
                }
            </div>
        </div>
    );
});
