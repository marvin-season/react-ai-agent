import createStore from './createStore';
import { randomID } from '@/utils/common';

/**
 * Enum for step status
 */
export enum StepStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  WAITING_PERMISSION = 'waiting_permission',
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
}

/**
 * Initial state for the workflow store
 */
export const initialWorkflowState: WorkflowState = {
  steps: [],
  currentStepIndex: 0,
  autoAdvance: false,
  askForPermission: true,
  isCompleted: false,
};

// Create the store
const { useStore, setState, getState } = createStore<WorkflowState>(initialWorkflowState);

/**
 * Hook to access the workflow store
 * @param selector Optional selector function
 * @returns Selected state or full state
 */
export const useWorkflowStore = useStore;

/**
 * Set the workflow store state
 * @param state New state to set
 */
export const setWorkflowStore = setState;

/**
 * Get the current workflow store state
 * @returns Current workflow store state
 */
export const getWorkflowStore = getState;

/**
 * Initialize workflow with steps
 * @param steps Array of workflow steps
 */
export const initializeWorkflow = (steps: Omit<WorkflowStep, 'id' | 'status'>[]) => {
  const workflowSteps = steps.map(step => ({
    ...step,
    id: randomID(),
    status: StepStatus.PENDING,
  }));

  // Set first step to in progress
  if (workflowSteps.length > 0) {
    workflowSteps[0].status = StepStatus.IN_PROGRESS;
    workflowSteps[0].startedAt = Date.now();
  }

  setWorkflowStore({
    steps: workflowSteps,
    currentStepIndex: 0,
    isCompleted: false,
  });
};

/**
 * Move to the next step in the workflow
 */
export const moveToNextStep = () => {
  const { steps, currentStepIndex } = getWorkflowStore();
  
  if (currentStepIndex >= steps.length - 1) {
    // Workflow is complete
    setWorkflowStore({
      isCompleted: true,
    });
    return;
  }

  // Mark current step as completed
  const updatedSteps = [...steps];
  updatedSteps[currentStepIndex] = {
    ...updatedSteps[currentStepIndex],
    status: StepStatus.COMPLETED,
    completedAt: Date.now(),
  };

  // Set next step to in progress
  updatedSteps[currentStepIndex + 1] = {
    ...updatedSteps[currentStepIndex + 1],
    status: StepStatus.IN_PROGRESS,
    startedAt: Date.now(),
  };

  setWorkflowStore({
    steps: updatedSteps,
    currentStepIndex: currentStepIndex + 1,
  });
};

/**
 * Navigate to a specific step in the workflow
 * @param stepIndex Index of the step to navigate to
 */
export const navigateToStep = (stepIndex: number) => {
  const { steps, currentStepIndex } = getWorkflowStore();
  
  // Can only navigate to completed steps or the current step
  if (stepIndex < 0 || stepIndex > currentStepIndex) {
    return;
  }

  setWorkflowStore({
    currentStepIndex: stepIndex,
  });
};

/**
 * Request permission for the current step
 */
export const requestStepPermission = () => {
  const { steps, currentStepIndex } = getWorkflowStore();
  
  if (!steps[currentStepIndex].requiresPermission) {
    return;
  }

  const updatedSteps = [...steps];
  updatedSteps[currentStepIndex] = {
    ...updatedSteps[currentStepIndex],
    status: StepStatus.WAITING_PERMISSION,
  };

  setWorkflowStore({
    steps: updatedSteps,
  });
};

/**
 * Grant permission for the current step
 */
export const grantStepPermission = () => {
  const { steps, currentStepIndex } = getWorkflowStore();
  
  const updatedSteps = [...steps];
  updatedSteps[currentStepIndex] = {
    ...updatedSteps[currentStepIndex],
    permissionGranted: true,
    status: StepStatus.IN_PROGRESS,
  };

  setWorkflowStore({
    steps: updatedSteps,
  });
};

/**
 * Deny permission for the current step
 */
export const denyStepPermission = () => {
  const { steps, currentStepIndex } = getWorkflowStore();
  
  const updatedSteps = [...steps];
  updatedSteps[currentStepIndex] = {
    ...updatedSteps[currentStepIndex],
    permissionGranted: false,
    status: StepStatus.FAILED,
    errorMessage: 'Permission denied',
  };

  setWorkflowStore({
    steps: updatedSteps,
  });
};

/**
 * Toggle auto advance setting
 */
export const toggleAutoAdvance = () => {
  const { autoAdvance } = getWorkflowStore();
  setWorkflowStore({
    autoAdvance: !autoAdvance,
  });
};

/**
 * Toggle ask for permission setting
 */
export const toggleAskForPermission = () => {
  const { askForPermission } = getWorkflowStore();
  setWorkflowStore({
    askForPermission: !askForPermission,
  });
};

/**
 * Mark current step as failed
 * @param errorMessage Error message
 */
export const failCurrentStep = (errorMessage: string) => {
  const { steps, currentStepIndex } = getWorkflowStore();
  
  const updatedSteps = [...steps];
  updatedSteps[currentStepIndex] = {
    ...updatedSteps[currentStepIndex],
    status: StepStatus.FAILED,
    errorMessage,
  };

  setWorkflowStore({
    steps: updatedSteps,
  });
};

/**
 * Reset the workflow to initial state
 */
export const resetWorkflow = () => {
  setWorkflowStore(initialWorkflowState);
};
