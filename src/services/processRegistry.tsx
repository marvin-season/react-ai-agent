import { FileProcess, ProcessProps, ProcessType, ToolProcess } from "@/components/process";
import { FC } from "react";

class ProcessRegistry {
  private registry = new Map<ProcessType, FC<ProcessProps>>();

  register(type: ProcessType, renderer: FC<ProcessProps>): void {
    this.registry.set(type, renderer);
  }

  getRenderer(type: ProcessType): FC<ProcessProps> | undefined {
    return this.registry.get(type);
  }

  renderProcess(process: ProcessProps): JSX.Element | null {
    const Renderer = this.getRenderer(process.type);
    if (!Renderer) return null;

    return <Renderer key={process.id} {...process} />;
  }

  initializeDefaults(): void {
    this.register(ProcessType.tool, ToolProcess as FC<ProcessProps>);
    this.register(ProcessType.file, FileProcess as FC<ProcessProps>);
  }
}

export const processRegistry = new ProcessRegistry();
processRegistry.initializeDefaults();
