import React from "react";
import { motion } from "framer-motion";
import type { TravelStyle } from "../../types";
import { Card, CardHeader, CardContent } from "../ui";

export interface TravelRecommendationsProps {
  travelStyle: TravelStyle;
  className?: string;
  showAllSections?: boolean;
  animateOnScroll?: boolean;
}

/**
 * TravelRecommendations Component
 * Displays comprehensive travel style recommendations including destinations,
 * activities, planning style, and travel preferences
 */
export const TravelRecommendations: React.FC<TravelRecommendationsProps> = ({
  travelStyle,
  className = "",
  showAllSections = true,
  animateOnScroll = true,
}) => {
  const sections = [
    {
      title: "🌍 Preferred Destinations",
      items: travelStyle.destinations,
      icon: "🗺️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "🎯 Favorite Activities",
      items: travelStyle.activities,
      icon: "🎪",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "📋 Planning Style",
      items: [travelStyle.planningStyle],
      icon: "📅",
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "💰 Budget Approach",
      items: [travelStyle.budgetApproach],
      icon: "💳",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "🏨 Accommodation Preference",
      items: [travelStyle.accommodationStyle],
      icon: "🛏️",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "👥 Travel Companions",
      items: travelStyle.travelCompanions,
      icon: "🤝",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1] as const,
      },
    },
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header */}
      <motion.div
        initial={animateOnScroll ? { opacity: 0, y: -20 } : {}}
        animate={animateOnScroll ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] as const }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          ✈️ Your Travel Style
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your personality type, here are personalized travel
          recommendations that align with your preferences and style.
        </p>
      </motion.div>

      {/* Travel Preferences Overview */}
      <motion.div
        initial={animateOnScroll ? { opacity: 0, scale: 0.95 } : {}}
        animate={animateOnScroll ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.4, 0.0, 0.2, 1] as const,
        }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              🎒 Travel Motivations
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {travelStyle.preferences.map((preference, index) => (
                <motion.div
                  key={index}
                  initial={animateOnScroll ? { opacity: 0, x: -20 } : {}}
                  animate={animateOnScroll ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.1,
                    ease: [0.4, 0.0, 0.2, 1] as const,
                  }}
                  className="flex items-start gap-2 p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors"
                >
                  <span className="text-lg">🌟</span>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {preference}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Recommendations Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sections.map((section, index) => {
          if (!showAllSections && index > 2) return null;

          return (
            <motion.div key={section.title} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${section.color} text-white`}
                    >
                      <span className="text-lg">{section.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-base">
                      {section.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={animateOnScroll ? { opacity: 0, y: 10 } : {}}
                        animate={animateOnScroll ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + itemIndex * 0.1,
                          ease: [0.4, 0.0, 0.2, 1] as const,
                        }}
                        className="p-3 bg-gray-50 rounded-lg border-l-4 border-primary/30 hover:border-primary/60 transition-colors"
                      >
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Show All/Show Less Toggle */}
      {!showAllSections && (
        <motion.div
          initial={animateOnScroll ? { opacity: 0 } : {}}
          animate={animateOnScroll ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            And {sections.length - 3} more recommendation categories...
          </p>
        </motion.div>
      )}

      {/* Accessibility Summary */}
      <div className="sr-only">
        Complete travel style recommendations for your personality type.
        Includes {sections.length} categories of personalized suggestions
        covering destinations, activities, planning approaches, and travel
        preferences.
      </div>
    </div>
  );
};

export default TravelRecommendations;
