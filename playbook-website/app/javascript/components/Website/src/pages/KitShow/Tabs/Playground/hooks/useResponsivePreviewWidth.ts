import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";
import {
  getPresetById,
  RESPONSIVE_PREVIEW_MIN_WIDTH,
  type ResponsivePreviewPresetId,
} from "../responsivePreviewUtils";

type UseResponsivePreviewWidthOptions = {
  containerRef: RefObject<HTMLElement | null>;
  frameRef: RefObject<HTMLElement | null>;
};

export function useResponsivePreviewWidth({
  containerRef,
  frameRef,
}: UseResponsivePreviewWidthOptions) {
  const [activePreset, setActivePreset] =
    useState<ResponsivePreviewPresetId>("full");
  const [customWidth, setCustomWidth] = useState<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, width: 0 });
  const liveWidthRef = useRef<number | null>(null);

  const isFullWidth = activePreset === "full" && customWidth === null;

  const frameWidth = isFullWidth
    ? null
    : (customWidth ?? getPresetById(activePreset).width ?? null);

  const selectPreset = useCallback((presetId: ResponsivePreviewPresetId) => {
    setActivePreset(presetId);
    setCustomWidth(null);
    liveWidthRef.current = null;
  }, []);

  const clampWidth = useCallback(
    (nextWidth: number) => {
      const maxWidth = Math.max(
        RESPONSIVE_PREVIEW_MIN_WIDTH,
        containerRef.current?.clientWidth ?? nextWidth,
      );
      return Math.min(maxWidth, Math.max(RESPONSIVE_PREVIEW_MIN_WIDTH, nextWidth));
    },
    [containerRef],
  );

  const applyLiveWidth = useCallback(
    (nextWidth: number) => {
      liveWidthRef.current = nextWidth;
      frameRef.current?.style.setProperty("width", `${nextWidth}px`);
    },
    [frameRef],
  );

  useEffect(() => {
    if (frameWidth === null || !containerRef.current) return;

    const clamped = clampWidth(frameWidth);
    if (clamped !== frameWidth) setCustomWidth(clamped);
  }, [clampWidth, containerRef, frameWidth]);

  useEffect(() => {
    if (frameWidth === null || isDraggingRef.current) return;
    liveWidthRef.current = frameWidth;
  }, [frameWidth]);

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (frameWidth === null) return;

    isDraggingRef.current = true;
    dragStartRef.current = { x: event.clientX, width: frameWidth };
    liveWidthRef.current = frameWidth;
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  const dragFrame = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    event.preventDefault();
    const delta = event.clientX - dragStartRef.current.x;
    applyLiveWidth(clampWidth(dragStartRef.current.width + delta));
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    if (liveWidthRef.current !== null) {
      setCustomWidth(liveWidthRef.current);
    }
  };

  return {
    activePreset,
    customWidth,
    frameWidth,
    isFullWidth,
    resizeHandleProps: {
      onPointerCancel: stopDragging,
      onPointerDown: startDragging,
      onPointerMove: dragFrame,
      onPointerUp: stopDragging,
    },
    selectPreset,
  };
}
