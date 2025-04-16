import React, { useEffect } from "react";
import { ChatControls } from "./ChatControls";
import { MessageList } from "./MessageList";
import { MessageType, useAgentStore } from "@/store/agentStore";

/**
 * Main chat interface component
 */
export const ChatInterface: React.FC = () => {
  const initializeMessages = useAgentStore(state => state.initializeMessages)
  useEffect(() => {
    console.log('init')
    initializeMessages([
      {
        content: ' System Tips: click the btn!',
        type: MessageType.system,
        id: 'otyl4xqgjoe',
        timestamp: 1744789231918
      }
    ])
    return () => {
      console.log('clean')
      initializeMessages([])
    }
  }, [])
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <ChatControls />
      <MessageList />
    </div>
  );
};
