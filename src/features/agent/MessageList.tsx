import React, { useMemo } from "react";
import { useAgentStore } from "@/store/agentStore";
import { messageRegistry } from "@/services/messageRegistry";

/**
 * Component for displaying the list of messages
 */
export const MessageList: React.FC = () => {
  // Get messages from store
  const messages = useAgentStore(state => state.messages);

  // Memoize the rendered messages to prevent unnecessary re-renders
  const renderedMessages = useMemo(() => {
    return messages.map((message) => messageRegistry.renderMessage(message));
  }, [messages]);

  return (
    <div className="flex flex-col gap-3 p-4">
      {renderedMessages}
    </div>
  );
};
