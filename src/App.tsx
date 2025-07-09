import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LanguageSwitcher } from "./components/common/LanguageSwitcher";
import { HomePage } from "./pages/home-page";
import { TestPage } from "./pages/test-page";
import { ResultsPage } from "./pages/results-page";
import "./index.css";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <LanguageSwitcher />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
