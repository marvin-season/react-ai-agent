import { memo } from 'react';
import { randomColorHex } from '@/utils/common';
import { BaseMessageProps } from '@/types';


export const Process = memo(({ content }: { content: string }) => {
    return <div style={{
        color: randomColorHex()
    }}>{content}</div>
})

/**
 * Computer message UI component
 */
export const ComputerMessage = memo<BaseMessageProps>(({ message }) => {
    return <div className='flex gap-2 items-center'>
        <span className='text-lg font-bold'>Computer</span>
        {message.timestamp && (
            <span className="text-xs text-gray-600">
                {new Date(message.timestamp).toLocaleTimeString()}
            </span>
        )}
    </div>
})