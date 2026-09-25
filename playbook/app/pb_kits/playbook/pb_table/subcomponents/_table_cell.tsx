import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

type TableCellPropTypes = {
  aria?: { [key: string]: string };
  children: React.ReactNode[] | React.ReactNode;
  className: string;
  colSpan?: number;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  tag?: "table" | "div";
  text?: string
};

const TableCell = (props: TableCellPropTypes): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    colSpan,
    data = {},
    htmlOptions = {},
    id,
    tag = "table",
    text,
  } = props;

  const { colSpan: htmlColSpan, colspan: htmlColspan, ...restHtmlOptions } = htmlOptions;
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(restHtmlOptions);
  const classes = classnames("pb_table_td", globalProps(props), className);
  const isTableTag = tag === "table";
  const resolvedColSpan = colSpan ?? htmlColSpan ?? htmlColspan;

  return (
    <>
      {isTableTag ? (
        <td
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            {...(resolvedColSpan != null && { colSpan: resolvedColSpan as number })}
            id={id}
        >
          {text || children}
        </td>
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

export default TableCell;
