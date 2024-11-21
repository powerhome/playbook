import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import Collapsible from "../../pb_collapsible/_collapsible";
import useCollapsible from "../../pb_collapsible/useCollapsible";
import Background from "../../pb_background/_background";

type TableRowPropTypes = {
  aria?: { [key: string]: string };
  children: React.ReactNode[] | React.ReactNode;
  collapsible?: boolean;
  className: string;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  sideHighlightColor: string;
  tag?: "table" | "div";
};

const TableRow = (props: TableRowPropTypes): React.ReactElement => {
  const {
    aria = {},
    children,
    collapsible,
    className,
    data = {},
    htmlOptions = {},
    id,
    sideHighlightColor = "none",
    tag = "table",
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const sideHighlightClass =
    sideHighlightColor != "" ? `side_highlight_${sideHighlightColor}` : null;
  const classes = classnames(
    buildCss("pb_table_row_kit", sideHighlightClass),
    "pb_table_tr",
    globalProps(props),
    className
  );
  const isTableTag = tag === "table";

  const [isCollapsed, setIsCollapsed] = useCollapsible(false);
  const colSpan = React.Children.count(children);

  return (
    <>
      {collapsible ? (
        isTableTag ? (
          <>
            <tr
                {...ariaProps}
                {...dataProps}
                {...htmlProps}
                className={classes}
                id={id}
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{ cursor: "pointer" }}
            >
              {children}
            </tr>
            <tr>
              <Collapsible
                  collapsed={isCollapsed}
                  htmlOptions={{ colSpan: colSpan }}
                  padding="none"
                  tag="td"
              >
                <tr/>
                <Collapsible.Content 
                    margin="none"
                    padding="none" 
                >
                  <Background color="light" 
                      padding="none"
                  >
                      <div>Nested content inside a background.</div>
                  </Background>
                </Collapsible.Content>
              </Collapsible>
            </tr>
          </>
        ) : (
          <>
            <div
                {...ariaProps}
                {...dataProps}
                {...htmlProps}
                className={classes}
                id={id}
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{ cursor: "pointer" }}
            >
              {children}
            </div>
            <Collapsible collapsed={isCollapsed} 
                padding="none"
            >
              <tr/>
              <Collapsible.Content>
                <div>hello</div>
              </Collapsible.Content>
            </Collapsible>
          </>
        )
      ) : isTableTag ? (
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
