// MBTI Travel Style Analysis - Share Section Component
// Following shrimp-rules.md standards

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MBTIType } from "../../types";
import { useShare } from "../../hooks/useShare";
import { useLanguage } from "../../hooks/useLanguage";
import { Button } from "../ui/Button";

interface ShareSectionProps {
  mbtiType: MBTIType;
  className?: string;
}

export function ShareSection({ mbtiType, className = "" }: ShareSectionProps) {
  const { t } = useLanguage();
  const {
    share,
    isSharing,
    lastShareResult,
    canUseWebShare,
    generateSharePreview,
    clearLastResult,
    isShareSupported,
  } = useShare();

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Handle share result feedback
  useEffect(() => {
    if (lastShareResult) {
      if (lastShareResult.success) {
        if (lastShareResult.platform === "clipboard") {
          setFeedbackMessage(
            t("share.feedback.linkCopied", "✅ Link copied to clipboard!")
          );
        } else if (lastShareResult.platform === "web") {
          setFeedbackMessage(
            t("share.feedback.shareSuccess", "✅ Shared successfully!")
          );
        }
      } else {
        if (lastShareResult.error?.includes("cancelled")) {
          // Don't show error for user cancellation
          return;
        }
        setFeedbackMessage(
          t(
            "share.feedback.shareFailed",
            "❌ Sharing failed. Please try again."
          )
        );
      }

      setShowFeedback(true);

      // Auto-hide feedback after 3 seconds
      const timer = setTimeout(() => {
        setShowFeedback(false);
        clearLastResult();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [lastShareResult, clearLastResult, t]);

  // Main share handler with smart method selection
  const handleShare = async () => {
    await share(mbtiType);
  };

  // Generate share preview for display
  const sharePreview = generateSharePreview(mbtiType);

  if (!isShareSupported) {
    return null; // Hide section if sharing is not supported
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* Section Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t("share.title", "Share Your Travel Style")}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {t(
            "share.subtitle",
            "Let your friends discover their MBTI travel personality too!"
          )}
        </p>
      </div>

      {/* Share Preview */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-600">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🧳</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
              {sharePreview.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              {sharePreview.text}
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-xs font-mono break-all">
              {sharePreview.url}
            </p>
          </div>
        </div>
      </div>

      {/* Single Smart Share Button */}
      <Button
        onClick={handleShare}
        disabled={isSharing}
        loading={isSharing}
        className="w-full text-gray-900 dark:text-white"
        size="lg"
        aria-label={`Share your ${mbtiType.code} travel style`}
      >
        {isSharing ? (
          t("share.buttons.sharing", "Sharing...")
        ) : (
          <>
            <span className="mr-2">{canUseWebShare ? "📱" : "📋"}</span>
            {canUseWebShare
              ? t("share.buttons.shareResults", "Share Results")
              : t("share.buttons.copyLink", "Copy Link")}
          </>
        )}
      </Button>

      {/* Feedback Message */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-center"
          >
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              {feedbackMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {t(
            "share.privacy",
            "Your shared link includes your personality type results but no personal data"
          )}
        </p>
      </div>
    </motion.div>
  );
}

export default ShareSection;
