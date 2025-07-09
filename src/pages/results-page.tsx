import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ResultCard,
  CharacterDisplay,
  TravelRecommendations,
  ShareSection,
} from "../components/results";
import { Button, Card, LoadingSpinner } from "../components/ui";
import { getMBTIType } from "../data";
import type { MBTIType, DimensionScore, MBTICode } from "../types";

// Result data interface from MBTI calculation
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
 * Displays comprehensive MBTI test results with personality type, travel recommendations,
 * and sharing functionality
 */
export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [mbtiType, setMbtiType] = useState<MBTIType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load result from sessionStorage or URL parameters on component mount
  useEffect(() => {
    const loadResult = () => {
      try {
        // Check if this is a shared result from URL parameters
        const sharedTypeCode = searchParams.get("type");

        if (sharedTypeCode) {
          // Load shared result from URL parameter
          const typeData = getMBTIType(sharedTypeCode as MBTICode);

          if (!typeData) {
            throw new Error("Invalid MBTI type code in shared link");
          }

          // Create a basic result object for shared results
          const sharedResult: MBTIResult = {
            typeCode: sharedTypeCode as MBTICode,
            scores: { EI: 0, SN: 0, TF: 0, JP: 0 }, // Placeholder scores
            confidence: 85, // Default confidence for shared results
            dimensionScores: [], // Will be populated if needed
          };

          setResult(sharedResult);
          setMbtiType(typeData);
          setIsSharedResult(true);
          return;
        }

        // Load from sessionStorage for regular test results
        const storedResult = sessionStorage.getItem("mbti-result");

        if (!storedResult) {
          // No result found, redirect to test
          navigate("/test");
          return;
        }

        const parsedResult: MBTIResult = JSON.parse(storedResult);
        const typeData = getMBTIType(parsedResult.typeCode);

        if (!typeData) {
          throw new Error("Invalid MBTI type code");
        }

        setResult(parsedResult);
        setMbtiType(typeData);
        setIsSharedResult(false);
      } catch (err) {
        console.error("Error loading result:", err);
        setError("Failed to load test results. Please retake the test.");
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [navigate, searchParams]);

  // Handle retaking the test
  const handleRetakeTest = () => {
    // Clear stored result
    sessionStorage.removeItem("mbti-result");
    navigate("/test");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1] as const,
      },
    },
  };

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
            <Button variant="primary" onClick={() => navigate("/test")}>
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
