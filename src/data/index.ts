// MBTI Travel Style Analysis - Data Index
// Central export point for all MBTI data structures

import { mbtiTypes } from "./mbtiTypes";
import { questionsByDimension, totalQuestions } from "./questions";

// Re-export all data structures
export { mbtiTypes } from "./mbtiTypes";
export { questions, questionsByDimension, totalQuestions } from "./questions";

// Data validation utilities
export const validateMBTICode = (code: string): boolean => {
  return Object.keys(mbtiTypes).includes(code);
};

export const getMBTIType = (code: string) => {
  return mbtiTypes[code] || null;
};

export const getAllMBTICodes = (): string[] => {
  return Object.keys(mbtiTypes);
};

// Question analysis utilities
export const getQuestionsByDimension = (
  dimension: "EI" | "SN" | "TF" | "JP"
) => {
  return questionsByDimension[dimension] || [];
};

export const getQuestionCount = () => totalQuestions;

// MBTI calculation constants
export const DIMENSION_WEIGHTS = {
  EI: { E: 1, I: -1 },
  SN: { S: 1, N: -1 },
  TF: { T: 1, F: -1 },
  JP: { J: 1, P: -1 },
};
