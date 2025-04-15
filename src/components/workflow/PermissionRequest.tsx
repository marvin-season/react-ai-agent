import React, { memo } from 'react';
import { WorkflowStep } from '@/store/workflow';

interface PermissionRequestProps {
  step: WorkflowStep;
  onGrant: () => void;
  onDeny: () => void;
}

export const PermissionRequest: React.FC<PermissionRequestProps> = memo(({
  step,
  onGrant,
  onDeny
}) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            需要权限
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              步骤 "{step.title}" 需要您的授权才能继续。
            </p>
            <p className="mt-1">
              {step.description}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onGrant}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                授权
              </button>
              <button
                type="button"
                onClick={onDeny}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                拒绝
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
