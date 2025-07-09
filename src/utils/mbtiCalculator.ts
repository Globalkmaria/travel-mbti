import type { UserAnswer, MBTICode, MBTIType, DimensionScore } from "../types";
import { mbtiTypes } from "../data";

// MBTI dimension weights and calculations
interface MBTIScores {
  EI: number; // Extraversion/Introversion
  SN: number; // Sensing/iNtuition
  TF: number; // Thinking/Feeling
  JP: number; // Judging/Perceiving
}

interface MBTIResult {
  typeCode: MBTICode;
  scores: MBTIScores;
  confidence: number;
  dimensionScores: DimensionScore[];
}

/**
 * Calculate MBTI scores from user answers
 * @param answers Array of user answers with values and dimensions
 * @returns MBTIScores object with normalized scores for each dimension
 */
export function calculateMBTIScores(answers: UserAnswer[]): MBTIScores {
  // Initialize score accumulators
  const scores = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  const counts = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  // Process each answer
  answers.forEach((answer) => {
    const { dimension, value } = answer;

    // Map individual dimensions to dimension pairs
    switch (dimension) {
      case "E":
        scores.EI += value;
        counts.EI += 1;
        break;
      case "I":
        scores.EI -= value; // Reverse for Introversion
        counts.EI += 1;
        break;
      case "S":
        scores.SN -= value; // Reverse for Sensing
        counts.SN += 1;
        break;
      case "N":
        scores.SN += value;
        counts.SN += 1;
        break;
      case "T":
        scores.TF -= value; // Reverse for Thinking
        counts.TF += 1;
        break;
      case "F":
        scores.TF += value;
        counts.TF += 1;
        break;
      case "J":
        scores.JP -= value; // Reverse for Judging
        counts.JP += 1;
        break;
      case "P":
        scores.JP += value;
        counts.JP += 1;
        break;
    }
  });

  // Normalize scores by count to handle incomplete tests
  const normalizedScores: MBTIScores = {
    EI: counts.EI > 0 ? scores.EI / counts.EI : 0,
    SN: counts.SN > 0 ? scores.SN / counts.SN : 0,
    TF: counts.TF > 0 ? scores.TF / counts.TF : 0,
    JP: counts.JP > 0 ? scores.JP / counts.JP : 0,
  };

  return normalizedScores;
}

/**
 * Determine MBTI type from calculated scores
 * @param scores MBTIScores object with dimension scores
 * @returns 4-letter MBTI type code
 */
export function determineMBTIType(scores: MBTIScores): MBTICode {
  // Determine each dimension preference
  const E_or_I = scores.EI >= 0 ? "E" : "I";
  const S_or_N = scores.SN >= 0 ? "N" : "S";
  const T_or_F = scores.TF >= 0 ? "F" : "T";
  const J_or_P = scores.JP >= 0 ? "P" : "J";

  const typeCode = `${E_or_I}${S_or_N}${T_or_F}${J_or_P}` as MBTICode;

  // Validate that the type exists in our data
  if (!mbtiTypes[typeCode]) {
    console.warn(
      `Generated MBTI type ${typeCode} not found in data. Defaulting to ENFP.`
    );
    return "ENFP";
  }

  return typeCode;
}

/**
 * Convert numeric strength to categorical strength
 * @param numericStrength Absolute score value (0-2)
 * @returns Categorical strength description
 */
function getStrengthCategory(
  numericStrength: number
): "slight" | "moderate" | "clear" | "very clear" {
  if (numericStrength < 0.3) return "slight";
  if (numericStrength < 0.7) return "moderate";
  if (numericStrength < 1.3) return "clear";
  return "very clear";
}

/**
 * Calculate confidence score based on how decisive the results are
 * @param scores MBTIScores object
 * @returns confidence percentage (0-100)
 */
export function calculateConfidence(scores: MBTIScores): number {
  // Calculate average absolute score (how far from neutral)
  const absoluteScores = [
    Math.abs(scores.EI),
    Math.abs(scores.SN),
    Math.abs(scores.TF),
    Math.abs(scores.JP),
  ];

  const averageStrength =
    absoluteScores.reduce((sum, score) => sum + score, 0) / 4;

  // Convert to confidence percentage (assuming max score strength of 2)
  const confidence = Math.min(100, (averageStrength / 2) * 100);

  return Math.round(confidence);
}

/**
 * Get complete MBTI type data from type code
 * @param typeCode 4-letter MBTI type code
 * @returns Complete MBTIType object or null if not found
 */
export function getMBTITypeData(typeCode: string): MBTIType | null {
  return mbtiTypes[typeCode] || null;
}

/**
 * Main function to process complete MBTI test results
 * @param answers Array of user answers
 * @returns Complete MBTI result with type, scores, and confidence
 */
export function processMBTITest(answers: UserAnswer[]): MBTIResult {
  // Validate input
  if (!answers || answers.length === 0) {
    throw new Error("No answers provided for MBTI calculation");
  }

  // Calculate scores
  const scores = calculateMBTIScores(answers);

  // Determine type
  const typeCode = determineMBTIType(scores);

  // Calculate confidence
  const confidence = calculateConfidence(scores);

  // Create dimension scores for detailed results
  const dimensionScores: DimensionScore[] = [
    {
      dimension: "EI",
      score: scores.EI,
      preference: scores.EI >= 0 ? "E" : "I",
      strength: getStrengthCategory(Math.abs(scores.EI)),
    },
    {
      dimension: "SN",
      score: scores.SN,
      preference: scores.SN >= 0 ? "N" : "S",
      strength: getStrengthCategory(Math.abs(scores.SN)),
    },
    {
      dimension: "TF",
      score: scores.TF,
      preference: scores.TF >= 0 ? "F" : "T",
      strength: getStrengthCategory(Math.abs(scores.TF)),
    },
    {
      dimension: "JP",
      score: scores.JP,
      preference: scores.JP >= 0 ? "P" : "J",
      strength: getStrengthCategory(Math.abs(scores.JP)),
    },
  ];

  return {
    typeCode,
    scores,
    confidence,
    dimensionScores,
  };
}

/**
 * Validate MBTI answers for completeness and correctness
 * @param answers Array of user answers
 * @returns Validation result with any issues found
 */
export function validateAnswers(answers: UserAnswer[]): {
  isValid: boolean;
  issues: string[];
  completeness: number;
} {
  const issues: string[] = [];

  if (!answers || answers.length === 0) {
    issues.push("No answers provided");
    return { isValid: false, issues, completeness: 0 };
  }

  // Check for required dimensions
  const dimensions = new Set(answers.map((a) => a.dimension));
  const requiredDimensions = ["E", "I", "S", "N", "T", "F", "J", "P"];
  const missingDimensions = requiredDimensions.filter(
    (d) => !dimensions.has(d)
  );

  if (missingDimensions.length > 0) {
    issues.push(`Missing dimensions: ${missingDimensions.join(", ")}`);
  }

  // Calculate completeness percentage
  const completeness = Math.round((answers.length / 18) * 100); // Assuming 18 total questions

  // Check for invalid values
  const invalidAnswers = answers.filter(
    (a) => typeof a.value !== "number" || a.value < -2 || a.value > 2
  );

  if (invalidAnswers.length > 0) {
    issues.push(`${invalidAnswers.length} answers have invalid values`);
  }

  const isValid = issues.length === 0 && completeness >= 70; // Require at least 70% completion

  return {
    isValid,
    issues,
    completeness,
  };
}

/**
 * Get travel recommendations based on MBTI type
 * @param typeCode MBTI type code
 * @returns Travel recommendations or null if type not found
 */
export function getTravelRecommendations(typeCode: string) {
  const mbtiType = getMBTITypeData(typeCode);
  return mbtiType?.travelStyle || null;
}

// Export individual calculation functions for testing
export { type MBTIScores, type MBTIResult };
