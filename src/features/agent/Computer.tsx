import withProcessFlow from "@/enhancer/withProcessFlow";
import { MessageType, useAgentStore } from "@/store/agentStore";
import { memo } from "react";

const ComputerProcessMessage = memo(withProcessFlow(() => <></>));

function Computer() {
    const messages = useAgentStore(state => state.messages)
    return <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto">
        {
            messages.filter(item => item.type === MessageType.computer).map((item) => {
                return <ComputerProcessMessage key={item.id} message={item} />
            })
        }

    </div>
}
export default memo(Computer)