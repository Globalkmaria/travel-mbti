import { useState, useCallback, useEffect, useMemo } from "react";
import type { TestState, TestProgress, UserAnswer } from "../types";
import { questions, getMBTIType } from "../data";
import { processMBTITest, validateAnswers } from "../utils/mbtiCalculator";

// Local storage key for test persistence
const STORAGE_KEY = "mbti-test-state";

// Initial test state
const initialTestState: TestState = {
  currentQuestionIndex: 0,
  answers: [],
  isCompleted: false,
  startTime: new Date(),
};

export interface UseMBTITestReturn {
  // Current state
  testState: TestState;
  currentQuestion: (typeof questions)[0] | null;
  progress: TestProgress;

  // Navigation actions
  answerQuestion: (answerId: string) => void;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
  goToQuestion: (index: number) => void;

  // Test control
  calculateResult: () => void;
  resetTest: () => void;
  saveProgress: () => void;
  loadProgress: () => void;

  // Computed properties
  canGoBack: boolean;
  canGoForward: boolean;
  isLastQuestion: boolean;
  hasAnsweredCurrentQuestion: boolean;
  completionPercentage: number;
}

/**
 * Custom React hook for managing MBTI test state and interactions
 * Handles question navigation, answer collection, result calculation, and persistence
 */
export function useMBTITest(): UseMBTITestReturn {
  const [testState, setTestState] = useState<TestState>(() => {
    // Try to load from localStorage on initialization
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          startTime: new Date(parsed.startTime),
          completionTime: parsed.completionTime
            ? new Date(parsed.completionTime)
            : undefined,
        };
      } catch (error) {
        console.warn("Failed to parse saved test state:", error);
        return initialTestState;
      }
    }
    return initialTestState;
  });

  // Current question based on index
  const currentQuestion = useMemo(() => {
    return questions[testState.currentQuestionIndex] || null;
  }, [testState.currentQuestionIndex]);

  // Progress calculation
  const progress: TestProgress = useMemo(() => {
    const totalQuestions = questions.length;
    const currentQuestion = testState.currentQuestionIndex + 1;
    const answeredQuestions = testState.answers.length;
    const progressPercentage = Math.round(
      (answeredQuestions / totalQuestions) * 100
    );

    return {
      currentQuestion,
      totalQuestions,
      answeredQuestions,
      progressPercentage,
    };
  }, [testState.currentQuestionIndex, testState.answers.length]);

  // Computed properties
  const canGoBack = testState.currentQuestionIndex > 0;
  const canGoForward = testState.currentQuestionIndex < questions.length - 1;
  const isLastQuestion =
    testState.currentQuestionIndex === questions.length - 1;
  const completionPercentage = Math.round(
    (testState.answers.length / questions.length) * 100
  );

  // Check if current question has been answered
  const hasAnsweredCurrentQuestion = useMemo(() => {
    if (!currentQuestion) return false;
    return testState.answers.some(
      (answer) => answer.questionId === currentQuestion.id
    );
  }, [currentQuestion, testState.answers]);

  // Save to localStorage
  const saveProgress = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testState));
    } catch (error) {
      console.warn("Failed to save test progress:", error);
    }
  }, [testState]);

  // Load from localStorage
  const loadProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTestState({
          ...parsed,
          startTime: new Date(parsed.startTime),
          completionTime: parsed.completionTime
            ? new Date(parsed.completionTime)
            : undefined,
        });
      }
    } catch (error) {
      console.warn("Failed to load test progress:", error);
    }
  }, []);

  // Auto-save on state changes
  useEffect(() => {
    if (testState.answers.length > 0 || testState.currentQuestionIndex > 0) {
      saveProgress();
    }
  }, [testState, saveProgress]);

  // Answer current question
  const answerQuestion = useCallback(
    (answerId: string) => {
      if (!currentQuestion) return;

      // Find the selected answer
      const selectedAnswer = currentQuestion.answers.find(
        (a) => a.id === answerId
      );
      if (!selectedAnswer) {
        console.warn("Selected answer not found:", answerId);
        return;
      }

      setTestState((prevState) => {
        // Remove any existing answer for this question
        const filteredAnswers = prevState.answers.filter(
          (answer) => answer.questionId !== currentQuestion.id
        );

        // Add the new answer
        const newAnswer: UserAnswer = {
          questionId: currentQuestion.id,
          answerId: selectedAnswer.id,
          value: selectedAnswer.value,
          dimension: selectedAnswer.dimension,
        };

        const updatedAnswers = [...filteredAnswers, newAnswer];

        return {
          ...prevState,
          answers: updatedAnswers,
        };
      });

      // Auto-advance to next question if not on last question
      if (!isLastQuestion) {
        setTimeout(() => {
          goToNextQuestion();
        }, 500); // Small delay for better UX
      }
    },
    [currentQuestion, isLastQuestion]
  );

  // Navigate to previous question
  const goToPreviousQuestion = useCallback(() => {
    setTestState((prevState) => ({
      ...prevState,
      currentQuestionIndex: Math.max(0, prevState.currentQuestionIndex - 1),
    }));
  }, []);

  // Navigate to next question
  const goToNextQuestion = useCallback(() => {
    setTestState((prevState) => ({
      ...prevState,
      currentQuestionIndex: Math.min(
        questions.length - 1,
        prevState.currentQuestionIndex + 1
      ),
    }));
  }, []);

  // Navigate to specific question
  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setTestState((prevState) => ({
        ...prevState,
        currentQuestionIndex: index,
      }));
    }
  }, []);

  // Calculate MBTI result
  const calculateResult = useCallback(() => {
    try {
      // Validate answers first
      const validation = validateAnswers(testState.answers);

      if (!validation.isValid) {
        console.warn("Test validation failed:", validation.issues);

        // Allow calculation with warning if we have at least 70% completion
        if (validation.completeness < 70) {
          throw new Error(
            `Test incomplete: ${validation.completeness}% completed. At least 70% required.`
          );
        }
      }

      // Process the test and get results
      const result = processMBTITest(testState.answers);

      // Get the full MBTI type data
      const mbtiTypeData = getMBTIType(result.typeCode);

      if (!mbtiTypeData) {
        throw new Error(`MBTI type data not found for: ${result.typeCode}`);
      }

      // Update state with completion and results
      setTestState((prevState) => ({
        ...prevState,
        isCompleted: true,
        result: mbtiTypeData,
        completionTime: new Date(),
      }));

      return {
        ...result,
        personalityType: mbtiTypeData,
      };
    } catch (error) {
      console.error("Failed to calculate MBTI result:", error);
      throw error;
    }
  }, [testState.answers]);

  // Reset test to initial state
  const resetTest = useCallback(() => {
    setTestState(initialTestState);

    // Clear local storage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear stored test state:", error);
    }
  }, []);

  return {
    // State
    testState,
    currentQuestion,
    progress,

    // Actions
    answerQuestion,
    goToPreviousQuestion,
    goToNextQuestion,
    goToQuestion,
    calculateResult,
    resetTest,
    saveProgress,
    loadProgress,

    // Computed properties
    canGoBack,
    canGoForward,
    isLastQuestion,
    hasAnsweredCurrentQuestion,
    completionPercentage,
  };
}
