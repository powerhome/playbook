import React, { useEffect, useRef } from "react";
import { Card } from "playbook-ui";
import { useDarkMode } from "../../contexts/DarkModeContext";

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
    // This handles both window.addEventListener and document.addEventListener
    let transformed = scriptContent;
    
    // Replace the addEventListener pattern with setTimeout
    // Match both window.addEventListener and document.addEventListener
    transformed = transformed.replace(
      /(window|document)\.addEventListener\s*\(\s*["']DOMContentLoaded["']\s*,\s*/g,
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

function applyDarkModeToRenderedRoots(container: HTMLDivElement, darkMode: boolean) {
  const renderedRoots = Array.from(container.children) as HTMLElement[];

  renderedRoots.forEach((element) => {
    element.dataset.darkMode = String(darkMode);
    element.dataset.dark = String(darkMode);

    if (darkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  });
}

function resetExampleOverflow(element: HTMLElement) {
  element.style.overflowX = "auto";
  element.style.removeProperty("overflow-y");
}

function showExampleOverflow(event: React.SyntheticEvent<HTMLDivElement>) {
  event.currentTarget.style.overflowX = "visible";
  event.currentTarget.style.overflowY = "visible";
}

const LiveExampleRails: React.FC<LiveExampleRailsProps> = ({ html }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useDarkMode();

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;

    if (nextTarget && event.currentTarget.contains(nextTarget)) {
      return;
    }

    const wrapper = event.currentTarget;
    setTimeout(() => {
      const hasOpenPopup = wrapper.querySelector(
        ".pb_dropdown_container.open, .pb_multi_level_select .dropdown_menu.open, .pb_time_picker .pb_time_picker_container",
      );
      if (hasOpenPopup) return;
      resetExampleOverflow(wrapper);
    }, 0);
  };

  useEffect(() => {
    if (!containerRef.current || !html) return;

    const container = containerRef.current;
    applyDarkModeToRenderedRoots(container, darkMode);

    // Prevent anchor links with href="#" from causing scroll/navigation issues
    const preventHashNavigation = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href="#"]');
      if (anchor) {
        e.preventDefault();
      }
    };
    container.addEventListener('click', preventHashNavigation);

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
      container.removeEventListener('click', preventHashNavigation);
    };
  }, [html, darkMode]);

  if (!html) return null;

  return (
    <Card
      borderNone
      padding="md"
      dark={darkMode}
      htmlOptions={{
        style: {
          border: "none",
          boxSizing: "border-box",
          maxWidth: "100%",
          minWidth: 0,
        },
      }}
    >
      <div
        onBlurCapture={handleBlurCapture}
        onFocusCapture={showExampleOverflow}
        onPointerDownCapture={showExampleOverflow}
        style={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          overflowX: "auto",
        }}
      >
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Card>
  );
};

export default LiveExampleRails;
