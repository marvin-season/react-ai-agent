import React, { useEffect } from "react";
import { ChatControls } from "./ChatControls";
import { MessageList } from "./MessageList";
import { initUI } from "@/utils/ui-register";

/**
 * Main chat interface component
 */
export const ChatInterface: React.FC = () => {
  // Initialize UI components
  useEffect(() => {
    initUI();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <ChatControls />
      <MessageList />
    </div>
  );
};
