import React, { useEffect } from "react";
import { Controls } from "./Controls";
import { MessageList } from "./MessageList";
import { MessageType, useAgentStore } from "@/store/agentStore";
import Computer from "./Computer";

/**
 * Main chat interface component
 */
export const AgentPanel: React.FC = () => {
  const initializeMessages = useAgentStore((state) => state.initializeMessages);
  useEffect(() => {
    console.log("init");
    initializeMessages([
      {
        content: " System Tips: click the btn!",
        type: MessageType.system,
        id: "otyl4xqgjoe",
        timestamp: 1744789231918,
      },
    ]);
    return () => {
      console.log("clean");
      initializeMessages([]);
    };
  }, []);
  return (
    <div className="flex flex-col w-full mx-auto">
      <Controls />
      <div className="flex gap-2 justify-center">
        <MessageList />
        <Computer />
      </div>
    </div>
  );
};
