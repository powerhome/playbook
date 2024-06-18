import React from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import Draggable from "../pb_draggable/_draggable";

type ListProps = {
  aria?: { [key: string]: string };
  borderless?: boolean;
  className?: string;
  children: React.ReactNode[] | React.ReactNode;
  dark?: boolean;
  enableDrag?: boolean;
  data?: Record<string, unknown>;
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  layout?: "" | "left" | "right";
  ordered?: boolean;
  role?: string;
  tabIndex?: number;
  text?: string;
  size?: string;
  variant?: string;
  xpadding?: boolean;
};

const List = (props: ListProps) => {
  const {
    aria = {},
    borderless = false,
    children,
    className,
    dark = false,
    data = {},
    enableDrag = false,
    htmlOptions = {},
    id,
    layout = "",
    ordered = false,
    role,
    size = "",
    tabIndex,
    xpadding = false,
    variant,
    text,
  } = props;

  const layoutClass: { [key: string]: string } = {
    left: "layout_left",
    right: "layout_right",
    default: "",
  };

  const childrenWithProps = React.Children.map(
    children,
    (child: React.ReactElement) => {
      return React.cloneElement(child, { text, variant, enableDrag });
    }
  );
  const ariaProps = buildAriaProps(aria);
   const dataProps = buildDataProps(data)
   const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_list_kit", layoutClass[layout], size, {
      dark: dark,
      borderless: borderless,
      ordered: ordered,
      xpadding: xpadding,
    }),
    globalProps(props),
    className
  );

  return (
    <>
    {
      enableDrag ? (
        <Draggable.Container>
     <div className={classes}>
      {ordered ? (
        <ol
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={className}
            id={id}
            role={role}
            tabIndex={tabIndex}
        >
          {childrenWithProps}
        </ol>
      ) : (
        <ul
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={className}
            id={id}
            role={role}
            tabIndex={tabIndex}
        >
          {childrenWithProps}
        </ul>
      )}
    </div>
        </Draggable.Container>
      ) :
      (
<div className={classes}>
      {ordered ? (
        <ol
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={className}
            id={id}
            role={role}
            tabIndex={tabIndex}
        >
          {childrenWithProps}
        </ol>
      ) : (
        <ul
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={className}
            id={id}
            role={role}
            tabIndex={tabIndex}
        >
          {childrenWithProps}
        </ul>
      )}
    </div>
      )
    }
    
    </>
  );
};

export default List;
