import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "../components/ui";
import { useLanguage } from "../hooks/useLanguage";

/**
 * HomePage Component
 * Landing page with project introduction and call-to-action
 * Features responsive hero section and smooth animations
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Clear all test data and start fresh test
  const handleStartTest = () => {
    // Clear localStorage test state
    try {
      localStorage.removeItem("mbti-test-state");
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }

    // Clear sessionStorage result
    try {
      sessionStorage.removeItem("mbti-result");
    } catch (error) {
      console.warn("Failed to clear sessionStorage:", error);
    }

    navigate("/test");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t("home.hero.title")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              {" "}
              {t("home.hero.titleHighlight")}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            {t("home.hero.subtitle")}
          </p>

          <motion.div className="mb-8" variants={itemVariants}>
            <Button
              size="lg"
              onClick={handleStartTest}
              className="text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300"
            >
              {t("home.hero.cta")}
            </Button>
          </motion.div>

          <p className="text-gray-500 text-sm">{t("home.hero.subtext")}</p>
        </motion.div>

        {/* Features Section */}
        <motion.div className="mt-24 max-w-6xl mx-auto" variants={itemVariants}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: t("home.features.items.0.title"),
                description: t("home.features.items.0.description"),
              },
              {
                icon: "✈️",
                title: t("home.features.items.1.title"),
                description: t("home.features.items.1.description"),
              },
              {
                icon: "🎯",
                title: t("home.features.items.2.title"),
                description: t("home.features.items.2.description"),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="space-y-4">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
