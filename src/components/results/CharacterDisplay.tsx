import React, { useState } from "react";
import { motion } from "framer-motion";
import type { MBTIType } from "../../types";

export interface CharacterDisplayProps {
  mbtiType: MBTIType;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
  showTypeCode?: boolean;
  animate?: boolean;
}

/**
 * CharacterDisplay Component
 * Displays character images with responsive sizing, lazy loading, and fallback handling
 * Includes accessibility features and loading states
 */
export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  mbtiType,
  size = "md",
  className = "",
  priority = false,
  showTypeCode = false,
  animate = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Size configurations
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  const placeholderSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };

  // Generate placeholder based on MBTI type
  const getPlaceholderIcon = (code: string) => {
    const iconMap: Record<string, string> = {
      ENFP: "🌟",
      ENFJ: "🌺",
      ENTP: "💡",
      ENTJ: "👑",
      ESFP: "🎭",
      ESFJ: "🤗",
      ESTP: "⚡",
      ESTJ: "🏆",
      INFP: "🌸",
      INFJ: "🔮",
      INTP: "🧩",
      INTJ: "🎯",
      ISFP: "🎨",
      ISFJ: "🛡️",
      ISTP: "🔧",
      ISTJ: "📋",
    };
    return iconMap[code] || "👤";
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const imageMotionProps = animate
    ? {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] as const },
      }
    : {};

  const placeholderMotionProps = animate
    ? {
        initial: { opacity: 0, rotate: -10 },
        animate: { opacity: 1, rotate: 0 },
        transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as const },
      }
    : {};

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
        ${sizeClasses[size]} 
        relative rounded-full overflow-hidden 
        bg-gradient-to-br from-primary/10 to-primary/20
        border-4 border-white shadow-lg
        flex items-center justify-center
      `}
      >
        {/* Character Image */}
        {!imageError && (
          <motion.img
            {...imageMotionProps}
            src={
              mbtiType.imageUrl ||
              `/images/characters/${mbtiType.code.toLowerCase()}.png`
            }
            alt={`${mbtiType.name} character illustration`}
            loading={priority ? "eager" : "lazy"}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`
              w-full h-full object-cover transition-opacity duration-300
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
            decoding="async"
          />
        )}

        {/* Placeholder/Fallback */}
        {(!imageLoaded || imageError) && (
          <motion.div
            {...placeholderMotionProps}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/30"
            role="img"
            aria-label={`${mbtiType.name} character placeholder`}
          >
            <span className={`${placeholderSizes[size]} mb-1`}>
              {getPlaceholderIcon(mbtiType.code)}
            </span>
            {size !== "sm" && (
              <span className="text-xs font-medium text-primary/80 text-center px-2">
                {mbtiType.code}
              </span>
            )}
          </motion.div>
        )}

        {/* Loading Indicator */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
              aria-label="Loading character image"
            />
          </div>
        )}

        {/* Type Code Overlay */}
        {showTypeCode && imageLoaded && !imageError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-1"
          >
            <span className="text-xs font-bold tracking-wide">
              {mbtiType.code}
            </span>
          </motion.div>
        )}
      </div>

      {/* Character Name Label */}
      {size !== "sm" && (
        <motion.div
          initial={animate ? { opacity: 0, y: 10 } : {}}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={animate ? { delay: 0.4, duration: 0.3 } : {}}
          className="text-center mt-3"
        >
          <h3 className="font-semibold text-gray-800 text-sm">
            {mbtiType.name}
          </h3>
          <p className="text-xs text-gray-600 mt-1 max-w-[200px] mx-auto leading-tight">
            {mbtiType.description.slice(0, 60)}...
          </p>
        </motion.div>
      )}

      {/* Accessibility Enhancement */}
      <div className="sr-only">
        Character representation for {mbtiType.code} personality type:{" "}
        {mbtiType.name}.
        {imageError
          ? "Image failed to load, showing fallback icon."
          : imageLoaded
          ? "Character image loaded successfully."
          : "Loading character image."}
      </div>
    </div>
  );
};

export default CharacterDisplay;
