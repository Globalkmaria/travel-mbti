import React from "react";
import { motion } from "framer-motion";
import type { QuestionCardProps } from "../../types";
import { Card, CardContent } from "../ui";

/**
 * QuestionCard Component
 * Displays a single MBTI question with answers in a responsive card layout
 * Includes animations and accessibility features
 */
export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isLocked = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card
        className="min-h-[300px] sm:min-h-[350px]"
        shadow="lg"
        hover={!isLocked}
        padding="lg"
      >
        <CardContent>
          {/* Question Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Question
              </span>
              <span className="text-sm text-gray-400">
                {question.dimension} Dimension
              </span>
            </div>

            {/* Question Text */}
            <h2
              className="text-xl sm:text-2xl font-semibold text-gray-800 leading-relaxed"
              role="heading"
              aria-level={2}
            >
              {question.text}
            </h2>
          </div>

          {/* Answer Options */}
          <div
            className="space-y-3"
            role="radiogroup"
            aria-label="Answer options"
          >
            {question.answers.map((answer, index) => (
              <motion.button
                key={answer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                onClick={() => !isLocked && onAnswerSelect(answer.id)}
                disabled={isLocked}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                  min-h-[60px] sm:min-h-[50px] 
                  ${
                    selectedAnswer === answer.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                  ${
                    isLocked
                      ? "cursor-not-allowed opacity-75"
                      : "cursor-pointer active:scale-[0.98]"
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                `}
                role="radio"
                aria-checked={selectedAnswer === answer.id}
                aria-describedby={`answer-${answer.id}-description`}
              >
                <div className="flex items-start space-x-3">
                  {/* Radio Indicator */}
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5
                      ${
                        selectedAnswer === answer.id
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }
                      transition-all duration-200
                    `}
                    aria-hidden="true"
                  >
                    {selectedAnswer === answer.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full rounded-full bg-white scale-50"
                      />
                    )}
                  </div>

                  {/* Answer Text */}
                  <span
                    className="text-gray-700 leading-relaxed text-sm sm:text-base"
                    id={`answer-${answer.id}-description`}
                  >
                    {answer.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selection Hint */}
          {!selectedAnswer && !isLocked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500 text-center mt-6"
              aria-live="polite"
            >
              Please select the option that best describes you
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
