import React, { memo, ReactNode } from 'react';
import { WorkflowStep, StepStatus } from '@/store/workflowStore';
import { PermissionRequest } from './PermissionRequest';

interface StepContentProps {
  step: WorkflowStep;
  children?: ReactNode;
  onGrantPermission: () => void;
  onDenyPermission: () => void;
  onNextStep: () => void;
}

export const StepContent: React.FC<StepContentProps> = memo(({
  step,
  children,
  onGrantPermission,
  onDenyPermission,
  onNextStep
}) => {
  // Determine content based on step status
  const renderContent = () => {
    switch (step.status) {
      case StepStatus.WAITING_PERMISSION:
        return (
          <PermissionRequest
            step={step}
            onGrant={onGrantPermission}
            onDeny={onDenyPermission}
          />
        );

      case StepStatus.FAILED:
        return (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  步骤失败
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{step.errorMessage || '未知错误'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case StepStatus.COMPLETED:
        return (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  步骤完成
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>此步骤已成功完成。</p>
                </div>
              </div>
            </div>
          </div>
        );

      case StepStatus.IN_PROGRESS:
      default:
        return (
          <>
            {children}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onNextStep}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                下一步
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {step.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {step.description}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        {renderContent()}
      </div>
    </div>
  );
});
