import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Card, Nav, Title } from "playbook-ui";
import "./CollapsedHoverNav.scss";

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
    top: 0,
    visibility: "hidden",
  });
  const [placementMode, setPlacementMode] = useState<PlacementMode>("align");
  const [attachedTop, setAttachedTop] = useState(false);
  const [attachedBottom, setAttachedBottom] = useState(false);

  useLayoutEffect(() => {
    if (!anchorEl) return;

    let frameId = 0;

    const updatePosition = () => {
      const titleEl = titleRef.current;
      const bodyEl = bodyRef.current;
      const flyoutEl = flyoutRef.current;
      if (!titleEl || !bodyEl || !anchorEl.isConnected) return;

      const hasSubnav = Boolean(children);
      const anchorRect = anchorEl.getBoundingClientRect();
      const left = getSidebarRight(anchorEl) + HORIZONTAL_GAP;
      const headerBottom = getHeaderBottom(anchorEl);
      const viewportHeight = window.innerHeight;
      const availableHeight = Math.max(viewportHeight - headerBottom, 0);

      // scrollHeight stays accurate even when the body is already constrained/scrollable.
      const contentHeight = titleEl.offsetHeight + bodyEl.scrollHeight;
      // Leaf flyouts are title-only; use measured height so card padding is included when centering.
      const leafHeight = flyoutEl?.offsetHeight || contentHeight;
      const alignedTop = Math.max(anchorRect.top, headerBottom);

      let mode: PlacementMode = "align";
      let top = alignedTop;
      let bottom: CSSProperties["bottom"] = "auto";

      if (!hasSubnav) {
        // Leaf items: vertically center on the hovered nav item.
        const centeredTop =
          anchorRect.top + (anchorRect.height - leafHeight) / 2;
        top = Math.min(
          Math.max(centeredTop, headerBottom),
          Math.max(headerBottom, viewportHeight - leafHeight),
        );
        mode = "align";
      } else if (contentHeight > availableHeight) {
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
      setAttachedTop(top === headerBottom);
      setAttachedBottom(bottom === 0);
      setStyle({
        left,
        top,
        bottom,
        visibility: "visible",
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
  const className = [
    "pb--page--sideNav-hoverNav",
    dark ? "dark" : "",
    isScrollable ? "is-scrollable" : "",
    attachedTop ? "is-attached-top" : "",
    attachedBottom ? "is-attached-bottom" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return createPortal(
    <div
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={flyoutRef}
      style={style}
    >
      <Card
        borderNone
        borderRadius="none"
        className="pb--page--sideNav-hoverNav__card"
        dark={dark}
        display="flex"
        flexDirection="column"
        overflow={isScrollable ? "hidden" : "visible"}
        paddingX="none"
        paddingY="sm"
        shadow="deeper"
        width="100%"
      >
        <div
          className={onTitleClick ? "pb--page--sideNav-hoverNav__title" : undefined}
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
          ref={titleRef}
          role={onTitleClick ? "button" : undefined}
          tabIndex={onTitleClick ? 0 : undefined}
        >
          <Title
            dark={dark}
            paddingX="md"
            paddingY="xs"
            size={4}
            text={title}
          />
        </div>
        <div
          className={hasSubnav ? "pb--page--sideNav-hoverNav__body" : undefined}
          ref={bodyRef}
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
