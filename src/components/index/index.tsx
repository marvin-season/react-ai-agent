import React from "react";
import { UIId, UIMap, updateMessage, useAgentStore } from "@/store/agent";
import { EE, initUI } from "@/utils/ui-register";

// Initialize UI components
initUI();

/**
 * Main Index component
 */
export const Index: React.FC = () => {
  const store = useAgentStore();

  /**
   * Handle system message button click
   */
  const handleSystemClick = () => {
    updateMessage({
      content: " System Tips: click the btn!",
      uiId: UIId.system,
      id: Math.random().toString().slice(2),
    });
  };

  /**
   * Handle user message button click
   */
  const handleUserClick = () => {
    updateMessage({
      content: "hello, can i help you?",
      uiId: UIId.user,
      id: Math.random().toString().slice(2),
    });
  };

  /**
   * Handle bot message button click
   */
  const handleBotClick = () => {
    updateMessage({
      content: "hello",
      uiId: UIId.bot,
      id: "27392189038218309",
    });
  };

  /**
   * Handle tool message button click
   */
  const handleToolClick = () => {
    const id = Math.random().toString().slice(2);

    // Add empty tool message
    updateMessage({
      content: "",
      uiId: UIId.tool,
      id,
    });

    // Emit tool events
    setInterval(() => {
      EE.emit("tool", {
        id,
        str: "hi",
      });
    }, 10);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 p-4">
        <button
          className="cursor-pointer bg-white border px-2 py-1 rounded hover:bg-slate-200"
          onClick={handleSystemClick}
        >
          push(system)
        </button>

        <button
          className="cursor-pointer bg-white border px-2 py-1 rounded hover:bg-slate-200"
          onClick={handleUserClick}
        >
          push(user)
        </button>

        <button
          className="cursor-pointer bg-white border px-2 py-1 rounded hover:bg-slate-200"
          onClick={handleBotClick}
        >
          update(bot)
        </button>

        <button
          className="cursor-pointer bg-white border px-2 py-1 rounded hover:bg-slate-200"
          onClick={handleToolClick}
        >
          tool
        </button>
      </div>

      {/* Render messages */}
      <div className="flex flex-col gap-3 p-4">
        {store.messages.map((item) => {
          const UI = UIMap.get(item.uiId);
          if (!UI) return null;
          return <UI key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};
