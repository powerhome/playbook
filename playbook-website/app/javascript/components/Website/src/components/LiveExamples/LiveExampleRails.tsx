import React, { useEffect, useRef } from "react";
import { Card } from "playbook-ui";

type LiveExampleRailsProps = {
  html: string;
};

const LiveExampleRails: React.FC<LiveExampleRailsProps> = ({ html }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    const container = containerRef.current;

    // Execute any inline scripts in the rendered HTML
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // Dispatch turbo:frame-load to trigger Playbook components that listen for it
    // (e.g., Dialog's setupDialog is called on turbo:frame-load)
    window.dispatchEvent(new Event("turbo:frame-load"));

    // Small delay to ensure MutationObserver has processed the new DOM
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event("turbo:frame-load"));
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [html]);

  if (!html) return null;

  return (
    <Card borderNone padding="md">
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Card>
  );
};

export default LiveExampleRails;
