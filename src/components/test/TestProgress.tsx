import React from "react";
import { motion } from "framer-motion";
import { ProgressBar } from "../ui";
import type { TestProgress as TestProgressType } from "../../types";
import { useLanguage } from "../../hooks/useLanguage";

export interface TestProgressProps {
  progress: TestProgressType;
  showPercentage?: boolean;
  showQuestionCount?: boolean;
  className?: string;
  variant?: "default" | "minimal" | "detailed";
}

/**
 * TestProgress Component
 * Displays test completion progress with visual progress bar and question counter
 * Includes ARIA live region for screen reader updates
 */
export const TestProgress: React.FC<TestProgressProps> = ({
  progress,
  showPercentage = true,
  showQuestionCount = true,
  className = "",
  variant = "default",
}) => {
  const {
    currentQuestion,
    totalQuestions,
    progressPercentage,
    answeredQuestions,
  } = progress;

  const { t } = useLanguage();

  // Format percentage for display
  const formattedPercentage = Math.round(progressPercentage);

  // Progress status for screen readers
  const progressStatus = `Question ${currentQuestion} of ${totalQuestions}. ${formattedPercentage}% complete.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full ${className}`}
      role="progressbar"
      aria-valuenow={progressPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Test progress"
    >
      {/* Progress Header */}
      {variant !== "minimal" && (
        <div className="flex items-center justify-between mb-3">
          {/* Question Counter */}
          {showQuestionCount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-2"
            >
              <span className="text-sm font-medium text-gray-600">
                {t("test.progress.question", "Question")}
              </span>
              <span className="text-lg font-bold text-gray-800">
                {currentQuestion}
              </span>
              <span className="text-sm text-gray-500">of {totalQuestions}</span>
            </motion.div>
          )}

          {/* Percentage Display */}
          {showPercentage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-1"
            >
              <span className="text-sm font-medium text-primary">
                {formattedPercentage}%
              </span>
              <span className="text-xs text-gray-500">
                {t("test.progress.complete", "complete")}
              </span>
            </motion.div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="origin-left"
      >
        <ProgressBar
          value={progressPercentage}
          max={100}
          size={variant === "minimal" ? "sm" : "md"}
          color="primary"
          animated={true}
          showLabel={variant === "detailed"}
          label={
            variant === "detailed"
              ? `${formattedPercentage}% ${t(
                  "test.progress.complete",
                  "complete"
                )}`
              : undefined
          }
          className="w-full"
        />
      </motion.div>

      {/* Detailed Progress Information */}
      {variant === "detailed" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-3 space-y-2"
        >
          {/* Answered vs Remaining */}
          <div className="flex justify-between text-xs text-gray-600">
            <span>
              {t("test.progress.answered", "Answered")}:{" "}
              <strong>{answeredQuestions}</strong>
            </span>
            <span>
              {t("test.progress.remaining", "Remaining")}:{" "}
              <strong>{totalQuestions - answeredQuestions}</strong>
            </span>
          </div>

          {/* Estimated Time */}
          <div className="text-xs text-gray-500 text-center">
            {Math.ceil((totalQuestions - currentQuestion + 1) * 0.5)}{" "}
            {t("test.progress.minutes", "minutes")}
          </div>
        </motion.div>
      )}

      {/* Progress Dots (Visual Enhancement) */}
      {variant !== "minimal" && totalQuestions <= 20 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-4 space-x-1"
          aria-hidden="true"
        >
          {Array.from({ length: totalQuestions }, (_, index) => {
            const questionNumber = index + 1;
            const isCompleted = questionNumber < currentQuestion;
            const isCurrent = questionNumber === currentQuestion;

            return (
              <motion.div
                key={questionNumber}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 0.5 + index * 0.02,
                }}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-primary shadow-sm"
                      : isCurrent
                      ? "bg-primary/60 scale-125"
                      : "bg-gray-200"
                  }
                `}
              />
            );
          })}
        </motion.div>
      )}

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {progressStatus}
      </div>
    </motion.div>
  );
};

export default TestProgress;
