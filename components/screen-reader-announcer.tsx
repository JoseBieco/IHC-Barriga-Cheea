"use client";

import { useEffect } from "react";

export function ScreenReaderAnnouncer() {
  useEffect(() => {
    // Create the live region for screen reader announcements
    const liveRegion = document.createElement("div");
    liveRegion.id = "screen-reader-announcements";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    document.body.appendChild(liveRegion);

    // Create a more urgent live region for important announcements
    const assertiveRegion = document.createElement("div");
    assertiveRegion.id = "screen-reader-announcements-assertive";
    assertiveRegion.setAttribute("aria-live", "assertive");
    assertiveRegion.setAttribute("aria-atomic", "true");
    assertiveRegion.className = "sr-only";
    document.body.appendChild(assertiveRegion);

    return () => {
      // Cleanup on unmount
      const politeRegion = document.getElementById(
        "screen-reader-announcements"
      );
      const urgentRegion = document.getElementById(
        "screen-reader-announcements-assertive"
      );
      if (politeRegion) document.body.removeChild(politeRegion);
      if (urgentRegion) document.body.removeChild(urgentRegion);
    };
  }, []);

  return null;
}
