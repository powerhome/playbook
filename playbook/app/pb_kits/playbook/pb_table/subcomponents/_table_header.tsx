import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

type TableHeaderPropTypes = {
  aria?: { [key: string]: string };
  children: React.ReactNode[] | React.ReactNode;
  className: string;
  colSpan?: number;
  data?: { [key: string]: string };
  headerStyle?: "default" | "borderless" | "floating";
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  tag?: "table" | "div";
  text?: string;
};

const TableHeader = (props: TableHeaderPropTypes): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    colSpan,
    data = {},
    headerStyle = "default",
    htmlOptions = {},
    id,
    tag = "table",
    text
  } = props;

  const { colSpan: htmlColSpan, colspan: htmlColspan, ...restHtmlOptions } = htmlOptions;
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(restHtmlOptions);
  const classes = classnames(
    "pb_table_th", 
    {
      "pb_table_thead_borderless": headerStyle === "borderless" || headerStyle === "floating",
      "pb_table_thead_floating": headerStyle === "floating",
    },
    globalProps(props), 
    className
  );
  const isTableTag = tag === "table";
  const resolvedColSpan = colSpan ?? htmlColSpan ?? htmlColspan;

  return (
    <>
      {isTableTag ? (
        <th
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            {...(resolvedColSpan != null && { colSpan: resolvedColSpan as number })}
            id={id}
        >
          {text || children}
        </th>
      ) : (
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
        >
          {text || children}
        </div>
      )}
    </>
  );
};

export default TableHeader;
