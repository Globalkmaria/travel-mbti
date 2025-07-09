import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HomePage } from "./pages/home-page";
import { TestPage } from "./pages/test-page";
import { ResultsPage } from "./pages/results-page";

// Page wrapper with animation support
function AnimatedRoutes() {
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
}

// Main App component with global animation preferences
function App() {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Apply global CSS variables for animation timing
  React.useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.1s"
      );
      document.documentElement.style.setProperty("--animation-delay", "0s");
    } else {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.3s"
      );
      document.documentElement.style.setProperty("--animation-delay", "0.1s");
    }
  }, [prefersReducedMotion]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
