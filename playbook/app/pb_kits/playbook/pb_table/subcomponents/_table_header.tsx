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
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  tag?: "table" | "div";
  text?: string;
};

const TableHeader = (props: TableHeaderPropTypes) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    id,
    tag = "table",
    text
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames("pb_table_th", globalProps(props), className);
  const isTableTag = tag === "table";

  return (
    <>
      {isTableTag ? (
        <th
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
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
