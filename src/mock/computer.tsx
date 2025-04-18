import { Process, ProcessProps, ProcessStatus } from "@/components/messages";
import { AgentState, IMessageProps, MessageType } from "@/store/agentStore";
import { randomID, sleep } from "@/utils/common";
import { EE, genrateEventName } from "@/utils/events";

export const updateComputerMessage = async (updateMessage: AgentState['updateMessage']) => {
    const id = randomID();
    const newMessage = {
        content: "hello",
        type: MessageType.computer,
        id
    } satisfies IMessageProps;

    updateMessage(newMessage);

    const processes: ProcessProps[] = [
            {
                id: 1,
                status: ProcessStatus.pending,
                content: '开始处理'
            },
            {
                id: 1,
                status: ProcessStatus.processing,
                content: '处理中',
            },
            {
                id: 1,
                status: ProcessStatus.completed,
                content: '处理完成',
            },
            {
                id: 2,
                status: ProcessStatus.pending,
                content: '开始处理'
            },
            {
                id: 2,
                status: ProcessStatus.processing,
                content: '处理中',
            },
            {
                id: 2,
                status: ProcessStatus.completed,
                content: '处理完成',
            },
        ]
    for (const element of processes) {
        await sleep(1000)
        EE.emit(genrateEventName(newMessage), {
            process: element
        });
    }
}