import React from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import DraggableContainer from "./subcomponents/DraggableContainer";
import DraggableItem from "./subcomponents/DraggableItem";

type DraggableProps = {
  aria?: { [key: string]: string };
  className?: string;
  children?: React.ReactNode;
  data?: { [key: string]: string };
  dropZone?: 'ghost' | 'outline' | 'shadow' | 'line';
  dropZoneColor?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'info' | 'neutral' | 'royal' | 'purple' | 'teal' | 'red' | 'yellow' | 'green' | 'orange';
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
};

const Draggable = (props: DraggableProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    dropZone = 'ghost',
    dropZoneColor = 'neutral',
    htmlOptions = {},
    id
  } = props;


  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);

  const classes = classnames(
    buildCss("pb_draggable"),
    globalProps(props),
    className
  );

  // Pass down the dropZone and dropZoneColor props to children
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { dropZone, dropZoneColor });
    }
    return child;
  });

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {childrenWithProps}
    </div>
  );
};

Draggable.Container = DraggableContainer;
Draggable.Item = DraggableItem;

export default Draggable;
