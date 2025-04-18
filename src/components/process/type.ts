export enum ProcessStatus {
    pending = "pending",
    processing = "processing",
    completed = "completed",
}

export enum ProcessType {
    tool = "tool",
    file = "file",
}

export interface ProcessMultiContent {
    timestamp: string;
}

export type PlainContent = string

type ProcessProps_ = {
    type: ProcessType.tool;
    content: PlainContent;
}
| {
    type: ProcessType.file;
    content: ProcessMultiContent;
}

export interface ProcessProps<
    T extends ProcessType = ProcessType,
> {
    id: number;
    status: ProcessStatus;
    content: Extract<ProcessProps_, { type: T }>["content"];
    type: T;
}