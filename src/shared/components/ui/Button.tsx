/**
 * Shared UI Component - Button
 * Reusable button component dengan variants
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const focusRingColor =
    variant === 'primary'
      ? 'focus:ring-blue-500'
      : variant === 'danger'
      ? 'focus:ring-red-500'
      : 'focus:ring-gray-500';

  // Ensure disabled is always a boolean to avoid hydration mismatch
  const isDisabled = Boolean(disabled || isLoading);

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${focusRingColor} ${className}`}
      {...(isDisabled && { disabled: true })}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
