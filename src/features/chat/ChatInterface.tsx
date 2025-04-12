import React from "react";
import { ChatControls } from "./ChatControls";
import { MessageList } from "./MessageList";

/**
 * Main chat interface component
 */
export const ChatInterface: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <ChatControls />
      <MessageList />
    </div>
  );
};
