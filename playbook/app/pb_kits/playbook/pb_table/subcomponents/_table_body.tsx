import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

import Draggable from "../../pb_draggable/_draggable"

type TableBodyPropTypes = {
  aria?: { [key: string]: string };
  children: React.ReactNode[] | React.ReactNode;
  className: string;
  data?: { [key: string]: string };
  draggableContainer?: boolean;
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  tag?: "table" | "div";
};

const TableBody = (props: TableBodyPropTypes): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    data = {},
    draggableContainer = false,
    htmlOptions = {},
    id,
    tag = "table",
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames("pb_table_tbody", globalProps(props), className);
  const isTableTag = tag === "table";

  return (
    <>
      {isTableTag ? (
        draggableContainer ? (
          <Draggable.Container
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classes}
              id={id}
              tag="tbody"
          >
            {children}
          </Draggable.Container>
        ) : (
          <tbody
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classes}
              id={id}
          >
            {children}
          </tbody>
        )
      ) : draggableContainer ? (
        <Draggable.Container
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
        >
          {children}
        </Draggable.Container>
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

export default TableBody;
