import React, { useMemo } from "react";
import { useAgentStore } from "@/store/agent";
import { messageRegistry } from "@/services/messageRegistry";

/**
 * Component for displaying the list of messages
 */
export const MessageList: React.FC = () => {
  // Get messages from store
  const store = useAgentStore();

  // Memoize the rendered messages to prevent unnecessary re-renders
  const renderedMessages = useMemo(() => {
    return store.messages.map((message) => messageRegistry.renderMessage(message));
  }, [store.messages]);
  
  return (
    <div className="flex flex-col gap-3 p-4">
      {renderedMessages}
    </div>
  );
};
