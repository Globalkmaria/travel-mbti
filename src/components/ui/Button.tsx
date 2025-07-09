import React from "react";
import { motion } from "framer-motion";
import type { ButtonProps } from "../../types";

// Button variant styles using Tailwind CSS
const buttonVariants = {
  primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50",
  secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500/50",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50",
  ghost: "text-primary hover:bg-primary/10 focus:ring-primary/50",
};

// Button size styles
const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

// Loading spinner component
const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => {
  const spinnerSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <svg
      className={`animate-spin ${spinnerSizes[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

/**
 * Reusable Button component with multiple variants and accessibility features
 * Supports primary, secondary, outline, and ghost variants with loading states
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses = [
    "inline-flex items-center justify-center",
    "font-medium rounded-lg",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "active:scale-95",
  ].join(" ");

  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];

  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
      aria-disabled={isDisabled}
      aria-busy={loading}
      whileHover={isDisabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {loading && (
        <motion.span
          className="mr-2"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <LoadingSpinner size={size} />
        </motion.span>
      )}
      <motion.span
        className={loading ? "opacity-75" : ""}
        animate={{ opacity: loading ? 0.75 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default Button;
