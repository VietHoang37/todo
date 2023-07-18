import { useState, useEffect } from "react";
import {
  DESKTOP_BREAKPOINT,
  TABLET_BREAKPOINT,
  SMALL_MOBILE_BREAKPOINT,
} from "../utils/variables";
import { toPx } from "../utils/toPx";

export const MediaQuery = {
  isDesktop: `(min-width: ${toPx(DESKTOP_BREAKPOINT)})`,
  isSmallMobile: `(max-width: ${toPx(SMALL_MOBILE_BREAKPOINT - 1)})`,
  isMobile: `(max-width: ${toPx(TABLET_BREAKPOINT - 1)})`,
  isTablet: `(min-width: ${toPx(TABLET_BREAKPOINT)}) and (max-width: ${toPx(
    DESKTOP_BREAKPOINT - 1
  )})`,
};

export const useDeviceType = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      window?.addEventListener("resize", () => setMatches(media.matches));
      return () => {
        window?.removeEventListener("resize", () => setMatches(media.matches));
      };
    }
  }, [matches, query]);

  return matches;
};
