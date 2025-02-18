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
  const { aria = {}, children, className, container, data = {}, htmlOptions = {},  id, dragId, tag="div" } = props;

  const { isDragging, handleDragStart, handleDragEnter, handleDragEnd } =
    DraggableContext();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);

  const Tag: React.ReactElement | any = `${tag}`;
  
  const classes = classnames(
    buildCss("pb_draggable_item"),
    `${isDragging === dragId ? "is_dragging" : ""}`,
    globalProps(props),
    className
  );

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
        onDragStart={() => handleDragStart(dragId, container)}
    >
      {children}
    </Tag>
  );
};

export default DraggableItem;
