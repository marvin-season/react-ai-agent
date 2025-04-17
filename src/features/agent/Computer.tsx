import withProcessFlow from "@/enhancer/withProcessFlow";
import { MessageType, useAgentStore } from "@/store/agentStore";

const ComputerProcessMessage = withProcessFlow(() => <></>)

export default function Computer() {
    const messages = useAgentStore(state => state.messages)
    return <>
        {
            messages.filter(item => item.type === MessageType.computer).map((item) => {
                return <ComputerProcessMessage key={item.id} message={item} />
            })
        }

    </>
}