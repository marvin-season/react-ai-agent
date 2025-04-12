import React from "react";
import { UIMap, useAgentStore } from "@/store/agent";

/**
 * Component for displaying the list of messages
 */
export const MessageList: React.FC = () => {
  // Get messages from store
  const store = useAgentStore();

  return (
    <div className="flex flex-col gap-3 p-4">
      {store.messages.map((item) => {
        const UI = UIMap.get(item.uiId);
        if (!UI) return null;
        return <UI key={item.id} item={item} />;
      })}
    </div>
  );
};
