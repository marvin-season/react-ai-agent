import { CircleCheckBig, Loader } from "lucide-react";
import { memo } from "react";
import { ProcessProps, ProcessStatus, ProcessType } from "./type";

const icons = {
  [ProcessStatus.pending]: <Loader size={16} />,
  [ProcessStatus.processing]: <Loader color="#4f4" size={16} />,
  [ProcessStatus.completed]: <CircleCheckBig color="#4f7" size={16} />,
};
export const FileProcess = memo<ProcessProps<ProcessType.file>>(
  ({ content, status, type }) => {
    return (
      <div className="flex gap-2 border mt-2 p-2 rounded bg-slate-50">
        <span>{icons[status]}</span>
        <span
          className="text-xs text-gray-500"
        >
          {content.timestamp}
        </span>
      </div>
    );
  },
);
