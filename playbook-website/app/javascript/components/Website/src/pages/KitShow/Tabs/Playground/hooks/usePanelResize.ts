import {
  useCallback,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";

type UsePanelResizeOptions = {
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
  panelRef: RefObject<HTMLElement | null>;
};

export function usePanelResize({
  defaultWidth,
  minWidth,
  maxWidth,
  panelRef,
}: UsePanelResizeOptions) {
  const [width, setWidth] = useState(defaultWidth);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, width: defaultWidth });
  const liveWidthRef = useRef(defaultWidth);

  const clampWidth = useCallback(
    (nextWidth: number) =>
      Math.min(maxWidth, Math.max(minWidth, nextWidth)),
    [minWidth, maxWidth],
  );

  const applyLiveWidth = useCallback(
    (nextWidth: number) => {
      liveWidthRef.current = nextWidth;
      panelRef.current?.style.setProperty("width", `${nextWidth}px`);
    },
    [panelRef],
  );

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: event.clientX, width: liveWidthRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  const dragPanel = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    event.preventDefault();
    const delta = dragStartRef.current.x - event.clientX;
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
    setWidth(liveWidthRef.current);
  };

  return {
    width,
    resizeHandleProps: {
      onPointerCancel: stopDragging,
      onPointerDown: startDragging,
      onPointerMove: dragPanel,
      onPointerUp: stopDragging,
    },
  };
}
