import React, { useState } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps, GlobalProps } from "../../utilities/globalProps";
import { uniqueId } from "../../utilities/object";

import Flex from "../../pb_flex/_flex";
import Icon from "../../pb_icon/_icon";
import Nav from "../../pb_nav/_nav";
import NavItem from "../../pb_nav/_item";
import PbReactPopover from "../../pb_popover/_popover";

import {
  getActiveItem,
  getActiveOrFirstItem,
  getNextLink,
  getSortIcon,
  getSortItems,
  getSortItemsFor,
  isSortingStyle,
  SortMenuItem,
  isDropdownSelect,
} from "../utilities/sortMenuHelpers";

type TableHeaderPropTypes = {
  alignContent?: "start" | "center" | "end" | "stretch" | "baseline" | "none";
  aria?: { [key: string]: string };
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  colSpan?: number;
  data?: { [key: string]: string };
  headerStyle?: "default" | "borderless" | "floating";
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  justifySortIcon?: "start" | "center" | "end" | "around" | "between" | "evenly" | "none";
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  sortDropdown?: boolean;
  sortMenu?: SortMenuItem[];
  tag?: "table" | "div";
  text?: string;
} & GlobalProps;

const TableHeader = (props: TableHeaderPropTypes): React.ReactElement => {
  const {
    alignContent = "center",
    aria = {},
    children,
    className,
    colSpan,
    data = {},
    headerStyle = "default",
    htmlOptions = {},
    id,
    justifySortIcon = "between",
    placement = "bottom-end",
    sortDropdown,
    sortMenu = [{}] as SortMenuItem[],
    tag = "table",
    text,
  } = props;

  const [showSortPopover, setShowSortPopover] = useState(false);
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
  const sortingEnabled = isSortingStyle(sortMenu);
  const dropdownEnabled =
    isTableTag &&
    isDropdownSelect(sortMenu, resolvedColSpan as number | undefined, sortDropdown);
  const activeItem = sortingEnabled ? getActiveItem(sortMenu) : ({} as SortMenuItem);
  const nextLink = sortingEnabled ? getNextLink(sortMenu) : "";
  const sortIconName = sortingEnabled
    ? getSortIcon(activeItem.direction, activeItem.active)
    : "";
  const isSortActive = Object.keys(activeItem).length > 0;
  const linkStyle = isSortActive ? undefined : { color: "#687887" };
  const headerId = id || (dropdownEnabled ? uniqueId("pb-th") : undefined);

  const closeSortPopover = (shouldClose: boolean) => {
    setShowSortPopover(!shouldClose);
  };

  const handleSortLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!dropdownEnabled) return;
    event.preventDefault();
    event.stopPropagation();
    setShowSortPopover((open) => !open);
  };

  const sortLink = (
    <a
        href={dropdownEnabled ? "#" : nextLink}
        onClick={handleSortLinkClick}
        style={linkStyle}
    >
      <Flex
          align={alignContent}
          className="pb_th_link"
          justify={justifySortIcon}
      >
        <>
          {text || children}
          {sortIconName !== "" && (
            <Icon
                className={isSortActive ? "pb_th_active" : ""}
                fixedWidth
                icon={sortIconName}
                paddingLeft="xs"
            />
          )}
        </>
      </Flex>
    </a>
  );

  const sortDropdownMenu = dropdownEnabled && (
    <PbReactPopover
        className="pb_filter_sort_menu"
        closeOnClick="outside"
        padding="none"
        placement={placement}
        reference={sortLink}
        shouldClosePopover={closeSortPopover}
        show={showSortPopover}
    >
      <Nav className="pb_table_header_dropdown">
        {getSortItems(sortMenu).map((sortItemName) => {
          const item = getActiveOrFirstItem(getSortItemsFor(sortMenu, sortItemName));
          return (
            <NavItem
                active={item.active}
                className="header_nav_item"
                highlighted_border={false}
                iconRight={getSortIcon(item.direction, item.active)}
                key={sortItemName}
                link={getNextLink(sortMenu, sortItemName)}
                onClick={() => setShowSortPopover(false)}
                padding="xs"
                text={item.item || ""}
            />
          );
        })}
      </Nav>
    </PbReactPopover>
  );

  const headerContent = (() => {
    if (!sortingEnabled) return text || children;
    if (dropdownEnabled) return sortDropdownMenu;
    return sortLink;
  })();

  return (
    <>
      {isTableTag ? (
        <th
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            {...(resolvedColSpan != null && { colSpan: resolvedColSpan as number })}
            id={headerId}
        >
          {headerContent}
        </th>
      ) : (
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={headerId}
        >
          {headerContent}
        </div>
      )}
    </>
  );
};

export default TableHeader;
