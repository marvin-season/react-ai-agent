import { ToolProcess, ProcessProps } from "@/components/process";
import { processRegistry } from "@/services/processRegistry";
import { IMessageProps } from "@/store/agentStore";
import { BaseMessageProps } from "@/types";
import { EE, genrateEventName } from "@/utils/events";
import { ComponentType, FC, ReactNode, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export const ProcessFlow: FC<BaseMessageProps> = ({ message }) => {
  const [processes, setProcesses] = useImmer<ProcessProps[]>([]);

  useEffect(() => {
    // Handler for tool events
    const handler = ({ process }: { process: ProcessProps }) => {
      console.log("process", process);
      setProcesses((draft) => {
        // 使用 draft 而不是 processes 来查找索引
        const index = draft.findIndex((item) => item.id === process.id);
        if (index > -1) {
          // 直接修改 draft，Immer 会处理不可变性
          draft[index] = process;
        } else {
          // 使用 push 方法添加新元素
          draft.push(process);
        }
      });
    };
    const event = genrateEventName(message);
    console.log("event", event);
    // Subscribe to tool events
    EE.on(event, handler);

    // Cleanup subscription on unmount
    return () => {
      EE.off(event, handler);
    };
  }, [message.id, setProcesses]);
  if (processes.length === 0) return null;

  return (
    <div className="w-full break-words bg-white border p-4 rounded-xl text-sm overflow-y-auto">
      {processes.map((props, index) => processRegistry.renderProcess(props))}
    </div>
  );
};

const withProcessFlow = <P extends object & { message: IMessageProps }>(
  BaseComponent: ComponentType<P>,
) => {
  return (props: P) => {
    return (
      <>
        <BaseComponent {...props} />
        <ProcessFlow message={props.message} />
      </>
    );
  };
};

export default withProcessFlow;
