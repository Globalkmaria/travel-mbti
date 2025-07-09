import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, LoadingSpinner } from "../components/ui";
import { QuestionCard, TestNavigation, TestProgress } from "../components/test";
import { useMBTITest } from "../hooks/useMBTITest";
import { useLanguage } from "../hooks/useLanguage";

/**
 * TestPage Component
 * Main testing interface with questions, navigation, and progress tracking
 * Features keyboard navigation and responsive design
 */
export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { t } = useLanguage();

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
  } = useMBTITest();

  // Handle test submission
  const handleSubmit = React.useCallback(async () => {
    try {
      setIsSubmitting(true);
      const result = await calculateResult();

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

  // Handle answer selection with auto-submission for last question
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

  // Loading state
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" className="mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("test.loading.preparing", "Preparing Your Test")}
          </h2>
          <p className="text-gray-600">
            {t(
              "test.loading.subtitle",
              "Setting up your personality assessment..."
            )}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            {t("test.header.title", "MBTI Travel Personality Test")}
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {t(
              "test.header.subtitle",
              "Answer each question based on your natural preferences and instincts. There are no right or wrong answers - just be honest about yourself."
            )}
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <TestProgress
          progress={progress}
          variant="detailed"
          showPercentage={true}
          showQuestionCount={true}
        />

        {/* Question Card */}
        <motion.div
          key={testState.currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={
              testState.answers[testState.currentQuestionIndex]?.answerId
            }
            onAnswerSelect={handleAnswerSelect}
          />
        </motion.div>

        {/* Navigation */}
        <Card className="p-6">
          <TestNavigation
            canGoPrevious={canGoBack}
            canGoNext={canGoForward}
            isLastQuestion={isLastQuestion}
            isAnswerSelected={hasAnsweredCurrentQuestion}
            isSubmitting={isSubmitting}
            onPrevious={goToPreviousQuestion}
            onNext={goToNextQuestion}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </div>
  );
};

export default TestPage;
