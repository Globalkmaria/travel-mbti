// MBTI Travel Style Analysis - Animation Utilities
// Following shrimp-rules.md standards

import type { Variants, Transition } from "framer-motion";

/**
 * Predefined easing curves for consistent animations
 */
export const easings = {
  spring: { type: "spring", stiffness: 300, damping: 25 },
  smooth: [0.4, 0.0, 0.2, 1],
  bouncy: [0.68, -0.55, 0.265, 1.55],
  gentle: [0.25, 0.46, 0.45, 0.94],
} as const;

/**
 * Standard transition configurations
 */
export const transitions: Record<string, Transition> = {
  default: { duration: 0.3, ease: easings.smooth },
  slow: { duration: 0.5, ease: easings.smooth },
  fast: { duration: 0.15, ease: easings.smooth },
  spring: easings.spring,
  bouncy: { duration: 0.6, ease: easings.bouncy },
  gentle: { duration: 0.4, ease: easings.gentle },
};

/**
 * Page transition variants for route changes
 */
export const pageTransitions: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/**
 * Slide animation variants for content
 */
export const slideVariants: Variants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exitLeft: { opacity: 0, x: -100 },
  exitRight: { opacity: 0, x: 100 },
};

/**
 * Fade animation variants
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Scale animation variants for cards and buttons
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

/**
 * Staggered container variants for animating lists
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

/**
 * Individual item variants for staggered animations
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Question transition variants for test navigation
 */
export const questionTransitions: Variants = {
  initial: { opacity: 0, x: 100, scale: 0.9 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 0.9 },
};

/**
 * Button hover and tap animations
 */
export const buttonAnimations = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
  transition: transitions.spring,
};

/**
 * Card hover animations
 */
export const cardAnimations = {
  whileHover: { y: -4, scale: 1.02 },
  transition: transitions.spring,
};

/**
 * Progress bar animation configurations
 */
export const progressAnimations = {
  initial: { width: 0 },
  animate: (progress: number) => ({ width: `${progress}%` }),
  transition: { duration: 0.8, ease: easings.smooth },
};

/**
 * Loading spinner variants
 */
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/**
 * Floating animation for decorative elements
 */
export const floatingVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Typewriter effect for text animations
 */
export const typewriterVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

/**
 * Modal/overlay entrance animations
 */
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 50 },
};

/**
 * Success/completion animation sequence
 */
export const successVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [0, 360, 360],
    transition: {
      duration: 0.6,
      ease: easings.bouncy,
    },
  },
};

/**
 * Utility function to create custom stagger animations
 */
export const createStagger = (
  staggerDelay = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Utility function for creating custom slide animations
 */
export const createSlide = (
  direction: "left" | "right" | "up" | "down" = "right",
  distance = 50
): Variants => {
  const getInitial = () => {
    switch (direction) {
      case "left":
        return { x: -distance, opacity: 0 };
      case "right":
        return { x: distance, opacity: 0 };
      case "up":
        return { y: -distance, opacity: 0 };
      case "down":
        return { y: distance, opacity: 0 };
    }
  };

  return {
    hidden: getInitial(),
    visible: { x: 0, y: 0, opacity: 1 },
    exit: getInitial(),
  };
};

/**
 * Create bounce animation with custom intensity
 */
export const createBounce = (intensity = 0.2): Variants => ({
  animate: {
    y: [0, -intensity * 20, 0],
    transition: {
      duration: 0.6,
      ease: easings.bouncy,
    },
  },
});
