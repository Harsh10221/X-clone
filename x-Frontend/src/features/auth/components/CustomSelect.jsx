// src/components/CustomSelect.jsx

import React, { useState, useRef, useEffect } from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  FloatingPortal,
  autoUpdate,
  flip,
  shift,
  size,
} from '@floating-ui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

function CustomSelect({ options, value, onChange, placeholder, disabled }) {
  const [isOpen, setIsOpen] = useState(false);

  // The 'useFloating' and other hooks remain exactly the same.
  const { refs, floatingStyles, context } = useFloating({
    strategy: 'fixed',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        apply({ availableHeight, elements }) {
          // This applies the max-height, which is why the change below works.
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  const selectedLabel = options.find(opt => opt.value == value)?.label || placeholder;

  return (
    <>
      <button
      type='button'
        ref={refs.setReference}
        {...getReferenceProps()}
        disabled={disabled}
        className="flex-1 w-full text-left text-white bg-black p-2 border border-[#676767] rounded flex justify-between items-center disabled:opacity-50"
      >
        <span>{selectedLabel}</span>
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
      </button>

      <FloatingPortal>
        {isOpen && (
          // ✅ CORRECTED: This is now a SINGLE div for the dropdown panel.
          // It has the ref, styles, and Tailwind classes all in one place.
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            className="w-48 bg-black border border-[#676767] rounded-lg shadow-lg z-50 overflow-y-auto"
          >
            {/* The options are now direct children of the scrollable div */}
            {options.map(option => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}

export default CustomSelect;