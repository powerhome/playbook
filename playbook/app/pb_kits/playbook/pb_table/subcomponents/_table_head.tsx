import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

type TableHeadPropTypes = {
  aria?: { [key: string]: string };
  children: React.ReactNode[] | React.ReactNode;
  className: string;
  data?: { [key: string]: string };
  headerStyle?: "default" | "borderless" | "floating";
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  tag?: "table" | "div";
};

const TableHead = (props: TableHeadPropTypes): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    data = {},
    headerStyle = "default",
    htmlOptions = {},
    id,
    tag = "table",
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    "pb_table_thead", 
    {
      "pb_table_thead_borderless": headerStyle === "borderless" || headerStyle === "floating",
      "pb_table_thead_floating": headerStyle === "floating",
    },
    globalProps(props), 
    className
  );
  const isTableTag = tag === "table";

  return (
    <>
      {isTableTag ? (
        <thead
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
        >
          {children}
        </thead>
      ) : (
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default TableHead;
