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

type DraggableItemProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode;
  className?: string;
  container?: any;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
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
    tag="div"
  } = props;

  const {
    isDragging,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    dropZone = 'ghost',
    dropZoneColor = 'neutral'
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

  // Custom drag start handler
  const onDragStart = (e: React.DragEvent) => {
    // Call the original handler
    handleDragStart(dragId, container);

    // For dropZone="ghost", we don't need to do anything special
    // For other variants, we'll let the CSS handle it
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
        onDragEnd={() => handleDragEnd()}
        onDragEnter={() => handleDragEnter(dragId, container)}
        onDragStart={onDragStart}
        ref={itemRef}
    >
      {children}
    </Tag>
  );
};

export default DraggableItem;
