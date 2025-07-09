import React from "react";
import { motion } from "framer-motion";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  hover?: boolean;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

// Card variant styles
const cardPadding = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const cardShadow = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const cardRounded = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
};

/**
 * Flexible Card component for containing content with customizable styling
 * Supports different padding, shadow, and border options with responsive design
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  rounded = "lg",
  border = true,
  hover = false,
}) => {
  const baseClasses = ["bg-white", "transition-all duration-200 ease-in-out"];

  const paddingClass = cardPadding[padding];
  const shadowClass = cardShadow[shadow];
  const roundedClass = cardRounded[rounded];
  const borderClass = border ? "border border-gray-200" : "";
  const hoverClass = hover ? "hover:shadow-lg hover:-translate-y-1" : "";

  const allClasses = [
    ...baseClasses,
    paddingClass,
    shadowClass,
    roundedClass,
    borderClass,
    hoverClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={allClasses}
      role="region"
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Card Header component for displaying card titles and actions
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  const baseClasses = "border-b border-gray-200 pb-3 mb-4";
  const allClasses = `${baseClasses} ${className}`.trim();

  return <div className={allClasses}>{children}</div>;
};

/**
 * Card Content component for main card content area
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  const baseClasses = "flex-1";
  const allClasses = `${baseClasses} ${className}`.trim();

  return <div className={allClasses}>{children}</div>;
};

/**
 * Card Footer component for displaying actions and secondary content
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {
  const baseClasses =
    "border-t border-gray-200 pt-3 mt-4 flex items-center justify-between";
  const allClasses = `${baseClasses} ${className}`.trim();

  return <div className={allClasses}>{children}</div>;
};

export default Card;
