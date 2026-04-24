import React, { useEffect, useRef } from "react";
import { Card } from "playbook-ui";

type LiveExampleRailsProps = {
  html: string;
};

/**
 * Transform script content to handle DOMContentLoaded listeners.
 * Since the page has already loaded when we render these examples,
 * we need to execute callbacks after a short delay to allow components to initialize.
 */
function transformScriptForLiveExecution(scriptContent: string): string {
  // Check if script uses DOMContentLoaded
  const usesDOMContentLoaded = /DOMContentLoaded/.test(scriptContent);
  
  if (usesDOMContentLoaded) {
    // Replace DOMContentLoaded listener with setTimeout
    // This handles: window.addEventListener("DOMContentLoaded", () => { ... })
    // And: window.addEventListener('DOMContentLoaded', function() { ... })
    let transformed = scriptContent;
    
    // Replace the addEventListener pattern with setTimeout
    transformed = transformed.replace(
      /window\.addEventListener\s*\(\s*["']DOMContentLoaded["']\s*,\s*/g,
      "setTimeout("
    );
    
    // The closing `) ` of addEventListener becomes `, 50)` for setTimeout
    // We need to add the delay parameter before the final closing paren
    // Find pattern like `})` or `});` at the end and add delay
    transformed = transformed.replace(
      /\}\s*\)\s*;?\s*$/,
      "}, 50);"
    );
    
    return transformed;
  }
  
  return scriptContent;
}

const LiveExampleRails: React.FC<LiveExampleRailsProps> = ({ html }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    const container = containerRef.current;

    // Dispatch turbo:frame-load first to trigger Playbook component initialization
    window.dispatchEvent(new Event("turbo:frame-load"));

    // Wait for components to initialize, then execute scripts
    const scriptTimeout = setTimeout(() => {
      const scripts = container.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        // Transform script to handle DOMContentLoaded
        const originalContent = oldScript.textContent || "";
        newScript.textContent = transformScriptForLiveExecution(originalContent);
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }, 100);

    // Additional turbo:frame-load after scripts execute
    const turboTimeout = setTimeout(() => {
      window.dispatchEvent(new Event("turbo:frame-load"));
    }, 200);

    return () => {
      clearTimeout(scriptTimeout);
      clearTimeout(turboTimeout);
    };
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
