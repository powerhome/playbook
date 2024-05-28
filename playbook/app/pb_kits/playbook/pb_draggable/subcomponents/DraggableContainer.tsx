import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { DraggableContext } from "../context";

type DraggableContainerProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode;
  className?: string;
  container?: any;
  data?: { [key: string]: string };
  id?: string;
};

const DraggableContainer = (props: DraggableContainerProps) => {
  const { aria = {}, children, className, container, data = {}, id } = props;

  const { handleDragOver, handleDrop, activeContainer } = DraggableContext();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_draggable_container"),
    "container",
    `${activeContainer === container ? "active" : ""}`,
    globalProps(props),
    className
  );

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
        key={container}
        onDragOver={(e) => handleDragOver(e, container)}
        onDrop={(e) => handleDrop(e, container)}
    >
      {children}
    </div>
  );
};

export default DraggableContainer;
