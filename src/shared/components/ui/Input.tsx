/**
 * Shared UI Component - Input
 * Reusable input component dengan label dan error handling
 */

import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', disabled, ...props }, ref) => {
    const inputStyles = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-blue-500'
    } ${className}`;

    // Ensure disabled is always a boolean to avoid hydration mismatch
    const isDisabled = Boolean(disabled);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input 
          ref={ref} 
          className={inputStyles} 
          {...(isDisabled && { disabled: true })}
          {...props} 
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
