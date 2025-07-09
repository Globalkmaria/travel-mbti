import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMBTITest } from "../hooks/useMBTITest";
import { QuestionCard, TestProgress, TestNavigation } from "../components/test";
import { LoadingSpinner, Card } from "../components/ui";

/**
 * TestPage Component
 * Main personality test interface with question flow, progress tracking, and navigation
 * Handles the complete MBTI test experience from start to completion
 */
export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize the MBTI test hook
  const {
    testState,
    currentQuestion,
    progress,
    answerQuestion,
    goToPreviousQuestion,
    goToNextQuestion,
    calculateResult,
    canGoBack,
    canGoForward,
    isLastQuestion,
    hasAnsweredCurrentQuestion,
    resetTest,
  } = useMBTITest();

  // Handle test submission
  const handleSubmit = React.useCallback(() => {
    try {
      setIsSubmitting(true);
      const result = calculateResult();

      // Store result in sessionStorage for the results page
      sessionStorage.setItem("mbti-result", JSON.stringify(result));

      // Navigate to results page
      navigate("/results");
    } catch (error) {
      console.error("Error calculating result:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  }, [calculateResult, navigate]);

  // Handle answer selection with auto-submit logic
  const handleAnswerSelect = React.useCallback(
    (answerId: string) => {
      answerQuestion(answerId);

      // Auto-submit if this is the last question
      if (isLastQuestion) {
        setTimeout(() => {
          handleSubmit();
        }, 800); // Small delay for better UX
      }
    },
    [answerQuestion, isLastQuestion, handleSubmit]
  );

  // Redirect to results when test is completed
  useEffect(() => {
    if (testState.isCompleted && testState.result) {
      navigate("/results", {
        state: { result: testState.result },
        replace: true,
      });
    }
  }, [testState.isCompleted, testState.result, navigate]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          if ((event.ctrlKey || event.metaKey) && canGoBack) {
            event.preventDefault();
            goToPreviousQuestion();
          }
          break;
        case "ArrowRight":
          if ((event.ctrlKey || event.metaKey) && canGoForward) {
            event.preventDefault();
            goToNextQuestion();
          }
          break;
        case "Enter":
          if (isLastQuestion && hasAnsweredCurrentQuestion) {
            event.preventDefault();
            handleSubmit();
          } else if (canGoForward) {
            event.preventDefault();
            goToNextQuestion();
          }
          break;
        case "Escape":
          // Optional: Show exit confirmation
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    canGoBack,
    canGoForward,
    goToPreviousQuestion,
    goToNextQuestion,
    isLastQuestion,
    hasAnsweredCurrentQuestion,
    handleSubmit,
  ]);

  // Handle navigation
  const handleNavigation = {
    previous: goToPreviousQuestion,
    next: goToNextQuestion,
    submit: handleSubmit,
  };

  // Show loading state if test is initializing
  if (!currentQuestion && !testState.isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Preparing Your Test
          </h2>
          <p className="text-gray-600">
            Setting up your personality assessment...
          </p>
        </Card>
      </div>
    );
  }

  // Main test interface
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] as const }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            MBTI Travel Personality Test
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answer each question based on your natural preferences and
            instincts. There are no right or wrong answers - just be honest
            about yourself.
          </p>
        </motion.header>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <TestProgress
            progress={progress}
            variant="detailed"
            showPercentage={true}
            showQuestionCount={true}
          />
        </motion.div>

        {/* Question Section */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={`question-${testState.currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1] as const,
                }}
              >
                <QuestionCard
                  question={currentQuestion}
                  selectedAnswer={
                    testState.answers.find(
                      (answer) => answer.questionId === currentQuestion.id
                    )?.answerId
                  }
                  onAnswerSelect={handleAnswerSelect}
                  isLocked={isSubmitting}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <TestNavigation
            canGoPrevious={canGoBack}
            canGoNext={canGoForward}
            isLastQuestion={isLastQuestion}
            isAnswerSelected={hasAnsweredCurrentQuestion}
            isSubmitting={isSubmitting}
            onPrevious={handleNavigation.previous}
            onNext={handleNavigation.next}
            onSubmit={handleNavigation.submit}
            disabled={isSubmitting}
            showKeyboardHints={true}
          />
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Card className="p-6 bg-white/50 border-0">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-primary">💡</span>
                <span>
                  Answer instinctively - first thoughts are often most accurate
                </span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center gap-2">
                <span className="text-accent">⌨️</span>
                <span>Use Ctrl + Arrow keys to navigate</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">🔒</span>
                <span>Your answers are private and secure</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Debug Information (Development Only) */}
        {import.meta.env.DEV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600"
          >
            <details>
              <summary className="cursor-pointer font-medium mb-2">
                Debug Information (Development Only)
              </summary>
              <div className="space-y-2">
                <div>
                  Current Question: {testState.currentQuestionIndex + 1} /{" "}
                  {progress.totalQuestions}
                </div>
                <div>Answers: {testState.answers.length}</div>
                <div>Progress: {progress.progressPercentage}%</div>
                <div>Can Go Previous: {canGoBack ? "Yes" : "No"}</div>
                <div>Can Go Next: {canGoForward ? "Yes" : "No"}</div>
                <div>Is Submitting: {isSubmitting ? "Yes" : "No"}</div>
                <button
                  onClick={resetTest}
                  className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                >
                  Reset Test
                </button>
              </div>
            </details>
          </motion.div>
        )}
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Page Metadata */}
      <div className="sr-only">
        <h1>
          MBTI Travel Personality Test - Question {progress.currentQuestion} of{" "}
          {progress.totalQuestions}
        </h1>
        <meta
          name="description"
          content="Take our comprehensive MBTI-based personality test to discover your travel style and get personalized recommendations."
        />
        <meta name="robots" content="noindex" />
      </div>
    </motion.div>
  );
};

export default TestPage;
