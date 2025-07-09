import React from "react";
import { motion } from "framer-motion";
import { Button, LoadingSpinner } from "../ui";
import { useLanguage } from "../../hooks/useLanguage";

export interface TestNavigationProps {
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  isAnswerSelected: boolean;
  isSubmitting?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  showKeyboardHints?: boolean;
}

/**
 * TestNavigation Component
 * Provides Previous/Next navigation and Submit functionality for the MBTI test
 * Includes keyboard navigation hints and loading states
 */
export const TestNavigation: React.FC<TestNavigationProps> = ({
  canGoPrevious,
  canGoNext,
  isLastQuestion,
  isAnswerSelected,
  isSubmitting = false,
  onPrevious,
  onNext,
  onSubmit,
  disabled = false,
  showKeyboardHints = true,
}) => {
  const { t } = useLanguage();

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled || isSubmitting) return;

      switch (event.key) {
        case "ArrowLeft":
          if (canGoPrevious && event.ctrlKey) {
            event.preventDefault();
            onPrevious();
          }
          break;
        case "ArrowRight":
          if (canGoNext && isAnswerSelected && event.ctrlKey) {
            event.preventDefault();
            if (isLastQuestion) {
              onSubmit();
            } else {
              onNext();
            }
          }
          break;
        case "Enter":
          if (isAnswerSelected && !event.shiftKey) {
            event.preventDefault();
            if (isLastQuestion) {
              onSubmit();
            } else if (canGoNext) {
              onNext();
            }
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    canGoPrevious,
    canGoNext,
    isAnswerSelected,
    isLastQuestion,
    disabled,
    isSubmitting,
    onPrevious,
    onNext,
    onSubmit,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex flex-col space-y-4"
    >
      {/* Main Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        {/* Previous Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={onPrevious}
            disabled={!canGoPrevious || disabled || isSubmitting}
            className="min-w-[120px]"
            aria-label={t(
              "test.navigation.previous.aria",
              "Go to previous question"
            )}
          >
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t("test.navigation.previous", "Previous")}
            </div>
          </Button>
        </motion.div>

        {/* Question Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex-1 text-center"
        >
          {!isAnswerSelected && !isLastQuestion && (
            <p className="text-sm text-gray-500" aria-live="polite">
              {t(
                "test.navigation.selectAnswer",
                "Please select an answer to continue"
              )}
            </p>
          )}
          {isAnswerSelected && !isLastQuestion && (
            <p className="text-sm text-green-600" aria-live="polite">
              {t("test.navigation.ready", "Ready to continue")}
            </p>
          )}
          {isLastQuestion && isAnswerSelected && (
            <p className="text-sm text-blue-600" aria-live="polite">
              {t("test.navigation.readySubmit", "Ready to submit your test")}
            </p>
          )}
        </motion.div>

        {/* Next/Submit Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {isLastQuestion ? (
            <Button
              variant="primary"
              size="lg"
              onClick={onSubmit}
              disabled={!isAnswerSelected || disabled || isSubmitting}
              loading={isSubmitting}
              className="min-w-[120px]"
              aria-label={t(
                "test.navigation.submit.aria",
                "Submit test and view results"
              )}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" color="white" className="mr-2" />
                  {t("test.navigation.submitting", "Submitting...")}
                </>
              ) : (
                <div className="flex items-center justify-end">
                  {t("test.navigation.submit", "Submit Test")}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={onNext}
              disabled={
                !isAnswerSelected || !canGoNext || disabled || isSubmitting
              }
              className="min-w-[120px]"
              aria-label={t("test.navigation.next.aria", "Go to next question")}
            >
              <div className="flex items-center">
                {t("test.navigation.next", "Next")}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Button>
          )}
        </motion.div>
      </div>

      {/* Keyboard Navigation Hints */}
      {showKeyboardHints && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-center text-xs text-gray-400 space-y-1"
        >
          <p>
            {t("test.navigation.hints.keyboard", "Keyboard shortcuts:")}
            <span className="mx-2">←</span>
            {t("test.navigation.hints.previous", "Previous")}
            <span className="mx-2">•</span>
            <span className="mx-2">→</span>
            {t("test.navigation.hints.next", "Next")}
            <span className="mx-2">•</span>
            <span className="mx-2">Enter</span>
            {t("test.navigation.hints.continue", "Continue")}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TestNavigation;
