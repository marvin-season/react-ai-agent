import React from "react";
import { UIId, updateMessage } from "@/store/agent";
import { EE, genrateEventName } from "@/utils/events";

/**
 * Component for chat control buttons
 */
export const ChatControls: React.FC = () => {
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

  const handleComputerClick = () => {
    const id = Math.random().toString().slice(2);
    const newMessage = {
      content: "hello",
      uiId: UIId.computer,
      id
    }
    updateMessage(newMessage);
    setInterval(() => {
      EE.emit(genrateEventName(newMessage), {
        id
      });
    }, 1000);
  }

  return (
    <div className="flex flex-wrap gap-3 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm">
      <button
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={handleSystemClick}
        aria-label="Add system message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        System
      </button>

      <button
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={handleUserClick}
        aria-label="Add user message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        User
      </button>

      <button
        className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={handleBotClick}
        aria-label="Add bot message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 7H7v6h6V7z" />
          <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
        </svg>
        Bot
      </button>

      <button
        className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        onClick={handleToolClick}
        aria-label="Add tool message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        Tool
      </button>

      <button
        className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
        onClick={handleComputerClick}
        aria-label="Add computer message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
        Computer
      </button>
    </div>
  );
};
