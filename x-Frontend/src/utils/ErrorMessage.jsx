import React from "react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

/**
 * A transparent alert banner with a dark background.
 * @param {{
 * title?: string;
 * message: string;
 * onDismiss?: () => void;
 * }} props
 */
function ErrorMessage({ title, message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="rounded-md bg-blue-500/70 p-4 border border-gray-600" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          {title && (
            <h3 className="text-sm font-medium text-white">{title}</h3>
          )}
          <div className="mt-2 text-sm text-gray-300">
            <p>{message}</p>
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              onClick={onDismiss}
              className="-mx-1.5 -my-1.5 rounded-lg p-1.5 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;