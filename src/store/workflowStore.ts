import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { randomID } from "@/utils/common";

/**
 * Enum for step status
 */
export enum StepStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
  WAITING_PERMISSION = "waiting_permission",
}

/**
 * Interface for workflow step
 */
export interface WorkflowStep {
  /** Unique identifier for the step */
  id: string;
  /** Title of the step */
  title: string;
  /** Description of the step */
  description: string;
  /** Current status of the step */
  status: StepStatus;
  /** Whether this step requires permission */
  requiresPermission: boolean;
  /** Whether permission has been granted for this step */
  permissionGranted?: boolean;
  /** Timestamp when the step was started */
  startedAt?: number;
  /** Timestamp when the step was completed */
  completedAt?: number;
  /** Any error message if the step failed */
  errorMessage?: string;
}

/**
 * Interface for workflow state
 */
interface WorkflowState {
  /** Array of workflow steps */
  steps: WorkflowStep[];
  /** Index of the current active step */
  currentStepIndex: number;
  /** Whether to automatically proceed to next step when current step completes */
  autoAdvance: boolean;
  /** Whether to ask for permission for steps that require it */
  askForPermission: boolean;
  /** Whether the workflow is completed */
  isCompleted: boolean;

  /** Actions */
  initializeWorkflow: (steps: Omit<WorkflowStep, "id" | "status">[]) => void;
  moveToNextStep: () => void;
  navigateToStep: (stepIndex: number) => void;
  requestStepPermission: () => void;
  grantStepPermission: () => void;
  denyStepPermission: () => void;
  toggleAutoAdvance: () => void;
  toggleAskForPermission: () => void;
  failCurrentStep: (errorMessage: string) => void;
  resetWorkflow: () => void;
}

/**
 * Initial state for the workflow store
 */
const initialState = {
  steps: [],
  currentStepIndex: 0,
  autoAdvance: false,
  askForPermission: true,
  isCompleted: false,
};

/**
 * Create the workflow store with Zustand
 */
export const useWorkflowStore = create<WorkflowState>()(
  immer((set, get) => ({
    // Initial state
    ...initialState,

    // Actions
    initializeWorkflow: (steps) => {
      set((state) => {
        const workflowSteps = steps.map((step) => ({
          ...step,
          id: randomID(),
          status: StepStatus.PENDING,
        }));

        state.steps = workflowSteps;
        state.currentStepIndex = 0;
        state.isCompleted = false;

        // Set first step to in progress
        if (workflowSteps.length > 0) {
          workflowSteps[0].status = StepStatus.IN_PROGRESS;
          workflowSteps[0].startedAt = Date.now();
        }
      });
    },

    moveToNextStep: () => {
      set((state) => {
        const { steps, currentStepIndex } = state;

        if (currentStepIndex >= steps.length - 1) {
          // Workflow is complete
          state.isCompleted = true;
          return;
        }

        // Mark current step as completed
        steps[currentStepIndex].status = StepStatus.COMPLETED;
        steps[currentStepIndex].completedAt = Date.now();

        // Set next step to in progress
        steps[currentStepIndex + 1].status = StepStatus.IN_PROGRESS;
        steps[currentStepIndex + 1].startedAt = Date.now();

        // Update current step index
        state.currentStepIndex = currentStepIndex + 1;
      });
    },

    navigateToStep: (stepIndex) => {
      set((state) => {
        const { currentStepIndex } = state;

        // Can only navigate to completed steps or the current step
        if (stepIndex < 0 || stepIndex > currentStepIndex) {
          return;
        }

        state.currentStepIndex = stepIndex;
      });
    },

    requestStepPermission: () => {
      set((state) => {
        const { steps, currentStepIndex } = state;

        if (!steps[currentStepIndex].requiresPermission) {
          return;
        }

        steps[currentStepIndex].status = StepStatus.WAITING_PERMISSION;
      });
    },

    grantStepPermission: () => {
      set((state) => {
        const { steps, currentStepIndex } = state;

        steps[currentStepIndex].permissionGranted = true;
        steps[currentStepIndex].status = StepStatus.IN_PROGRESS;
      });
    },

    denyStepPermission: () => {
      set((state) => {
        const { steps, currentStepIndex } = state;

        steps[currentStepIndex].permissionGranted = false;
        steps[currentStepIndex].status = StepStatus.FAILED;
        steps[currentStepIndex].errorMessage = "Permission denied";
      });
    },

    toggleAutoAdvance: () => {
      set((state) => {
        state.autoAdvance = !state.autoAdvance;
      });
    },

    toggleAskForPermission: () => {
      set((state) => {
        state.askForPermission = !state.askForPermission;
      });
    },

    failCurrentStep: (errorMessage) => {
      set((state) => {
        const { steps, currentStepIndex } = state;

        steps[currentStepIndex].status = StepStatus.FAILED;
        steps[currentStepIndex].errorMessage = errorMessage;
      });
    },

    resetWorkflow: () => {
      set(initialState);
    },
  })),
);
