import { useState, useEffect, useRef } from "react";

export function useCTAPopover() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const closePopover = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Initial popover after 20 seconds
    timeoutRef.current = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 20000);

    // Set up interval for subsequent popovers (every 40 seconds)
    intervalRef.current = setInterval(() => {
      if (hasShown) {
        setIsVisible(true);
      }
    }, 40000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hasShown]);

  // Reset interval when popover is closed
  useEffect(() => {
    if (!isVisible && hasShown) {
      // Reset the interval when popover is closed
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setIsVisible(true);
      }, 40000);
    }
  }, [isVisible, hasShown]);

  return {
    isVisible,
    closePopover,
  };
}
