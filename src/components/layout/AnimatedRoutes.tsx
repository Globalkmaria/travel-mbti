// MBTI Travel Style Analysis - Animated Routes Component
// Following shrimp-rules.md standards

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HomePage } from "../../pages/home-page";
import { TestPage } from "../../pages/test-page";
import { ResultsPage } from "../../pages/results-page";

/**
 * AnimatedRoutes Component
 * Provides smooth page transitions using Framer Motion AnimatePresence
 */
export const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
