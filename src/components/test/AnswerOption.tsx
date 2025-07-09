import React from "react";
import { motion } from "framer-motion";
import type { Answer } from "../../types";

export interface AnswerOptionProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: (answerId: string) => void;
  disabled?: boolean;
  index?: number;
  showAnimation?: boolean;
}

/**
 * AnswerOption Component
 * Individual answer selection component with smooth animations and accessibility
 * Can be used standalone or within QuestionCard
 */
export const AnswerOption: React.FC<AnswerOptionProps> = ({
  answer,
  isSelected,
  onSelect,
  disabled = false,
  index = 0,
  showAnimation = true,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onSelect(answer.id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  const MotionWrapper = showAnimation ? motion.button : "button";
  const animationProps = showAnimation
    ? {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: {
          duration: 0.2,
          delay: index * 0.1,
          ease: [0.4, 0.0, 0.2, 1] as const,
        },
        whileHover: disabled ? {} : { scale: 1.02 },
        whileTap: disabled ? {} : { scale: 0.98 },
      }
    : {};

  return (
    <MotionWrapper
      {...animationProps}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`
        w-full p-4 rounded-lg border-2 text-left transition-all duration-200
        min-h-[60px] sm:min-h-[50px] 
        ${
          isSelected
            ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }
        ${disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"}
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
        group
      `}
      role="radio"
      aria-checked={isSelected}
      aria-describedby={`answer-${answer.id}-description`}
      tabIndex={disabled ? -1 : 0}
    >
      <div className="flex items-start space-x-3">
        {/* Custom Radio Indicator */}
        <div
          className={`
            w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 relative
            ${
              isSelected
                ? "border-primary bg-primary"
                : "border-gray-300 group-hover:border-gray-400"
            }
            transition-all duration-200
          `}
          aria-hidden="true"
        >
          {/* Radio Inner Dot */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white"
            />
          )}

          {/* Focus Ring */}
          <div
            className={`
              absolute inset-0 rounded-full transition-opacity duration-200
              ${isSelected ? "ring-2 ring-primary/30 ring-offset-1" : ""}
            `}
          />
        </div>

        {/* Answer Text */}
        <div className="flex-1">
          <span
            className={`
              text-gray-700 leading-relaxed text-sm sm:text-base
              ${isSelected ? "font-medium" : "font-normal"}
              transition-all duration-200
            `}
            id={`answer-${answer.id}-description`}
          >
            {answer.text}
          </span>

          {/* Answer Value Indicator (for debugging, hidden in production) */}
          {import.meta.env.DEV && (
            <span className="block text-xs text-gray-400 mt-1">
              {answer.dimension}: {answer.value > 0 ? "+" : ""}
              {answer.value}
            </span>
          )}
        </div>

        {/* Selection Checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};

export default AnswerOption;
