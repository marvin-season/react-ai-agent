import React from "react";
import { AgentPanel } from "./features/agent";

/**
 * Main application component
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 text-center">
        {/* <h1 className="text-2xl font-bold text-gray-800">AI Agent 工作流处理</h1>
        <p className="text-gray-600">分步骤执行任务，支持权限控制和步骤回溯</p> */}
      </header>

      <main>
        <AgentPanel/>
        {/* <WorkflowProcessor autoGrantPermission={true} /> */}
      </main>
    </div>
  );
};

export default App;
