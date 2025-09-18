import React from "react";
import classnames from "classnames";

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps, GlobalProps } from "../utilities/globalProps";

import Icon from "../pb_icon/_icon";
import Image from "../pb_image/_image";
import Collapsible from "../pb_collapsible/_collapsible";
import { NavChildProps } from "./navTypes";
import { Spacing } from "../types";

type NavItemProps = {
  active?: boolean;
  highlighted_border?: boolean;
  aria?: { [key: string]: string };
  fontWeight?: "regular" | "bold" | "bolder";
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  collapsible?: boolean;
  data?: Record<string, unknown>;
  dark?: boolean;
  fontSize?: "normal" | "small";
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  iconLeft?: string;
  iconRight?: string | string[];
  onIconRightClick?: () => void;
  onIconLeftClick?: () => void;
  id?: string;
  imageUrl?: string;
  link?: string;
  onClick?: () => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
  text: string;
  collapsibleTrail?: boolean;
  collapsed?: boolean;
  orientation?: "vertical" | "horizontal";
  variant?: "normal" | "subtle";
  margin?: Spacing;
  marginBottom?: Spacing;
  marginTop?: Spacing;
  marginRight?: Spacing;
  marginLeft?: Spacing;
  marginX?: Spacing;
  marginY?: Spacing;
} & GlobalProps;

const NavItem = (props: NavItemProps) => {

  const fontWeightDefault = (orientation: string, variant: string) => {
    return orientation === "horizontal" && variant === "subtle"
      ? "regular"
      : orientation === "horizontal" && variant === "normal"
      ? "bold"
      : "regular";
  };

  const {
    active = false,
    highlighted_border = true,
    aria = {},
    orientation,
    variant,
    fontWeight = fontWeightDefault(orientation, variant),
    children,
    className,
    collapsible,
    data = {},
    dark = false,
    fontSize = "normal",
    htmlOptions = {},
    iconLeft,
    iconRight,
    onIconRightClick,
    onIconLeftClick,
    id,
    imageUrl,
    link,
    onClick,
    target = "_self",
    text = "",
    collapsibleTrail,
    collapsed,
    itemSpacing,
    margin,
    marginBottom,
    marginTop,
    marginRight,
    marginLeft,
    marginX,
    marginY,
  } = props;

  const spacingMarginProps = {
    margin,
    marginBottom,
    marginTop,
    marginRight,
    marginLeft,
    marginX,
    marginY,
  };

//separate margin props and padding props  in itemSpacing object
const filterItemSpacing = (obj: { [key: string]: string }) => {
  const filteredPadding: { [key: string]: string } = {};
  const filteredMargin: { [key: string]: string } = {};
  for (const key in obj) {
    if (key.startsWith('padding')) {
      filteredPadding[key] = obj[key];
    } else if (key.startsWith('margin')) {
      filteredMargin[key] = obj[key];
    }
  }
  return { filteredPadding, filteredMargin };
};

//deconstruct itemSpacing
const { filteredPadding, filteredMargin } = filterItemSpacing(itemSpacing);

//if itemSpacing has margin props, apply those, if margin global props passed to navItem itself, navItem props take precendence
  const finalItemSpacing = {
    ...(filteredMargin || {}),
    ...Object.entries(spacingMarginProps).reduce((acc: any, [prop, value]) => {
      if (value) {
        acc[prop] = value;
      }
      return acc;
    }, {}),
  };

  //custom for collapsible only, to apply margin to correct div
  const filteredProps = { ...props };
  delete filteredProps?.margin;
  delete filteredProps?.marginX;
  delete filteredProps?.marginY;
  delete filteredProps?.marginBottom;
  delete filteredProps?.marginTop;
  delete filteredProps?.marginRight;
  delete filteredProps?.marginLeft;


  const isLink = !!link
  const Tag = isLink ? "a" : "div"
  const activeClass = active === true ? "active" : "";
  const highlightedBorderClass = active === true && highlighted_border === false ? "highlighted_border_none" : "";
  const collapsibleTrailClass = collapsible && collapsibleTrail ? "collapsible_trail" : "";

  const fontSizeMapping = {
    "small": "font_size_small",
    "normal": "font_size_normal"
  };

  const fontWeightMapping = {
    "bold": "font_bold",
    "bolder": "font_bolder",
    "regular": "font_regular"
  };

  const fontSizeClass = fontSizeMapping[fontSize];
  const fontWeightClass = fontWeightMapping[fontWeight];

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);

  const tagClasses = classnames(
    collapsible ? "pb_nav_list_item_link_collapsible" : "pb_nav_list_item_link",
  );

  const classes = classnames(
    buildCss("pb_nav_list_kit_item", activeClass, highlightedBorderClass),
    collapsible
      ? buildCss("pb_collapsible_nav_item", activeClass, highlightedBorderClass)
      : "",
    fontSizeClass,
    fontWeightClass,
    tagClasses,
    collapsible ? globalProps(filteredProps, {...filteredPadding}) : globalProps(props, {...itemSpacing}),
    className
  );

  const handleIconClick = (e: any) => {
    if (onIconLeftClick) {
      e.stopPropagation();
      onIconLeftClick();
    }
  };


  // Map over the children and clone them with itemSpacing prop so nested navItems all get itemSpacing
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps: NavChildProps = {
        itemSpacing: itemSpacing,
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  const collapsibleClasses = buildCss("collapsible_nav_wrapper", activeClass, highlightedBorderClass, collapsibleTrailClass)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isLink && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <>
      {collapsible ? (
        <>
          <Collapsible
              className={collapsibleClasses}
              collapsed={collapsed}
              icon={iconRight && iconRight}
              iconSize="xs"
              id={id}
              onClick={onClick}
              onIconClick={onIconRightClick}
          >
            <Collapsible.Main
                className={globalProps({ ...finalItemSpacing })}
                dark={dark}
            >
              <Tag
                  {...ariaProps}
                  {...dataProps}
                  {...htmlProps}
                  className={classes}
                  href={isLink ? link : undefined}
                  id={id}
                  role={!isLink ? "button" : undefined}
                  tabIndex={!isLink ? 0 : undefined}
                  target={isLink ? target : undefined}
              >
                {imageUrl && (
                  <div
                      className="pb_nav_list_item_icon_section_collapsible"
                      key={imageUrl}
                      onClick={(e) => handleIconClick(e)}
                      onKeyDown={!isLink ? handleKeyDown : undefined}
                  >
                    <Image className="pb_nav_img_wrapper"
                        url={imageUrl}
                    />
                  </div>
                )}

                {iconLeft && (
                  <div
                      className="pb_nav_list_item_icon_section_collapsible"
                      key={iconLeft}
                      onClick={(e) => handleIconClick(e)}
                  >
                    <Icon
                        className="pb_nav_list_item_icon_left_collapsible"
                        fixedWidth
                        icon={iconLeft}
                    />
                  </div>
                )}
                <span className="pb_nav_list_item_text_collapsible">
                  {text}
                </span>
              </Tag>
            </Collapsible.Main>
            <Collapsible.Content>{childrenWithProps}</Collapsible.Content>
          </Collapsible>
        </>
      ) : (
        <Tag
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            href={isLink ? link : undefined}
            id={id}
            onClick={onClick}
            onKeyDown={!isLink ? handleKeyDown : undefined}
            role={!isLink ? "button" : undefined}
            tabIndex={!isLink ? 0 : undefined}
            target={isLink ? target : undefined}
        >
          {imageUrl && (
            <div className="pb_nav_list_item_icon_section"
                key={imageUrl}
            >
              <Image className="pb_nav_img_wrapper"
                  url={imageUrl}
              />
            </div>
          )}

          {iconLeft && (
            <div className="pb_nav_list_item_icon_section"
                key={iconLeft}
            >
              <Icon
                  className="pb_nav_list_item_icon_left"
                  fixedWidth
                  icon={iconLeft}
              />
            </div>
          )}

          <span className="pb_nav_list_item_text">{text || children}</span>

          {iconRight && (
            <div
                className="pb_nav_list_item_icon_section"
                key={iconRight as string}
            >
              <Icon
                  className="pb_nav_list_item_icon_right"
                  fixedWidth
                  icon={iconRight as string}
              />
            </div>
          )}
        </Tag>
      )}
    </>
  );
};

export default NavItem;
