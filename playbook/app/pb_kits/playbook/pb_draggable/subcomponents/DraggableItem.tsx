import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { DraggableContext } from "../context";
import { noop } from '../../utilities/object'

type DraggableItemProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode;
  className?: string;
  container?: any;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  onDrag?: () => void,
  onDragEnd?: () => void,
  onDragEnter?: () => void,
  onDragLeave?: () => void,
  onDragOver?: () => void,
  onDragStart?: () => void,
  onDrop?: () => void,
  dragId?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'tr' | 'th' | 'td' | 'thead' | 'col' | 'tbody',
};

const DraggableItem = (props: DraggableItemProps) => {
  const {
    aria = {},
    children,
    className,
    container,
    data = {},
    htmlOptions = {},
    id,
    dragId,
    tag="div",
    onDrag = noop,
    onDragEnd = noop,
    onDragEnter = noop,
    onDragLeave = noop,
    onDragOver = noop,
    onDragStart = noop,
    onDrop = noop,
  } = props;

  const {
    isDragging,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    dropZone = 'ghost',
    dropZoneColor = 'neutral',
    direction = 'horizontal'
  } = DraggableContext();

  const itemRef = React.useRef<HTMLElement>(null);

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const Tag: React.ReactElement | any = `${tag}`;

  const classes = classnames(
    buildCss("pb_draggable_item"),
    `${isDragging === dragId ? "is_dragging" : ""}`,
    isDragging === dragId ? `drop_zone_${dropZone}` : "",
    isDragging === dragId && dropZone !== 'ghost' ? `drop_zone_color_${dropZoneColor}` : '',
    globalProps(props),
    className
  );

  // Enhanced drag start handler that preserves dimensions
  const handleDragStartWithCustom = (e: React.DragEvent) => {
    if (dropZone !== 'ghost' && itemRef.current) {
      // Create a clone for the drag image
      const clone = itemRef.current.cloneNode(true) as HTMLElement;

      // Remove any classes that might affect appearance
      clone.className = clone.className.replace(/drop_zone_[^ ]*/g, '');
      clone.className = clone.className.replace(/is_dragging/g, '');

      // Get the original dimensions
      const rect = itemRef.current.getBoundingClientRect();

      // Ensure it's styled properly but invisible on the page
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.width = `${rect.width}px`;  // Preserve width
      clone.style.height = `${rect.height}px`; // Preserve height
      clone.style.opacity = '1';
      clone.style.pointerEvents = 'none';

      // Add to document temporarily
      document.body.appendChild(clone);

      // Set as drag image
      e.dataTransfer.setDragImage(clone, e.clientX - rect.left, e.clientY - rect.top);

      // Remove after a short delay
      setTimeout(() => {
        document.body.removeChild(clone);
      }, 0);
    }

    // Call the original handler
    handleDragStart(dragId, container);

    // Custom event handler
    onDragStart()
  };

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        draggable
        id={id}
        key={dragId}
        onDrag={onDrag}
        onDragEnd={() => {
          handleDragEnd()
          onDragEnd()
        }}
        onDragEnter={() => {
          handleDragEnter(dragId, container)
          onDragEnter()
        }}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={handleDragStartWithCustom}
        onDrop={onDrop}
        ref={itemRef}
    >
      {children}
    </Tag>
  );
};

export default DraggableItem;
