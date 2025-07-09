// MBTI Travel Style Analysis - TypeScript Type Definitions
// Following shrimp-rules.md standards: camelCase properties, no 'any' types, all exports

// ===== Core MBTI Types =====

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  dimension: "EI" | "SN" | "TF" | "JP";
}

export interface Answer {
  id: string;
  text: string;
  value: number; // Score value for the answer (-2 to +2 typically)
  dimension: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
}

export interface UserAnswer {
  questionId: string;
  answerId: string;
  value: number;
  dimension: string;
}

// ===== MBTI Personality Types =====

export interface MBTIType {
  code: string; // e.g., "ENFP", "ISTJ"
  name: string; // e.g., "The Campaigner", "The Logistician"
  description: string;
  characteristics: string[];
  travelStyle: TravelStyle;
  imageUrl?: string; // Character image for visual representation
}

export interface TravelStyle {
  preferences: string[]; // Travel preferences and motivations
  destinations: string[]; // Recommended destination types
  activities: string[]; // Preferred travel activities
  planningStyle: string; // How they approach trip planning
  budgetApproach: string; // Budget management style
  accommodationStyle: string; // Preferred accommodation types
  travelCompanions: string[]; // Preferred travel companion types
}

// ===== Test State Management =====

export interface TestState {
  currentQuestionIndex: number;
  answers: UserAnswer[];
  isCompleted: boolean;
  result?: MBTIType;
  startTime?: Date;
  completionTime?: Date;
}

export interface TestProgress {
  currentQuestion: number;
  totalQuestions: number;
  progressPercentage: number;
  answeredQuestions: number;
}

// ===== Scoring and Calculation =====

export interface DimensionScore {
  dimension: "EI" | "SN" | "TF" | "JP";
  score: number; // Positive = second letter, Negative = first letter
  preference: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  strength: "slight" | "moderate" | "clear" | "very clear";
}

export interface MBTIResult {
  personalityType: MBTIType;
  dimensionScores: DimensionScore[];
  confidence: number; // 0-1 confidence score
  calculatedAt: Date;
}

// ===== UI Component Props Types =====

export interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answerId: string) => void;
  isLocked?: boolean;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  animated?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  "aria-label"?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
  padding?: "sm" | "md" | "lg";
}

// ===== Social Sharing Types =====

export interface ShareData {
  title: string;
  text: string;
  url: string;
  personalityType: string;
  travelStyle: string;
}

export interface ShareOptions {
  platform?: "web" | "url" | "clipboard";
  includeImage?: boolean;
  customMessage?: string;
}

export interface ShareResult {
  success: boolean;
  platform: string;
  error?: string;
}

// ===== Animation and Motion Types =====

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

export interface PageTransition {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit: Record<string, unknown>;
  transition: AnimationConfig;
}

// ===== API and Data Types =====

export interface QuestionSet {
  questions: Question[];
  metadata: {
    version: string;
    totalQuestions: number;
    estimatedTime: number; // in minutes
    createdAt: Date;
  };
}

export interface PersonalityDatabase {
  types: MBTIType[];
  version: string;
  lastUpdated: Date;
}

// ===== Error Handling Types =====

export interface AppError {
  code: string;
  message: string;
  details?: string;
  timestamp: Date;
}

export interface ValidationError extends AppError {
  field: string;
  value: unknown;
}

// ===== Utility Types =====

export type MBTICode =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

export type DimensionType = "EI" | "SN" | "TF" | "JP";
export type PreferenceType = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

// Navigation and Routing Types
export interface RouteParams {
  personalityType?: string;
  shareId?: string;
}

export interface NavigationState {
  currentPage: "home" | "test" | "results";
  canGoBack: boolean;
  canGoForward: boolean;
}

// ===== Constants Types =====

export interface AppConstants {
  maxQuestions: number;
  minQuestions: number;
  scoreRange: {
    min: number;
    max: number;
  };
  confidenceThreshold: number;
  timeouts: {
    autoSave: number;
    sessionExpiry: number;
  };
}
