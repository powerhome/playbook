import { useCallback, useRef, useState, type PointerEvent } from "react";

type UsePanelResizeOptions = {
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
};

export function usePanelResize({
  defaultWidth,
  minWidth,
  maxWidth,
}: UsePanelResizeOptions) {
  const [width, setWidth] = useState(defaultWidth);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, width: defaultWidth });

  const clampWidth = useCallback(
    (nextWidth: number) =>
      Math.min(maxWidth, Math.max(minWidth, nextWidth)),
    [minWidth, maxWidth],
  );

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: event.clientX, width };
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  const dragPanel = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    event.preventDefault();
    const delta = dragStartRef.current.x - event.clientX;
    setWidth(clampWidth(dragStartRef.current.width + delta));
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
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
