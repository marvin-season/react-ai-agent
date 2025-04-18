import { randomColorHex } from "@/utils/common";
import { CircleCheckBig, Loader } from "lucide-react";
import { memo } from "react";

export enum ProcessStatus {
  pending = "pending",
  processing = "processing",
  completed = "completed",
}
export interface ProcessProps {
  id: number;
  status: ProcessStatus;
  content: string;
}

const icons = {
  [ProcessStatus.pending]: <Loader size={16} />,
  [ProcessStatus.processing]: <Loader color="#4f4" size={16} />,
  [ProcessStatus.completed]: <CircleCheckBig color="#4f7" size={16} />,
};
export const Process = memo(({ content, status }: ProcessProps) => {
  return (
    <div className="flex gap-2 border mt-2 p-2 rounded bg-slate-50">
      <span>{icons[status]}</span>
      <span
        className="text-xs"
        style={{
          color: randomColorHex(),
        }}
      >
        {content}
      </span>
    </div>
  );
});
