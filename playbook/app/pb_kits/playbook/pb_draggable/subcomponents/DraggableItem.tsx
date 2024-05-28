import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { DraggableContext } from "../context";

type DraggableItemProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode;
  className?: string;
  container?: any;
  data?: { [key: string]: string };
  id?: string;
};

const DraggableItem = (props: DraggableItemProps) => {
  const { aria = {}, children, className, container, data = {}, id } = props;

  const { isDragging, handleDragStart, handleDragEnter, handleDragEnd } =
    DraggableContext();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_draggable_item"),
    `${isDragging === id ? "is_dragging" : ""}`,
    globalProps(props),
    className
  );

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        draggable
        id={id}
        key={id}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragEnter={(e) => handleDragEnter(e, id, container)}
        onDragStart={(e) => handleDragStart(e, id, container)}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
