import React from "react";
import { motion } from "framer-motion";
import type { TravelStyle, MBTICode } from "../../types";
import { Card, CardHeader, CardContent } from "../ui";
import { useLanguage } from "../../hooks/useLanguage";

export interface TravelRecommendationsProps {
  travelStyle: TravelStyle;
  mbtiCode: MBTICode;
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
  mbtiCode,
  className = "",
  showAllSections = true,
  animateOnScroll = true,
}) => {
  const { t } = useLanguage();

  // Get translated travel style data with fallback to original data
  const getTranslatedArray = (key: string, fallbackArray: string[]) => {
    return fallbackArray.map((item, index) =>
      t(`travelStyles.${mbtiCode}.${key}.${index}`, item)
    );
  };

  const getTranslatedString = (key: string, fallbackString: string) => {
    return t(`travelStyles.${mbtiCode}.${key}`, fallbackString);
  };

  const sections = [
    {
      titleKey: "travelRecommendations.destinations.title",
      title: "🌍 Preferred Destinations",
      items: getTranslatedArray("destinations", travelStyle.destinations),
      icon: "🗺️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      titleKey: "travelRecommendations.activities.title",
      title: "🎯 Favorite Activities",
      items: getTranslatedArray("activities", travelStyle.activities),
      icon: "🎪",
      color: "from-green-500 to-emerald-500",
    },
    {
      titleKey: "travelRecommendations.planning.title",
      title: "📋 Planning Style",
      items: [getTranslatedString("planningStyle", travelStyle.planningStyle)],
      icon: "📅",
      color: "from-purple-500 to-violet-500",
    },
    {
      titleKey: "travelRecommendations.budget.title",
      title: "💰 Budget Approach",
      items: [
        getTranslatedString("budgetApproach", travelStyle.budgetApproach),
      ],
      icon: "💳",
      color: "from-yellow-500 to-orange-500",
    },
    {
      titleKey: "travelRecommendations.accommodation.title",
      title: "🏨 Accommodation Preference",
      items: [
        getTranslatedString(
          "accommodationStyle",
          travelStyle.accommodationStyle
        ),
      ],
      icon: "🛏️",
      color: "from-pink-500 to-rose-500",
    },
    {
      titleKey: "travelRecommendations.companions.title",
      title: "👥 Travel Companions",
      items: getTranslatedArray(
        "travelCompanions",
        travelStyle.travelCompanions
      ),
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
          {t("travelRecommendations.header.title", "✈️ Your Travel Style")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t(
            "travelRecommendations.header.description",
            "Based on your personality type, here are personalized travel recommendations that align with your preferences and style."
          )}
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
              {t(
                "travelRecommendations.motivations.title",
                "🎒 Travel Motivations"
              )}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getTranslatedArray("motivations", travelStyle.preferences).map(
                (preference, index) => (
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
                )
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Recommendations Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {sections.map((section, index) => {
          if (!showAllSections && index > 2) return null;

          return (
            <motion.div key={section.titleKey} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${section.color} text-white`}
                    >
                      <span className="text-lg">{section.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-base">
                      {t(section.titleKey, section.title)}
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
          initial={animateOnScroll ? { opacity: 0, y: 20 } : {}}
          animate={animateOnScroll ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.8,
            ease: [0.4, 0.0, 0.2, 1] as const,
          }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            {t(
              "travelRecommendations.showMore",
              "See all travel recommendations in your full results"
            )}
          </p>
        </motion.div>
      )}

      {/* Accessibility Information */}
      <div className="sr-only" aria-live="polite">
        {t(
          "travelRecommendations.accessibility.description",
          "Travel recommendations section displaying personalized preferences based on your personality type."
        )}
        {sections
          .map(
            (section) =>
              `${t(section.titleKey, section.title)}: ${section.items.join(
                ", "
              )}.`
          )
          .join(" ")}
      </div>
    </div>
  );
};

export default TravelRecommendations;
