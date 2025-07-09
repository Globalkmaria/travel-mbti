import React from "react";
import { motion } from "framer-motion";
import { spinnerVariants } from "../../utils/animations";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
  "aria-label"?: string;
}

// Spinner size variants
const spinnerSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

// Spinner color variants
const spinnerColors = {
  primary: "text-primary",
  secondary: "text-gray-500",
  white: "text-white",
  gray: "text-gray-400",
};

/**
 * Loading Spinner component with smooth rotation animation
 * Supports multiple sizes and colors with accessibility features
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "primary",
  className = "",
  "aria-label": ariaLabel = "Loading",
}) => {
  const sizeClass = spinnerSizes[size];
  const colorClass = spinnerColors[color];

  const allClasses = `${sizeClass} ${colorClass} ${className}`.trim();

  return (
    <div
      className="inline-flex items-center justify-center"
      role="status"
      aria-label={ariaLabel}
    >
      <motion.svg
        className={allClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        variants={spinnerVariants}
        animate="animate"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </motion.svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

/**
 * Dots Loading Spinner - Alternative loading animation
 */
export interface DotsSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
  "aria-label"?: string;
}

export const DotsSpinner: React.FC<DotsSpinnerProps> = ({
  size = "md",
  color = "primary",
  className = "",
  "aria-label": ariaLabel = "Loading",
}) => {
  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  const dotSpacing = {
    sm: "space-x-1",
    md: "space-x-1.5",
    lg: "space-x-2",
  };

  const sizeClass = dotSizes[size];
  const spacingClass = dotSpacing[size];
  const colorClass = spinnerColors[color];

  return (
    <div
      className={`inline-flex items-center ${spacingClass} ${className}`}
      role="status"
      aria-label={ariaLabel}
    >
      <motion.div
        className={`${sizeClass} ${colorClass} bg-current rounded-full`}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
        aria-hidden="true"
      />
      <motion.div
        className={`${sizeClass} ${colorClass} bg-current rounded-full`}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.15,
        }}
        aria-hidden="true"
      />
      <motion.div
        className={`${sizeClass} ${colorClass} bg-current rounded-full`}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
        aria-hidden="true"
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

/**
 * Pulse Loading Spinner - Subtle pulsing animation
 */
export interface PulseSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
  "aria-label"?: string;
}

export const PulseSpinner: React.FC<PulseSpinnerProps> = ({
  size = "md",
  color = "primary",
  className = "",
  "aria-label": ariaLabel = "Loading",
}) => {
  const sizeClass = spinnerSizes[size];
  const colorClass = spinnerColors[color];

  return (
    <div
      className="inline-flex items-center justify-center"
      role="status"
      aria-label={ariaLabel}
    >
      <motion.div
        className={`${sizeClass} ${colorClass} bg-current rounded-full ${className}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

export default LoadingSpinner;
