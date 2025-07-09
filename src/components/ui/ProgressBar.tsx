import React from "react";
import { motion } from "framer-motion";
import type { ProgressBarProps } from "../../types";
import { useLanguage } from "../../hooks/useLanguage";

// Progress bar size variants
const progressSizes = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
  xl: "h-4",
};

// Progress bar color variants
const progressColors = {
  primary: "bg-primary-500",
  secondary: "bg-gray-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
};

/**
 * Animated ProgressBar component with accessibility support
 * Shows completion progress with smooth animations and screen reader support
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = "md",
  color = "primary",
  animated = true,
  showLabel = false,
  label,
  className = "",
  ...props
}) => {
  const { t } = useLanguage();

  // Ensure value is within bounds
  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = Math.round((clampedValue / max) * 100);

  const sizeClass = progressSizes[size];
  const colorClass = progressColors[color];

  const baseClasses = [
    "w-full bg-gray-200 rounded-full overflow-hidden",
    sizeClass,
  ].join(" ");

  const fillClasses = [
    colorClass,
    "h-full rounded-full transition-all duration-500 ease-out",
    animated ? "animate-pulse" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const progressLabel =
    label || `${percentage}% ${t("test.progress.complete", "complete")}`;

  return (
    <div className={`${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            {progressLabel}
          </span>
          <span className="text-sm text-gray-500">{100 - percentage}%</span>
        </div>
      )}

      <div
        className={baseClasses}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={progressLabel}
      >
        <motion.div
          className={fillClasses}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          aria-hidden="true"
        />
      </div>

      {/* Screen reader only text for detailed progress */}
      <span className="sr-only">
        Progress: {clampedValue} out of {max} ({percentage}% complete)
      </span>
    </div>
  );
};

/**
 * Circular ProgressBar variant for compact displays
 */
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: keyof typeof progressColors;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 64,
  strokeWidth = 4,
  color = "primary",
  showLabel = false,
  label,
  className = "",
}) => {
  const { t } = useLanguage();

  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = (clampedValue / max) * 100;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const progressLabel =
    label ||
    `${Math.round(percentage)}% ${t("test.progress.complete", "complete")}`;

  // Get color class and convert to stroke color
  const colorMap = {
    primary: "#3b82f6", // primary-500
    secondary: "#6b7280", // gray-500
    success: "#10b981", // green-500
    warning: "#f59e0b", // yellow-500
    danger: "#ef4444", // red-500
    info: "#3b82f6", // blue-500
  };

  const strokeColor = colorMap[color];

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={progressLabel}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-25"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>

      <span className="sr-only">
        Circular progress: {clampedValue} out of {max} ({Math.round(percentage)}
        % complete)
      </span>
    </div>
  );
};

export default ProgressBar;
