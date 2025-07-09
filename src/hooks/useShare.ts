// MBTI Travel Style Analysis - Social Sharing Hook
// Following shrimp-rules.md standards

import { useState, useCallback, useMemo } from "react";
import type { MBTIType, ShareData, ShareResult, ShareOptions } from "../types";
import {
  createShareData,
  shareViaWebAPI,
  shareViaClipboard as shareViaClipboardUtil,
  isWebShareSupported,
  getOptimalSharingMethod,
  validateShareData,
} from "../utils/shareUtils";

interface UseShareReturn {
  // Core sharing functions
  share: (mbtiType: MBTIType, options?: ShareOptions) => Promise<ShareResult>;
  shareViaWeb: (mbtiType: MBTIType) => Promise<ShareResult>;
  shareViaClipboard: (mbtiType: MBTIType) => Promise<ShareResult>;

  // Share state
  isSharing: boolean;
  lastShareResult: ShareResult | null;
  shareData: ShareData | null;

  // Utility functions
  canUseWebShare: boolean;
  optimalMethod: "web" | "clipboard";
  generateSharePreview: (mbtiType: MBTIType) => ShareData;

  // Error handling
  clearLastResult: () => void;
  isShareSupported: boolean;
}

/**
 * Custom hook for handling social sharing functionality
 * Provides Web Share API with clipboard fallback and comprehensive error handling
 */
export function useShare(): UseShareReturn {
  const [isSharing, setIsSharing] = useState(false);
  const [lastShareResult, setLastShareResult] = useState<ShareResult | null>(
    null
  );
  const [shareData, setShareData] = useState<ShareData | null>(null);

  // Check Web Share API support
  const canUseWebShare = useMemo(() => isWebShareSupported(), []);

  // Get optimal sharing method
  const optimalMethod = useMemo(() => getOptimalSharingMethod(), []);

  // Check if any sharing method is supported
  const isShareSupported = useMemo(() => {
    return canUseWebShare || typeof navigator !== "undefined";
  }, [canUseWebShare]);

  /**
   * Generates share preview data without actually sharing
   */
  const generateSharePreview = useCallback((mbtiType: MBTIType): ShareData => {
    return createShareData(mbtiType);
  }, []);

  /**
   * Main sharing function with automatic method selection
   */
  const share = useCallback(
    async (
      mbtiType: MBTIType,
      options: ShareOptions = {}
    ): Promise<ShareResult> => {
      if (!mbtiType) {
        const errorResult: ShareResult = {
          success: false,
          platform: "unknown",
          error: "No MBTI type provided",
        };
        setLastShareResult(errorResult);
        return errorResult;
      }

      setIsSharing(true);
      setLastShareResult(null);

      try {
        const data = createShareData(mbtiType);
        setShareData(data);

        // Validate share data
        if (!validateShareData(data)) {
          throw new Error("Invalid share data generated");
        }

        let result: ShareResult;

        // Choose sharing method based on options or optimal method
        const preferredMethod = options.platform || optimalMethod;

        if (preferredMethod === "web" && canUseWebShare) {
          result = await shareViaWebAPI(data);

          // Fallback to clipboard if web share fails
          if (!result.success && !result.error?.includes("cancelled")) {
            console.warn(
              "Web Share failed, falling back to clipboard:",
              result.error
            );
            result = await shareViaClipboardUtil(data);
          }
        } else {
          result = await shareViaClipboardUtil(data);
        }

        setLastShareResult(result);
        return result;
      } catch (error) {
        const errorResult: ShareResult = {
          success: false,
          platform: "unknown",
          error:
            error instanceof Error ? error.message : "Unknown sharing error",
        };

        setLastShareResult(errorResult);
        return errorResult;
      } finally {
        setIsSharing(false);
      }
    },
    [optimalMethod, canUseWebShare]
  );

  /**
   * Force sharing via Web Share API
   */
  const shareViaWeb = useCallback(
    async (mbtiType: MBTIType): Promise<ShareResult> => {
      if (!canUseWebShare) {
        const errorResult: ShareResult = {
          success: false,
          platform: "web",
          error: "Web Share API not supported",
        };
        setLastShareResult(errorResult);
        return errorResult;
      }

      setIsSharing(true);

      try {
        const data = createShareData(mbtiType);
        const result = await shareViaWebAPI(data);
        setLastShareResult(result);
        setShareData(data);
        return result;
      } catch (error) {
        const errorResult: ShareResult = {
          success: false,
          platform: "web",
          error: error instanceof Error ? error.message : "Web share failed",
        };
        setLastShareResult(errorResult);
        return errorResult;
      } finally {
        setIsSharing(false);
      }
    },
    [canUseWebShare]
  );

  /**
   * Force sharing via clipboard
   */
  const shareViaClipboard = useCallback(
    async (mbtiType: MBTIType): Promise<ShareResult> => {
      setIsSharing(true);

      try {
        const data = createShareData(mbtiType);
        const result = await shareViaClipboardUtil(data);
        setLastShareResult(result);
        setShareData(data);
        return result;
      } catch (error) {
        const errorResult: ShareResult = {
          success: false,
          platform: "clipboard",
          error:
            error instanceof Error ? error.message : "Clipboard share failed",
        };
        setLastShareResult(errorResult);
        return errorResult;
      } finally {
        setIsSharing(false);
      }
    },
    []
  );

  /**
   * Clears the last share result
   */
  const clearLastResult = useCallback(() => {
    setLastShareResult(null);
  }, []);

  return {
    // Core sharing functions
    share,
    shareViaWeb,
    shareViaClipboard: shareViaClipboard,

    // Share state
    isSharing,
    lastShareResult,
    shareData,

    // Utility functions
    canUseWebShare,
    optimalMethod,
    generateSharePreview,

    // Error handling
    clearLastResult,
    isShareSupported,
  };
}

export default useShare;
