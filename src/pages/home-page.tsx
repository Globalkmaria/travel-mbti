import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "../components/ui";

/**
 * HomePage Component
 * Landing page with project introduction and call-to-action
 * Features responsive hero section and smooth animations
 */
export const HomePage: React.FC = () => {
  // Animation variants for staggered reveals
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

  const features = [
    {
      icon: "🧠",
      title: "Personality Analysis",
      description:
        "Discover your MBTI type through our scientifically-designed questionnaire.",
    },
    {
      icon: "✈️",
      title: "Travel Recommendations",
      description:
        "Get personalized travel suggestions based on your unique personality traits.",
    },
    {
      icon: "🎯",
      title: "Detailed Insights",
      description:
        "Understand your travel motivations, preferences, and ideal destinations.",
    },
    {
      icon: "📱",
      title: "Share Results",
      description:
        "Share your travel personality with friends and plan trips together.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-16 md:py-24 max-w-6xl mx-auto text-center"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Travel Personality
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take our MBTI-based personality test and unlock personalized travel
            recommendations that match your unique style and preferences.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <Link to="/test">
            <Button
              size="lg"
              className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🎯 Start Your Journey
            </Button>
          </Link>
          <p className="text-gray-500 mt-4 text-sm">
            Takes 5-10 minutes • 18 questions • Free & private
          </p>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto max-w-md md:max-w-lg"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-full p-12 md:p-16">
            <div className="text-8xl md:text-9xl">🧳</div>
          </div>
          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -right-4 text-4xl"
          >
            ✈️
          </motion.div>
          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-2 -left-4 text-3xl"
          >
            🗺️
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] as const }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-4 py-16 bg-white/50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Take the Test?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our MBTI-based analysis provides deep insights into your travel
              personality, helping you make better vacation decisions and
              discover new experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.4, 0.0, 0.2, 1] as const,
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About MBTI Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] as const }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-4 py-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              About MBTI Travel Analysis
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                The Myers-Briggs Type Indicator (MBTI) is a well-established
                personality framework that categorizes people into 16 distinct
                personality types based on four key dimensions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-primary">E/I</span> Energy Source
                  </h3>
                  <p className="text-sm">
                    How you gain energy: through social interaction
                    (Extraversion) or solitude and reflection (Introversion).
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-primary">S/N</span> Information
                    Processing
                  </h3>
                  <p className="text-sm">
                    How you gather information: through concrete details
                    (Sensing) or patterns and possibilities (iNtuition).
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-primary">T/F</span> Decision Making
                  </h3>
                  <p className="text-sm">
                    How you make decisions: through logical analysis (Thinking)
                    or personal values (Feeling).
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-primary">J/P</span> Lifestyle
                    Structure
                  </h3>
                  <p className="text-sm">
                    How you approach life: with structure and planning (Judging)
                    or flexibility and spontaneity (Perceiving).
                  </p>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] as const }}
        viewport={{ once: true, margin: "-100px" }}
        className="px-4 py-16 bg-gradient-to-r from-primary/5 to-accent/5"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Discover Your Travel Style?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have unlocked their
              personality-based travel recommendations.
            </p>
            <Link to="/test">
              <Button
                size="lg"
                className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 Begin Your Analysis
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Page Metadata for Social Sharing */}
      <div className="sr-only">
        <h1>
          MBTI Travel Style Analysis - Discover Your Personality-Based Travel
          Recommendations
        </h1>
        <meta
          name="description"
          content="Take our MBTI-based personality test and get personalized travel recommendations that match your unique style and preferences."
        />
        <meta property="og:title" content="MBTI Travel Style Analysis" />
        <meta
          property="og:description"
          content="Discover your travel personality through our scientifically-designed MBTI questionnaire."
        />
        <meta property="og:type" content="website" />
      </div>
    </motion.div>
  );
};

export default HomePage;
