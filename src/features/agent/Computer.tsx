import withProcessFlow from "@/enhancer/withProcessFlow";
import { MessageType, useAgentStore } from "@/store/agentStore";
import { memo } from "react";

const ComputerProcessMessage = memo(withProcessFlow(() => <></>));

function Computer() {
  const messages = useAgentStore((state) => state.messages);
  return (
    <div className="flex-1 flex flex-col gap-2 mx-auto">
      {messages
        .filter((item) => item.type === MessageType.computer)
        .map((item) => {
          return <ComputerProcessMessage key={item.id} message={item} />;
        })}
    </div>
  );
}
export default memo(Computer);
