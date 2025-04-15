import React, { memo } from 'react';
import { WorkflowStep, StepStatus } from '@/store/workflow';

interface StepIndicatorProps {
  steps: WorkflowStep[];
  currentStepIndex: number;
  onStepClick: (index: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = memo(({ 
  steps, 
  currentStepIndex,
  onStepClick
}) => {
  // Calculate progress percentage
  const progressPercentage = steps.length > 0 
    ? ((currentStepIndex) / (steps.length - 1)) * 100 
    : 0;

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              进度
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div 
            style={{ width: `${progressPercentage}%` }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
          ></div>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          // Determine step status styles
          const isActive = index === currentStepIndex;
          const isCompleted = step.status === StepStatus.COMPLETED;
          const isWaitingPermission = step.status === StepStatus.WAITING_PERMISSION;
          const isFailed = step.status === StepStatus.FAILED;
          
          // Base styles
          let stepClasses = "flex flex-col items-center cursor-pointer";
          let circleClasses = "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all duration-300";
          let lineClasses = "flex-1 h-1 mx-2";
          
          // Status-specific styles
          if (isActive) {
            circleClasses += " bg-blue-500 text-white ring-4 ring-blue-200";
          } else if (isCompleted) {
            circleClasses += " bg-green-500 text-white";
          } else if (isWaitingPermission) {
            circleClasses += " bg-yellow-500 text-white";
          } else if (isFailed) {
            circleClasses += " bg-red-500 text-white";
          } else {
            circleClasses += " bg-gray-300 text-gray-700";
          }
          
          // Only allow clicking on completed steps or current step
          const isClickable = index <= currentStepIndex;
          if (!isClickable) {
            stepClasses += " opacity-50";
          }

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div 
                className={stepClasses}
                onClick={() => isClickable && onStepClick(index)}
              >
                <div className={circleClasses}>
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : isFailed ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  ) : isWaitingPermission ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-xs text-center font-medium">
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`${lineClasses} ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
