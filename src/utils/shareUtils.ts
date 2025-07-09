// MBTI Travel Style Analysis - Sharing Utility Functions
// Following shrimp-rules.md standards

import type { MBTIType, ShareData, ShareResult } from "../types";

/**
 * Checks if the Web Share API is supported in the current browser
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== "undefined" && "share" in navigator;
}

/**
 * Generates engaging share text based on MBTI type
 */
export function generateShareText(mbtiType: MBTIType): string {
  const { code, name } = mbtiType;
  return `🧳 I'm a ${code} (${name}) traveler! Discover your MBTI travel style and find out what kind of adventurer you are! ✈️`;
}

/**
 * Creates a shareable URL with result parameters
 */
export function createShareableURL(typeCode: string): string {
  const baseUrl = window.location.origin;
  const path = "/results";
  return `${baseUrl}${path}?type=${encodeURIComponent(typeCode)}`;
}

/**
 * Copies text to clipboard with fallback methods
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern browsers - Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Creates comprehensive share data object
 */
export function createShareData(mbtiType: MBTIType): ShareData {
  const shareText = generateShareText(mbtiType);
  const shareUrl = createShareableURL(mbtiType.code);

  return {
    title: `MBTI Travel Style: ${mbtiType.code} - ${mbtiType.name}`,
    text: shareText,
    url: shareUrl,
    personalityType: mbtiType.code,
    travelStyle: mbtiType.travelStyle.planningStyle,
  };
}

/**
 * Shares content using Web Share API
 */
export async function shareViaWebAPI(
  shareData: ShareData
): Promise<ShareResult> {
  try {
    if (!isWebShareSupported()) {
      throw new Error("Web Share API not supported");
    }

    await navigator.share({
      title: shareData.title,
      text: shareData.text,
      url: shareData.url,
    });

    return {
      success: true,
      platform: "web",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // User cancelled is not really an error
    if (
      errorMessage.includes("cancelled") ||
      errorMessage.includes("canceled")
    ) {
      return {
        success: false,
        platform: "web",
        error: "User cancelled sharing",
      };
    }

    return {
      success: false,
      platform: "web",
      error: errorMessage,
    };
  }
}

/**
 * Shares content by copying URL to clipboard
 */
export async function shareViaClipboard(
  shareData: ShareData
): Promise<ShareResult> {
  try {
    const fullShareText = `${shareData.text}\n\n${shareData.url}`;
    const success = await copyToClipboard(fullShareText);

    return {
      success,
      platform: "clipboard",
      error: success ? undefined : "Failed to copy to clipboard",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      platform: "clipboard",
      error: errorMessage,
    };
  }
}

/**
 * Detects user platform for optimal sharing experience
 */
export function detectPlatform(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isMobile =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  return isMobile ? "mobile" : "desktop";
}

/**
 * Gets the optimal sharing method based on platform and browser support
 */
export function getOptimalSharingMethod(): "web" | "clipboard" {
  if (isWebShareSupported() && detectPlatform() === "mobile") {
    return "web";
  }
  return "clipboard";
}

/**
 * Validates share data before sharing
 */
export function validateShareData(shareData: ShareData): boolean {
  return !!(
    shareData.title &&
    shareData.text &&
    shareData.url &&
    shareData.personalityType
  );
}
