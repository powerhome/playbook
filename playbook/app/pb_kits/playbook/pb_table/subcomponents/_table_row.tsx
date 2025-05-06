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
import Draggable from "../../pb_draggable/_draggable";

type TableRowPropTypes = {
  aria?: { [key: string]: string };
  children: React.ReactNode[] | React.ReactNode;
  className: string;
  collapsible?: boolean;
  collapsibleContent?: React.ReactNode[] | React.ReactNode;
  collapsibleSideHighlight?: boolean;
  data?: { [key: string]: string };
  dark?: boolean;
  dragId?: string;
  draggableItem?: boolean;
  headerStyle?: "default" | "borderless" | "floating";
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  toggleCellId?: string;
  sideHighlightColor: string;
  tag?: "table" | "div";
};

const TableRow = (props: TableRowPropTypes): React.ReactElement => {
  const {
    aria = {},
    children,
    collapsible,
    collapsibleContent,
    collapsibleSideHighlight = true,
    className,
    data = {},
    dark = false,
    dragId,
    draggableItem = false,
    headerStyle = "default",
    htmlOptions = {},
    id,
    toggleCellId,
    sideHighlightColor = "none",
    tag = "table",
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const sideHighlightClass =
    sideHighlightColor != "" ? `side_highlight_${sideHighlightColor}` : null;

  const [isCollapsed, setIsCollapsed] = useCollapsible(true);

  const collapsibleRow = collapsible && isCollapsed === true ? "collapsible_table_row" : null;
  const classes = classnames(
    buildCss("pb_table_row_kit", sideHighlightClass),
    "pb_table_tr",
    {
      "pb_table_tr_borderless_header": headerStyle === "borderless",
    },
    collapsibleRow,
    globalProps(props),
    className
  );
  const isTableTag = tag === "table";

  // const [isCollapsed, setIsCollapsed] = useCollapsible(true);

  const colSpan = React.Children.count(children);

  const handleRowClick = (event: React.MouseEvent) => {
    if (toggleCellId) {
      const target = event.target as HTMLElement;
      const clickedCell = target.closest(`#${toggleCellId}`);
      const isIconClick =
      target instanceof SVGElement &&
      (target.matches("svg.pb_custom_icon") || target.closest("svg.pb_custom_icon"));

        if (clickedCell && isIconClick) {
      setIsCollapsed(!isCollapsed);
      }
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

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
                onClick={(e)=>handleRowClick(e)}
                style={{ cursor: toggleCellId ? "default" : "pointer" }}
            >
              {children}
            </tr>
            <tr>
              <Collapsible
                  collapsed={isCollapsed}
                  dark={dark}
                  htmlOptions={{ colSpan: colSpan }}
                  padding="none"
                  tag="td"
              >
                <tr/>
                <Collapsible.Content
                    className={collapsibleSideHighlight ? `table_collapsible_side_highlight` : ''}
                    dark={dark}
                    margin="none"
                    padding="none"
                >
                 {collapsibleContent}
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
                onClick={handleRowClick}
                style={{ cursor: "pointer" }}
            >
              {children}
            </div>
            <tr>
              <Collapsible
                  collapsed={isCollapsed}
                  dark={dark}
                  htmlOptions={{ colSpan: colSpan }}
                  padding="none"
                  tag="td"
              >
                <tr/>
                <Collapsible.Content
                    className={collapsibleSideHighlight ? `table_collapsible_side_highlight` : ''}
                    dark={dark}
                    margin="none"
                    padding="none"
                >
                 {collapsibleContent}
                </Collapsible.Content>
              </Collapsible>
            </tr>
          </>
        )
      ) : isTableTag ? (
        draggableItem ? (
          <Draggable.Item
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classes}
              dragId={dragId}
              tag="tr"
          >
            {children}
          </Draggable.Item>
        ) : (
          <tr
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classes}
              id={id}
          >
            {children}
          </tr>
        )
      ) : draggableItem ? (
        <Draggable.Item
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            dragId={dragId}
        >
          {children}
        </Draggable.Item>
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
