import { ProcessProps, ProcessStatus, ProcessType } from "@/components/process";
import { AgentState, IMessageProps, MessageType } from "@/store/agentStore";
import { randomID, sleep } from "@/utils/common";
import { EE, genrateEventName } from "@/utils/events";

export const updateComputerMessage = async (
  updateMessage: AgentState["updateMessage"],
) => {
  const id = randomID();
  const newMessage = {
    content: "hello",
    type: MessageType.computer,
    id,
  } satisfies IMessageProps;

  updateMessage(newMessage);

  for (const element of generateComputerMessage(str)) {
    await sleep(1000);
    EE.emit(genrateEventName(newMessage), {
      process: element,
    });
  }
};

const str: string =
  "[开始调用天气查询][天气查询完毕][][开始调用地图查询][地图查询完毕][][开始调用翻译查询][翻译查询完毕][][开始调用语音合成][语音合成完毕][][开始调用语音播放][语音播放完毕][]";

function* generateComputerMessage(input: string) {
  const processes = input.split("[]");
  let index = 0;
  let id = 0;
  const status = [ProcessStatus.processing, ProcessStatus.completed];
  for (const progress of processes) {
    id++;
    const matches = progress.match(/\[.+?\]/g);
    if (matches) {
      for (const element of matches) {
        console.log("element", element);
        yield {
          id,
          content: element.slice(1, -1),
          status: status[index++ % status.length],
          type: ProcessType.tool,
        } satisfies ProcessProps;
      }
    }
  }
}
