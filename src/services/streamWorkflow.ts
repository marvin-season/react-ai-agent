import { sleep } from "@/utils/common";
import { WorkflowStep } from "@/store/workflowStore";

/**
 * Interface for step update event
 */
export interface StepUpdateEvent {
  type: "step_update";
  stepIndex: number;
  progress?: number;
  detail: string;
}

/**
 * Interface for permission request event
 */
export interface PermissionRequestEvent {
  type: "permission_request";
  stepIndex: number;
  reason: string;
}

/**
 * Interface for workflow completion event
 */
export interface WorkflowCompletionEvent {
  type: "workflow_complete";
  summary: string;
}

/**
 * Union type for all workflow stream events
 */
export type WorkflowStreamEvent =
  | StepUpdateEvent
  | PermissionRequestEvent
  | WorkflowCompletionEvent;

/**
 * Type for workflow stream handler
 */
export type WorkflowStreamHandler = (event: WorkflowStreamEvent) => void;

/**
 * Mock workflow steps data
 */
export const mockWorkflowSteps: Omit<WorkflowStep, "id" | "status">[] = [
  {
    title: "任务接收",
    description: "接收用户提交的任务请求并验证",
    requiresPermission: false,
  },
  {
    title: "任务分析",
    description: "分析任务内容和要求，确定处理方案",
    requiresPermission: false,
  },
  {
    title: "资源访问",
    description: "访问需要的系统资源和数据",
    requiresPermission: true,
  },
  {
    title: "执行处理",
    description: "执行任务的主要处理逻辑",
    requiresPermission: false,
  },
  {
    title: "结果生成",
    description: "生成任务处理结果并格式化",
    requiresPermission: false,
  },
];

/**
 * Mock step processing details
 */
const mockStepDetails: Record<number, string[]> = {
  0: ["接收用户请求...", "验证请求格式...", "检查请求参数...", "请求验证通过"],
  1: [
    "分析任务类型...",
    "确定处理优先级...",
    "加载处理模型...",
    "生成处理方案...",
    "方案确认完成",
  ],
  2: [
    "检查资源权限...",
    "请求访问数据库...",
    "加载系统资源...",
    "资源准备完成",
  ],
  3: [
    "初始化处理环境...",
    "执行数据转换...",
    "应用业务规则...",
    "执行核心算法...",
    "验证处理结果...",
    "处理完成",
  ],
  4: [
    "整合处理结果...",
    "格式化输出数据...",
    "生成报告...",
    "结果验证...",
    "完成",
  ],
};

/**
 * Simulates a streaming workflow process using a generator function
 * @param onEvent Callback function to handle workflow events
 * @param autoGrantPermission Whether to automatically grant permission
 */
export async function* streamWorkflow(
  autoGrantPermission: boolean = false,
): AsyncGenerator<WorkflowStreamEvent> {
  // Process each step
  for (let stepIndex = 0; stepIndex < mockWorkflowSteps.length; stepIndex++) {
    const step = mockWorkflowSteps[stepIndex];

    // Yield step start event
    yield {
      type: "step_update",
      stepIndex,
      progress: 0,
      detail: "开始处理...",
    };

    await sleep(1000);

    // Check if step requires permission
    if (step.requiresPermission) {
      yield {
        type: "permission_request",
        stepIndex,
        reason: `步骤 "${step.title}" 需要访问权限才能继续`,
      };

      // Wait for permission (in real app this would pause until permission is granted)
      if (!autoGrantPermission) {
        // In a real implementation, we would wait for the permission to be granted
        // For this mock, we'll just wait a bit to simulate waiting for user input
        await sleep(3000);
      } else {
        await sleep(1000);
      }
    }

    // Process step details
    const details = mockStepDetails[stepIndex] || [];
    for (let i = 0; i < details.length; i++) {
      const progress = Math.round(((i + 1) / details.length) * 100);

      yield {
        type: "step_update",
        stepIndex,
        progress,
        detail: details[i],
      };

      // Simulate processing time
      await sleep(1000 + Math.random() * 500);
    }
  }

  // Workflow complete
  yield {
    type: "workflow_complete",
    summary: "所有步骤已成功完成，任务处理结束",
  };
}

/**
 * Subscribes to workflow stream events
 * @param handler Event handler function
 * @param autoGrantPermission Whether to automatically grant permission
 * @returns Function to cancel the subscription
 */
export function subscribeToWorkflowStream(
  handler: WorkflowStreamHandler,
  autoGrantPermission: boolean = false,
): () => void {
  let cancelled = false;

  // Start processing the workflow
  (async () => {
    const stream = streamWorkflow(autoGrantPermission);

    for await (const event of stream) {
      if (cancelled) break;
      handler(event);
    }
  })();

  // Return function to cancel the subscription
  return () => {
    cancelled = true;
  };
}
