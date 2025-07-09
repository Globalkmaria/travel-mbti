import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Card, LoadingSpinner } from "../components/ui";
import {
  ResultCard,
  TravelRecommendations,
  CharacterDisplay,
  ShareSection,
} from "../components/results";
import { getMBTIType } from "../data";
import type { MBTICode, DimensionScore } from "../types";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

// Local interface for component state
interface MBTIResult {
  typeCode: MBTICode;
  scores: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
  confidence: number;
  dimensionScores: DimensionScore[];
}

/**
 * ResultsPage Component
 * Displays MBTI test results with character, analysis, and sharing options
 * Supports both personal results and shared results via URL parameters
 */
export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [result, setResult] = useState<MBTIResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Helper function to clear all test data
  const clearTestData = () => {
    // Clear sessionStorage result
    try {
      sessionStorage.removeItem("mbti-result");
    } catch (error) {
      console.warn("Failed to clear sessionStorage:", error);
    }

    // Clear localStorage test state
    try {
      localStorage.removeItem("mbti-test-state");
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }
  };

  // Load result from sessionStorage or URL parameter
  useEffect(() => {
    const loadResult = () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if this is a shared result (type parameter in URL)
        const typeFromUrl = searchParams.get("type");
        if (typeFromUrl) {
          setIsSharedResult(true);
          const mbtiType = getMBTIType(typeFromUrl as MBTICode);
          if (mbtiType) {
            // Create a mock result for shared type
            const mockResult: MBTIResult = {
              typeCode: typeFromUrl as MBTICode,
              scores: { EI: 0.6, SN: 0.7, TF: 0.5, JP: 0.8 },
              confidence: 85,
              dimensionScores: [
                {
                  dimension: "EI",
                  score: 0.6,
                  preference: "E",
                  strength: "moderate",
                },
                {
                  dimension: "SN",
                  score: 0.7,
                  preference: "N",
                  strength: "clear",
                },
                {
                  dimension: "TF",
                  score: 0.5,
                  preference: "T",
                  strength: "slight",
                },
                {
                  dimension: "JP",
                  score: 0.8,
                  preference: "P",
                  strength: "very clear",
                },
              ],
            };
            setResult(mockResult);
          } else {
            setError("Invalid personality type in shared link.");
          }
          setIsLoading(false);
          return;
        }

        // Load from sessionStorage for regular results
        setIsSharedResult(false);
        const storedResult = sessionStorage.getItem("mbti-result");
        if (storedResult) {
          const parsedResult = JSON.parse(storedResult) as MBTIResult;
          setResult(parsedResult);
        } else {
          setError(
            "No test results found. Please complete the personality test first."
          );
        }
      } catch (err) {
        console.error("Error loading results:", err);
        setError("Failed to load your results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [searchParams]);

  // Handle retaking the test
  const handleRetakeTest = () => {
    clearTestData();
    navigate("/test");
  };

  // Get the MBTI type object for components
  const mbtiType = result ? getMBTIType(result.typeCode) : null;

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <Card className="p-8 text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Your Results
          </h2>
          <p className="text-gray-600">
            Analyzing your personality and travel preferences...
          </p>
        </Card>
      </motion.div>
    );
  }

  // Error state
  if (error || !result || !mbtiType) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <Card className="p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Results Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "We couldn't find your test results. Please take the test again."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" onClick={handleRetakeTest}>
              Take Test Again
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Main results display
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.header variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              🎉{" "}
              {isSharedResult
                ? "Shared Travel Personality"
                : "Your Travel Personality"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isSharedResult
                ? "Someone shared their MBTI travel personality with you! See how this personality type influences travel preferences and style."
                : "Discover how your MBTI personality type influences your travel preferences and style"}
            </p>
            {isSharedResult && (
              <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                📤 Shared Result
              </div>
            )}
          </motion.header>

          {/* Character Display Section */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <CharacterDisplay
              mbtiType={mbtiType}
              size="xl"
              showTypeCode={true}
              animate={true}
              priority={true}
            />
          </motion.div>

          {/* Main Results Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Result Card */}
            <motion.div variants={itemVariants}>
              <ResultCard
                mbtiType={mbtiType}
                dimensionScores={result.dimensionScores}
                confidence={result.confidence}
                showDetails={true}
                className="h-full"
              />
            </motion.div>

            {/* Travel Recommendations */}
            <motion.div variants={itemVariants}>
              <TravelRecommendations
                travelStyle={mbtiType.travelStyle}
                showAllSections={true}
                animateOnScroll={true}
                className="h-full"
              />
            </motion.div>
          </div>

          {/* Share Section */}
          <motion.div variants={itemVariants}>
            <ShareSection mbtiType={mbtiType} className="mb-8" />
          </motion.div>

          {/* Action Buttons Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleRetakeTest}
                className="min-w-[140px]"
              >
                🔄 Retake Test
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate("/")}
                className="min-w-[140px]"
              >
                🏠 Go Home
              </Button>
            </div>

            {/* Additional Information */}
            <motion.div
              variants={itemVariants}
              className="max-w-2xl mx-auto mt-8"
            >
              <Card className="p-6 bg-white/50 border-0">
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Understanding Your Results
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your MBTI travel personality type is based on your responses
                    to {result.dimensionScores.length * 4} questions across four
                    key dimensions. This analysis helps you understand your
                    natural travel preferences, from destination choices to
                    planning styles, enabling you to make more informed travel
                    decisions that align with your personality.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <span>Confidence Level: {result.confidence}%</span>
                    <span>•</span>
                    <span>Completed: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Debug Information (Development Only) */}
          {import.meta.env.DEV && (
            <motion.div variants={itemVariants}>
              <Card className="p-4 bg-yellow-50 border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Debug Information (Dev Only)
                </h4>
                <pre className="text-xs text-yellow-700 overflow-auto">
                  {JSON.stringify(
                    {
                      typeCode: result.typeCode,
                      confidence: result.confidence,
                      scores: result.scores,
                    },
                    null,
                    2
                  )}
                </pre>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
