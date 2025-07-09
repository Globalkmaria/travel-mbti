import React from "react";
import { motion } from "framer-motion";
import type { MBTIType, DimensionScore } from "../../types";
import { Card, CardHeader, CardContent } from "../ui";
import { useLanguage } from "../../hooks/useLanguage";

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
  const { t } = useLanguage();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80)
      return t("results.confidence.high", "High Confidence");
    if (confidence >= 60)
      return t("results.confidence.moderate", "Moderate Confidence");
    return t("results.confidence.low", "Low Confidence");
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

  // Get translated strength label
  const getStrengthLabel = (strength: string) => {
    return t(`results.strength.${strength}`, strength);
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
            <h1 className="text-4xl font-bold mb-2 tracking-wide text-black">
              {mbtiType.code}
            </h1>
            <h2 className="text-xl font-medium mb-4 text-black">
              {t(`questions.mbtiTypes.${mbtiType.code}.name`, mbtiType.name)}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span
                className={`text-sm font-medium ${getConfidenceColor(
                  confidence
                )}`}
              >
                {getConfidenceLabel(confidence)}
              </span>
              <span className="text-sm text-black">({confidence}%)</span>
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
              {t(
                `questions.mbtiTypes.${mbtiType.code}.description`,
                mbtiType.description
              )}
            </p>
          </motion.div>

          {/* Characteristics List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {mbtiType.characteristics.map((characteristic, index) => {
                const translatedCharacteristic = t(
                  `questions.mbtiTypes.${mbtiType.code}.characteristics.${index}`,
                  characteristic
                );
                return (
                  <motion.div
                    key={characteristic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      {translatedCharacteristic}
                    </span>
                  </motion.div>
                );
              })}
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
                {t("results.dimensionAnalysis.title", "Dimension Analysis")}
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
                        {getStrengthLabel(score.strength)}
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
            {`${t(
              "results.accessibility.typeDescription",
              "Your personality type is"
            )} ${mbtiType.code} - ${mbtiType.name}. ${t(
              "results.accessibility.confidence",
              "Result confidence is"
            )} ${confidence}%.`}
            {dimensionScores
              .map(
                (score) =>
                  `${score.dimension} ${t(
                    "results.accessibility.preference",
                    "preference is"
                  )} ${score.preference} ${t(
                    "results.accessibility.strength",
                    "with"
                  )} ${getStrengthLabel(score.strength)} ${t(
                    "results.accessibility.strengthLabel",
                    "strength"
                  )}.`
              )
              .join(" ")}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
