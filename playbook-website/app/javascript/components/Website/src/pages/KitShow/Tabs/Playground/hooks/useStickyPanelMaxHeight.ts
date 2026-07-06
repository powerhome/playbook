import { useEffect, type RefObject } from "react";

// Keep in sync with PropsPanel.scss sticky offsets ($space_md).
const STICKY_TOP_PX = 24;
const STICKY_BOTTOM_PX = 24;
const MIN_PANEL_HEIGHT_PX = 200;

function getScrollParent(node: HTMLElement): HTMLElement | null {
  let parent = node.parentElement;

  while (parent) {
    const { overflowY } = window.getComputedStyle(parent);
    if (/(auto|scroll|overlay)/.test(overflowY)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

function readWebsiteHeaderHeight(element: HTMLElement): number {
  const raw = getComputedStyle(element)
    .getPropertyValue("--website-header-height")
    .trim();

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 89;
}

export function useStickyPanelMaxHeight(
  panelRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const updateMaxHeight = () => {
      const element = panelRef.current;
      if (!element) return;

      const scrollParent = getScrollParent(element);
      const parentRect = scrollParent?.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const headerHeight = readWebsiteHeaderHeight(element);

      const scrollportMax = parentRect
        ? parentRect.height - STICKY_TOP_PX - STICKY_BOTTOM_PX
        : window.innerHeight - headerHeight - STICKY_TOP_PX - STICKY_BOTTOM_PX;

      const viewportMax =
        window.innerHeight - elementRect.top - STICKY_BOTTOM_PX;

      const headerAwareMax =
        window.innerHeight - headerHeight - STICKY_TOP_PX - STICKY_BOTTOM_PX;

      const maxHeight = Math.max(
        MIN_PANEL_HEIGHT_PX,
        Math.min(scrollportMax, viewportMax, headerAwareMax),
      );

      element.style.setProperty("--props-panel-max-height", `${maxHeight}px`);
      element.style.maxHeight = `${maxHeight}px`;
      element.style.height = `${maxHeight}px`;
    };

    updateMaxHeight();

    const scrollParent = getScrollParent(panel);
    scrollParent?.addEventListener("scroll", updateMaxHeight, { passive: true });
    window.addEventListener("resize", updateMaxHeight);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateMaxHeight)
        : null;

    resizeObserver?.observe(panel);
    if (scrollParent) {
      resizeObserver?.observe(scrollParent);
    }

    return () => {
      scrollParent?.removeEventListener("scroll", updateMaxHeight);
      window.removeEventListener("resize", updateMaxHeight);
      resizeObserver?.disconnect();
      panel.style.removeProperty("--props-panel-max-height");
      panel.style.removeProperty("max-height");
      panel.style.removeProperty("height");
    };
  }, [panelRef]);
}
