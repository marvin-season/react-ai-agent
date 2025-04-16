import React, { useEffect, useState, useRef } from 'react';
import { useWorkflowStore, StepStatus } from '@/store/workflowStore';
import { StepIndicator } from './StepIndicator';
import { StepContent } from './StepContent';
import { StepDetail } from './StepDetail';
import {
  subscribeToWorkflowStream,
  WorkflowStreamEvent,
  mockWorkflowSteps
} from '@/services/streamWorkflow';

interface WorkflowProcessorProps {
  // Whether to show settings
  showSettings?: boolean;
  // Whether to auto-grant permissions
  autoGrantPermission?: boolean;
}

export const WorkflowProcessor: React.FC<WorkflowProcessorProps> = ({
  showSettings = true,
  autoGrantPermission = false
}) => {
  // Get workflow state and actions
  const {
    steps,
    currentStepIndex,
    autoAdvance,
    askForPermission,
    isCompleted,
    initializeWorkflow,
    moveToNextStep,
    navigateToStep,
    requestStepPermission,
    grantStepPermission,
    denyStepPermission,
    toggleAutoAdvance,
    toggleAskForPermission
  } = useWorkflowStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepDetails, setStepDetails] = useState<Record<number, string[]>>({});
  const [stepProgress, setStepProgress] = useState<Record<number, number>>({});
  const [summary, setSummary] = useState<string>('');
  const cancelStreamRef = useRef<(() => void) | null>(null);

  // Initialize workflow with steps
  useEffect(() => {
    if (!isInitialized && steps.length === 0) {
      initializeWorkflow(mockWorkflowSteps);
      setIsInitialized(true);
    }
  }, [isInitialized, steps.length, initializeWorkflow]);

  // Start processing workflow when initialized
  useEffect(() => {
    if (isInitialized && !isProcessing && steps.length > 0) {
      startWorkflowProcessing();
    }

    return () => {
      // Clean up stream subscription when component unmounts
      if (cancelStreamRef.current) {
        cancelStreamRef.current();
      }
    };
  }, [isInitialized, isProcessing, steps.length]);

  // Handle workflow stream events
  const handleWorkflowEvent = (event: WorkflowStreamEvent) => {
    switch (event.type) {
      case 'step_update':
        // Update step details and progress
        if (event.detail) {
          setStepDetails(prev => {
            const newDetails = { ...prev };
            newDetails[event.stepIndex] = [...(prev[event.stepIndex] || []), event.detail];
            return newDetails;
          });
        }

        if (event.progress !== undefined) {
          setStepProgress(prev => {
            const newProgress = { ...prev };
            newProgress[event.stepIndex] = event.progress || 0;
            return newProgress;
          });

          // If step is complete (progress 100%), move to next step
          if (event.progress === 100 && currentStepIndex === event.stepIndex) {
            setTimeout(() => moveToNextStep(), 1000);
          }
        }
        break;

      case 'permission_request':
        // Request permission for the step
        requestStepPermission();

        // Auto-grant permission if enabled
        if (autoGrantPermission) {
          setTimeout(() => grantStepPermission(), 1500);
        }
        break;

      case 'workflow_complete':
        // Set workflow completion summary
        setSummary(event.summary);
        break;
    }
  };

  // Start the workflow processing
  const startWorkflowProcessing = () => {
    setIsProcessing(true);

    // Subscribe to workflow stream
    const cancel = subscribeToWorkflowStream(handleWorkflowEvent, autoGrantPermission);
    cancelStreamRef.current = cancel;
  };

  // Handle step navigation
  const handleStepClick = (index: number) => {
    navigateToStep(index);
  };

  // Handle next step
  const handleNextStep = () => {
    const step = steps[currentStepIndex];

    // Check if step requires permission
    if (step.requiresPermission && askForPermission && !step.permissionGranted) {
      requestStepPermission();
    } else {
      moveToNextStep();
    }
  };

  // Get current step
  const currentStep = steps[currentStepIndex] || null;

  // Render step content with details
  const renderStepContent = (stepIndex: number) => {
    const details = stepDetails[stepIndex] || [];
    const progress = stepProgress[stepIndex] || 0;

    return (
      <div className="prose w-full">
        <StepDetail
          details={details}
          progress={progress}
        />
      </div>
    );
  };

  if (!currentStep) {
    return <div className="text-center p-8">加载中...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Settings */}
      {showSettings && (
        <div className="mb-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              工作流设置
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center">
                <input
                  id="auto-advance"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={autoAdvance}
                  onChange={toggleAutoAdvance}
                />
                <label htmlFor="auto-advance" className="ml-2 block text-sm text-gray-900">
                  自动进入下一步
                </label>
              </div>
              <div className="flex items-center mt-2 sm:mt-0">
                <input
                  id="ask-permission"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={askForPermission}
                  onChange={toggleAskForPermission}
                />
                <label htmlFor="ask-permission" className="ml-2 block text-sm text-gray-900">
                  需要时请求权限
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <StepIndicator
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={handleStepClick}
      />

      {/* Step Content */}
      <StepContent
        step={currentStep}
        onGrantPermission={grantStepPermission}
        onDenyPermission={denyStepPermission}
        onNextStep={handleNextStep}
      >
        {renderStepContent(currentStepIndex)}
      </StepContent>

      {/* Workflow Completion */}
      {isCompleted && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                工作流程已完成
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{summary || '所有步骤已成功处理完毕。您可以点击上方的步骤指示器回顾任何步骤。'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restart Button */}
      {isCompleted && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              // Reset workflow and start again
              initializeWorkflow(mockWorkflowSteps);
              setStepDetails({});
              setStepProgress({});
              setSummary('');
              setIsProcessing(false);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            重新开始
          </button>
        </div>
      )}
    </div>
  );
};
