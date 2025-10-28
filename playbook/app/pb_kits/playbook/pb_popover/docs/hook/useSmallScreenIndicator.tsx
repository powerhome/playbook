// Temporary code to replicate bug - DO NOT MERGE
import { useEffect, useState } from "react";

const useSmallScreenIndicator = (): boolean => {
  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    const update = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--is-pwa")
        .trim();
      setIsPwa(value === "1");
    };

    update();

    // Observes changes using ResizeObserver
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, []);

  return isPwa;
};

export default useSmallScreenIndicator;