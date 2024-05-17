import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

type TableRowPropTypes = {
  align?: "center" | "right";
  aria?: { [key: string]: string };
  children: React.ReactNode[] | React.ReactNode;
  className: string;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  shift?: "middle" | "down" | "up";
  sideHighlightColor: string;
  tag?: "table" | "div";
};

const TableRow = (props: TableRowPropTypes) => {
  const {
    align,
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    id,
    shift,
    sideHighlightColor = "none",
    tag = "table",
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const alignProp = align ? `align_${align}` : null;
  const shiftProp = shift ? `shift_${shift}` : null;
  const sideHighlightClass =
    sideHighlightColor != "" ? `side_highlight_${sideHighlightColor}` : null;
  const classes = classnames(
    buildCss("pb_table_row_kit", sideHighlightClass),
    "pb_table_tr",
    alignProp,
    shiftProp,
    globalProps(props),
    className
  );
  const isTableTag = tag === "table";

  return (
    <>
      {isTableTag ? (
        <tr
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
        >
          {children}
        </tr>
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

export default TableRow;
