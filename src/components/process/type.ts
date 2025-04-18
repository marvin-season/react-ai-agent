import { FC } from "react";

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

export interface ProcessProps<
  T extends ProcessType = ProcessType,
> {
  id: number;
  status: ProcessStatus;
  content: T extends ProcessType.tool
    ? PlainContent
    : ProcessMultiContent;
  type: T;
}
