import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Caption, Card, Nav } from "playbook-ui";

const HORIZONTAL_GAP = 0;
const HEADER_HEIGHT_FALLBACK = 89;

type CollapsedHoverNavProps = {
  anchorEl: HTMLElement | null;
  children: ReactNode;
  dark?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTitleClick?: () => void;
  title: string;
};

type PlacementMode = "align" | "bottom" | "scroll";

const getSidebarRight = (anchorEl: HTMLElement) => {
  const sidebar = anchorEl.closest(".pb--page--sideNav") as HTMLElement | null;
  if (sidebar) {
    return sidebar.getBoundingClientRect().right;
  }
  return anchorEl.getBoundingClientRect().right;
};

const getHeaderBottom = (anchorEl: HTMLElement) => {
  const shell = anchorEl.closest(".pb--website-shell") as HTMLElement | null;
  const raw = getComputedStyle(shell || document.documentElement)
    .getPropertyValue("--website-header-height")
    .trim();
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : HEADER_HEIGHT_FALLBACK;
};

export const CollapsedHoverNav = ({
  anchorEl,
  children,
  dark = false,
  onMouseEnter,
  onMouseLeave,
  onTitleClick,
  title,
}: CollapsedHoverNavProps) => {
  const flyoutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    left: -9999,
    position: "fixed",
    top: 0,
    visibility: "hidden",
    zIndex: 1100,
  });
  const [placementMode, setPlacementMode] = useState<PlacementMode>("align");

  useLayoutEffect(() => {
    if (!anchorEl) return;

    let frameId = 0;

    const updatePosition = () => {
      const titleEl = titleRef.current;
      const bodyEl = bodyRef.current;
      if (!titleEl || !bodyEl || !anchorEl.isConnected) return;

      const anchorRect = anchorEl.getBoundingClientRect();
      const left = getSidebarRight(anchorEl) + HORIZONTAL_GAP;
      const headerBottom = getHeaderBottom(anchorEl);
      const viewportHeight = window.innerHeight;
      const availableHeight = Math.max(viewportHeight - headerBottom, 0);

      // scrollHeight stays accurate even when the body is already constrained/scrollable.
      const contentHeight = titleEl.offsetHeight + bodyEl.scrollHeight;
      const alignedTop = Math.max(anchorRect.top, headerBottom);

      let mode: PlacementMode = "align";
      let top = alignedTop;
      let bottom: CSSProperties["bottom"] = "auto";

      if (contentHeight > availableHeight) {
        // Taller than space below the header: flush with header + viewport bottom, scroll.
        mode = "scroll";
        top = headerBottom;
        bottom = 0;
      } else if (alignedTop + contentHeight > viewportHeight) {
        // Not enough room below the item: flush with viewport bottom, still under the header.
        mode = "bottom";
        top = Math.max(headerBottom, viewportHeight - contentHeight);
        bottom = 0;
      } else {
        // Default: align with the nav item (or flush under the header if needed).
        mode = "align";
        top = alignedTop;
      }

      setPlacementMode(mode);
      setStyle({
        left,
        maxHeight: mode === "scroll" ? availableHeight : "none",
        maxWidth:
          "min(280px, calc(100vw - var(--website-sidebar-collapsed-width, 64px) - 24px))",
        minWidth: 220,
        position: "fixed",
        top,
        bottom,
        visibility: "visible",
        width: "max-content",
        zIndex: 1100,
      });
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    if (bodyRef.current) {
      resizeObserver.observe(bodyRef.current);
    }

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, true);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate, true);
    };
  }, [anchorEl, children, title]);

  if (!anchorEl || typeof document === "undefined") return null;

  const isScrollable = placementMode === "scroll";
  const hasSubnav = Boolean(children);

  return createPortal(
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={flyoutRef}
      style={style}
    >
      <Card
        borderRadius="none"
        dark={dark}
        display="flex"
        flexDirection="column"
        htmlOptions={{
          style: isScrollable
            ? {
                height: "100%",
                maxHeight: "inherit",
                minHeight: 0,
              }
            : undefined,
        }}
        overflow={isScrollable ? "hidden" : "visible"}
        padding="none"
        shadow="deeper"
        width="100%"
      >
        <div
          ref={titleRef}
          onClick={onTitleClick}
          onKeyDown={
            onTitleClick
              ? (event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onTitleClick();
                  }
                }
              : undefined
          }
          role={onTitleClick ? "button" : undefined}
          style={onTitleClick ? { cursor: "pointer" } : undefined}
          tabIndex={onTitleClick ? 0 : undefined}
        >
          <Caption
            borderBottom={hasSubnav ? "default" : "none"}
            dark={dark}
            paddingX="sm"
            paddingY="xs"
            text={title}
          />
        </div>
        <div
          ref={bodyRef}
          style={
            !hasSubnav
              ? undefined
              : isScrollable
                ? {
                    flex: "1 1 0",
                    minHeight: 0,
                    overflowX: "hidden",
                    overflowY: "auto",
                    overscrollBehavior: "contain",
                    paddingBottom: 8,
                  }
                : {
                    paddingBottom: 8,
                  }
          }
        >
          {hasSubnav && (
            <Nav dark={dark} highlight={false} variant="bold">
              {children}
            </Nav>
          )}
        </div>
      </Card>
    </div>,
    document.body
  );
};
