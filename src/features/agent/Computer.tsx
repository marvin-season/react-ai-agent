import withProcessFlow from "@/enhancer/withProcessFlow";
import { MessageType, useAgentStore } from "@/store/agentStore";
import { memo } from "react";

const ComputerProcessMessage = memo(withProcessFlow(() => <></>));

function Computer() {
  const messages = useAgentStore((state) => state.messages);
  return (
    <div className="flex-1 flex flex-col gap-2 mx-auto rounded-md bg-slate-200 border p-4 pt-0 max-h-[400px] overflow-y-scroll">
      <h2 className="text-lg sticky top-0 bg-slate-200 p-2">Computer</h2>
      <div className="flex flex-col gap-2">
        {messages
          .filter((item) => item.type === MessageType.computer)
          .map((item) => {
            return <ComputerProcessMessage key={item.id} message={item} />;
          })}
      </div>
    </div>
  );
}
export default memo(Computer);
