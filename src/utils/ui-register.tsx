import React, { useEffect, useState, memo } from 'react';
import { MessageProps, UIId, UIMap } from '@/store/agent';
import { EventEmitter } from 'eventemitter3';

/**
 * Global event emitter instance
 */
export const EE = new EventEmitter();

/**
 * Initialize UI components in the UIMap
 */
export function initUI() {
  UIMap.set(UIId.system, SystemUI);
  UIMap.set(UIId.user, UserUI);
  UIMap.set(UIId.bot, BotUI);
  UIMap.set(UIId.tool, ToolUI);
}

/**
 * Badge component for message UI elements
 */
const MessageBadge = memo(({
  label,
  bgColor = "bg-white",
  textColor = "text-gray-800"
}: {
  label: string | number;
  bgColor?: string;
  textColor?: string;
}) => {
  return (
    <span className={`${bgColor} ${textColor} px-2 py-1 rounded-xl text-sm`}>
      {label}
    </span>
  );
});

/**
 * System message UI component
 */
export const SystemUI = memo(({ item }: { item: MessageProps }) => {
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

/**
 * User message UI component
 */
export const UserUI = memo(({ item }: { item: MessageProps }) => {
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

/**
 * Bot message UI component
 */
export const BotUI = memo(({ item }: { item: MessageProps }) => {
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

/**
 * Tool message UI component with streaming content
 */
export const ToolUI = memo(({ item }: { item: MessageProps }) => {
  const [content, setContent] = useState(item.content || '');

  useEffect(() => {
    // Handler for tool events
    const handler = (data: { id: string; str: string }) => {
      if (data.id === item.id) {
        setContent(prev => prev + data.str);
      }
    };

    // Subscribe to tool events
    EE.on('tool', handler);

    // Cleanup subscription on unmount
    return () => {
      EE.off('tool', handler);
    };
  }, [item.id]);

  return (
    <div className="bg-gray-300 border rounded-md p-4 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <MessageBadge label="tool" />
        <MessageBadge label={item.id} bgColor="bg-blue-300" textColor="text-white" />
        {item.timestamp && (
          <span className="text-xs text-gray-600">
            {new Date(item.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="w-full max-w-[500px] max-h-36 break-words bg-white px-2 py-1 rounded-xl text-sm overflow-y-auto">
        {content}
      </div>
    </div>
  );
});