import React, { useEffect } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import DraggableContainer from "./subcomponents/DraggableContainer";
import DraggableItem from "./subcomponents/DraggableItem";
import { DraggableContext } from "./context";

type DraggableProps = {
  aria?: { [key: string]: string };
  className?: string;
  children?: React.ReactNode;
  data?: { [key: string]: string };
  id?: string;
  draggableItems?: { [key: string]: string }[];
  onDragChange?: (items: {[key: string]: string }[]) => void;
};

const Draggable = (props: DraggableProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    id,
    draggableItems,
    onDragChange,
  } = props;

  const { items, setItems } = DraggableContext();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_draggable"),
    globalProps(props),
    className
  );

  useEffect(() => {
    setItems(draggableItems);
  }, [draggableItems]);

  useEffect(() => {
    onDragChange(items);
  }, [items]);

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
