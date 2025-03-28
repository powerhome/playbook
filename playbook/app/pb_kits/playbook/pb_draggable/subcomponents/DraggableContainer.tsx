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

type DraggableContainerProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode;
  className?: string;
  container?: any;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'tr' | 'th' | 'td' | 'thead' | 'col' | 'tbody',
};

const DraggableContainer = (props: DraggableContainerProps) => {
  const { aria = {}, children, className, container, data = {}, htmlOptions = {}, id, tag="div" } = props;
  const contextValues = DraggableContext();
  const {
    handleDragOver,
    handleDrop,
    activeContainer,
    dropZone
  } = contextValues;

  // Only get direction if dropZone is 'line'
  const direction = dropZone === 'line' ? (contextValues.direction || 'vertical') : 'vertical';

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const Tag: React.ReactElement | any = `${tag}`;

  const classes = classnames(
    buildCss("pb_draggable_container"),
    `${activeContainer === container ? "active" : ""}`,
    // Only add vertical class if dropZone is 'line' and direction is 'vertical'
    (dropZone === 'line' && direction === 'vertical') ? 'vertical' : '',
    globalProps(props),
    className
  );

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
        key={container}
        onDragOver={(e: Event) => handleDragOver(e, container)}
        onDrop={() => handleDrop(container)}
    >
      {children}
    </Tag>
  );
};

export default DraggableContainer;
