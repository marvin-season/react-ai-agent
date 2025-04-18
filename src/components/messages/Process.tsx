import { randomColorHex } from "@/utils/common"
import { memo } from "react"

export enum ProcessStatus {
    pending = "pending",
    processing = "processing",
    completed = "completed"
}
export interface ProcessProps {
    id: number;
    status: ProcessStatus;
    content: string;
}
export const Process = memo(({ content, status }: ProcessProps) => {
    return <div className="flex gap-2 border">
        <span>{status}</span>
        <span style={{
            color: randomColorHex()
        }}>{content}</span>

    </div>
})