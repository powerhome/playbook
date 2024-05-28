import React from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import DraggableContainer from "./subcomponents/DraggableContainer";
import DraggableItem from "./subcomponents/DraggableItem";

type DraggableProps = {
  aria?: { [key: string]: string };
  className?: string;
  children?: React.ReactNode;
  data?: { [key: string]: string };
  id?: string;
};

const Draggable = (props: DraggableProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    id,
  } = props;


  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_draggable"),
    globalProps(props),
    className
  );

  return (
    <div {...ariaProps} 
        {...dataProps} 
        className={classes} 
        id={id}
    >
      {children}
    </div>
  );
};

Draggable.Container = DraggableContainer;
Draggable.Item = DraggableItem;

export default Draggable;
