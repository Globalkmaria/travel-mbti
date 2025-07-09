import React from "react";
import { motion } from "framer-motion";
import type { MBTIType, DimensionScore } from "../../types";
import { Card, CardHeader, CardContent } from "../ui";

export interface ResultCardProps {
  mbtiType: MBTIType;
  dimensionScores: DimensionScore[];
  confidence: number;
  className?: string;
  showDetails?: boolean;
}

/**
 * ResultCard Component
 * Displays MBTI type results with code, name, description, and dimensional scores
 * Includes visual hierarchy and accessibility features
 */
export const ResultCard: React.FC<ResultCardProps> = ({
  mbtiType,
  dimensionScores,
  confidence,
  className = "",
  showDetails = true,
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return "High Confidence";
    if (confidence >= 60) return "Moderate Confidence";
    return "Low Confidence";
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "very clear":
        return "bg-primary text-white";
      case "clear":
        return "bg-primary/80 text-white";
      case "moderate":
        return "bg-primary/60 text-white";
      case "slight":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      <Card className="max-w-2xl mx-auto overflow-hidden" shadow="lg">
        {/* Header with MBTI Type Code and Name */}
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white text-center py-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h1 className="text-4xl font-bold mb-2 tracking-wide">
              {mbtiType.code}
            </h1>
            <h2 className="text-xl font-medium mb-4">{mbtiType.name}</h2>
            <div className="flex items-center justify-center gap-2">
              <span
                className={`text-sm font-medium ${getConfidenceColor(
                  confidence
                )}`}
              >
                {getConfidenceLabel(confidence)}
              </span>
              <span className="text-sm opacity-90">({confidence}%)</span>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Personality Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              {mbtiType.description}
            </p>
          </motion.div>

          {/* Characteristics List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Key Characteristics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {mbtiType.characteristics.map((characteristic, index) => (
                <motion.div
                  key={characteristic}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-gray-700 text-sm">
                    {characteristic}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dimensional Scores */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="border-t pt-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Dimension Analysis
              </h3>
              <div className="space-y-3">
                {dimensionScores.map((score, index) => (
                  <motion.div
                    key={score.dimension}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-800 min-w-[3rem]">
                        {score.dimension}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {score.preference}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStrengthColor(
                          score.strength
                        )}`}
                      >
                        {score.strength}
                      </span>
                      <span className="text-sm text-gray-500 min-w-[3rem] text-right">
                        {score.score > 0 ? "+" : ""}
                        {score.score.toFixed(1)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Accessibility Information */}
          <div className="sr-only" aria-live="polite">
            Your personality type is {mbtiType.code} - {mbtiType.name}. Result
            confidence is {confidence} percent.
            {dimensionScores
              .map(
                (score) =>
                  `${score.dimension} preference is ${score.preference} with ${score.strength} strength.`
              )
              .join(" ")}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
