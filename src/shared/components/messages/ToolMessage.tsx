import React, { useEffect, useState } from "react";
import { MessageProps, ToolEventData } from "../../types/message";
import { BaseMessage } from "./BaseMessage";
import { useEventEmitter } from "../../hooks/useEventEmitter";

/**
 * Props for the ToolMessage component
 */
interface ToolMessageProps {
  /** Message data */
  message: MessageProps;
}

/**
 * Component for rendering tool messages with streaming content
 */
export const ToolMessage: React.FC<ToolMessageProps> = ({ message }) => {
  const [content, setContent] = useState(message.content || "");
  const { subscribe, unsubscribe } = useEventEmitter();
  
  useEffect(() => {
    // Handler for tool events
    const handleToolEvent = (data: ToolEventData) => {
      if (data.id === message.id) {
        setContent((prev) => prev + data.str);
      }
    };
    
    // Subscribe to tool events
    subscribe("tool", handleToolEvent);
    
    // Cleanup subscription on unmount
    return () => {
      unsubscribe("tool", handleToolEvent);
    };
  }, [message.id, subscribe, unsubscribe]);

  return (
    <BaseMessage
      message={message}
      bgColor="bg-gray-300"
      typeLabel="tool"
      idBadgeBg="bg-blue-300"
    >
      <div className="w-full max-h-36 break-words bg-white px-2 py-1 rounded-xl text-sm overflow-y-auto">
        {content}
      </div>
    </BaseMessage>
  );
};
