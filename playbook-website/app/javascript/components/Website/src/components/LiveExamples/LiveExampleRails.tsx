import React, { useLayoutEffect, useRef } from "react";
import { Card } from "playbook-ui";
import { useDarkMode } from "../../contexts/DarkModeContext";

type LiveExampleRailsProps = {
  html: string;
};

type ScriptSnapshot = {
  attributes: { name: string; value: string }[];
  content: string;
  element: HTMLScriptElement;
};

const RAILS_EXAMPLE_CARD_HTML_OPTIONS = {
  style: {
    border: "none",
    boxSizing: "border-box",
    maxWidth: "100%",
    minWidth: 0,
  },
};

const RAILS_EXAMPLE_WRAPPER_STYLE: React.CSSProperties = {
  boxSizing: "border-box",
  maxWidth: "100%",
  minWidth: 0,
  overflowX: "auto",
  width: "100%",
};

const EXECUTE_SCRIPT_DELAY_MS = 100;
const REINITIALIZE_DELAY_MS = 200;

const transformScriptForLiveExecution = (scriptContent: string): string => {
  // Rails examples are injected after the page has already loaded, so
  // DOMContentLoaded callbacks need to run on a short timer instead.
  const usesDOMContentLoaded = /DOMContentLoaded/.test(scriptContent);

  if (usesDOMContentLoaded) {
    let transformed = scriptContent;

    transformed = transformed.replace(
      /(window|document)\.addEventListener\s*\(\s*["']DOMContentLoaded["']\s*,\s*/g,
      "setTimeout(",
    );

    transformed = transformed.replace(
      /\}\s*\)\s*;?\s*$/,
      "}, 50);",
    );

    return transformed;
  }

  return scriptContent;
};

const applyDarkModeToRenderedRoots = (
  container: HTMLDivElement,
  darkMode: boolean,
): void => {
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
};

const resetExampleOverflow = (element: HTMLElement): void => {
  element.style.overflowX = "auto";
  element.style.removeProperty("overflow-y");
};

const showExampleOverflow = (
  event: React.SyntheticEvent<HTMLDivElement>,
): void => {
  event.currentTarget.style.overflowX = "visible";
  event.currentTarget.style.overflowY = "visible";
};

// Flatpickr stores its instance on the input and owns calendar DOM outside
// React. Destroying it first keeps tab switches from leaving hidden calendars.
const destroyFlatpickrInstances = (element: HTMLElement): void => {
  const flatpickrInputs = Array.from(
    element.querySelectorAll<HTMLInputElement>("input"),
  );

  flatpickrInputs.forEach((input) => {
    const flatpickrInstance = (input as HTMLInputElement & {
      _flatpickr?: { destroy?: () => void };
    })._flatpickr;

    if (typeof flatpickrInstance?.destroy === "function") {
      flatpickrInstance.destroy();
    }
  });
};

// Rails Popover moves its tooltip into body. Capture the ids while the popover
// wrappers are still inside the live example so cleanup can find them later.
const collectPopoverTooltipIds = (container: HTMLElement): string[] => {
  const popoverElements = Array.from(
    container.querySelectorAll<HTMLElement>("[data-pb-popover-tooltip-id]"),
  );

  return popoverElements
    .map((element) => element.dataset.pbPopoverTooltipId)
    .filter((id): id is string => Boolean(id));
};

const removePortaledPopovers = (
  container: HTMLElement,
  tooltipIds: string[],
): void => {
  if (!tooltipIds.length) return;

  const tooltipIdSet = new Set(tooltipIds);
  const matchingTooltips = Array.from(
    document.body.querySelectorAll<HTMLElement>("[id]"),
  ).filter((element) => tooltipIdSet.has(element.id));

  matchingTooltips.forEach((tooltip) => {
    if (container.contains(tooltip)) return;

    destroyFlatpickrInstances(tooltip);
    tooltip.remove();
  });
};

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

  useLayoutEffect(() => {
    if (!containerRef.current || !html) return;

    applyDarkModeToRenderedRoots(containerRef.current, darkMode);
  }, [html, darkMode]);

  useLayoutEffect(() => {
    if (!containerRef.current || !html) return;

    const container = containerRef.current;
    const portaledTooltipIds = collectPopoverTooltipIds(container);

    // Keep a copy of inline scripts before Playbook popovers move their
    // tooltip content out of this live example and into document.body.
    const scriptsToExecute: ScriptSnapshot[] = Array.from(
      container.querySelectorAll("script"),
    ).map((script) => ({
      attributes: Array.from(script.attributes).map((attr) => ({
        name: attr.name,
        value: attr.value,
      })),
      content: script.textContent || "",
      element: script,
    }));

    // Returning from React to Rails can leave an older Rails tooltip in body.
    // Removing it prevents duplicate ids like filter-form... / filter-default.
    removePortaledPopovers(container, portaledTooltipIds);

    const preventHashNavigation = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href="#"]');
      if (anchor) {
        e.preventDefault();
      }
    };
    container.addEventListener('click', preventHashNavigation);

    // First pass wires up enhanced Rails kits such as Popover.
    window.dispatchEvent(new Event("turbo:frame-load"));

    // Then run the example's inline scripts, including date picker setup.
    const scriptTimeout = setTimeout(() => {
      scriptsToExecute.forEach(({ attributes, content, element }) => {
        const newScript = document.createElement("script");
        attributes.forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });

        newScript.textContent = transformScriptForLiveExecution(content);

        if (element.parentNode) {
          element.parentNode.replaceChild(newScript, element);
        } else {
          container.appendChild(newScript);
        }
      });
    }, EXECUTE_SCRIPT_DELAY_MS);

    // One final pass catches any Rails kits inserted or moved by inline scripts.
    const turboTimeout = setTimeout(() => {
      window.dispatchEvent(new Event("turbo:frame-load"));
    }, REINITIALIZE_DELAY_MS);

    return () => {
      clearTimeout(scriptTimeout);
      clearTimeout(turboTimeout);
      // Popovers and flatpickr calendars can own body-level DOM. Clean them
      // before the React tree drops this live example.
      destroyFlatpickrInstances(container);
      removePortaledPopovers(container, portaledTooltipIds);
      container.removeEventListener('click', preventHashNavigation);
    };
  }, [html]);

  if (!html) return null;

  return (
    <Card
        borderNone
        dark={darkMode}
        htmlOptions={RAILS_EXAMPLE_CARD_HTML_OPTIONS}
        padding="md"
    >
      <div
          onBlurCapture={handleBlurCapture}
          onFocusCapture={showExampleOverflow}
          onPointerDownCapture={showExampleOverflow}
          style={RAILS_EXAMPLE_WRAPPER_STYLE}
      >
        <div dangerouslySetInnerHTML={{ __html: html }}
            ref={containerRef}
        />
      </div>
    </Card>
  );
};

export default LiveExampleRails;
