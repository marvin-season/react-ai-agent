import React from "react";
import { ChatInterface } from "@/features/chat";

/**
 * Main application component
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Chat Application</h1>
        <p className="text-gray-600">A well-structured React application</p>
      </header>

      <main>
        <ChatInterface />
      </main>
    </div>
  );
};

export default App;
