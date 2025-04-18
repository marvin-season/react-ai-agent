import { memo } from "react";
import { BaseMessageProps } from "@/types";

/**
 * Computer message UI component
 */
export const ComputerMessage = memo<BaseMessageProps>(({ message }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-lg font-bold">Computer</span>
      {message.timestamp && (
        <span className="text-xs text-gray-600">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
});
