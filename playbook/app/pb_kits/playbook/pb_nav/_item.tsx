import React from "react";
import classnames from "classnames";

import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps, GlobalProps } from "../utilities/globalProps";

import Icon from "../pb_icon/_icon";
import Image from "../pb_image/_image";
import Collapsible from "../pb_collapsible/_collapsible";
import { NavChildProps } from "./navTypes";
import { Spacing } from "../types";

type NavItemProps = {
  active?: boolean;
  aria?: { [key: string]: string };
  fontWeight?: "regular" | "bold" | "bolder";
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  collapsible?: boolean;
  data?: object;
  dark?: boolean;
  fontSize?: "regular" | "small";
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
  paddingBottom?: Spacing;
  paddingTop?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
  paddingX?: Spacing;
  paddingY?: Spacing;
  padding?: Spacing;
  margin?: Spacing,
  marginBottom?: Spacing,
  marginTop?: Spacing,
  marginRight?: Spacing,
  marginLeft?: Spacing,
  marginX?: Spacing,
  marginY?: Spacing,
  orientation?: "vertical" | "horizontal";
  variant?: "normal" | "subtle";
} & GlobalProps;

const NavItem = (props: NavItemProps) => {
  
  const fontWeightDefault = (orientation: string, variant: string) => {
    return orientation === "horizontal" && variant === "subtle"
      ? "regular "
      : orientation === "horizontal" && variant === "normal"
      ? "bold"
      : "regular";
  };

  const {
    active = false,
    aria = {},
    orientation,
    variant,
    fontWeight = fontWeightDefault(orientation, variant),
    children,
    className,
    collapsible,
    data = {},
    dark = false,
    fontSize = "regular",
    iconLeft,
    iconRight,
    onIconRightClick,
    onIconLeftClick,
    id,
    imageUrl,
    link,
    onClick = () => {},
    target = "_self",
    text = "",
    collapsibleTrail,
    collapsed,
    itemSpacing,
    padding,
    paddingX,
    paddingY,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    margin,
    marginBottom,
    marginTop,
    marginRight,
    marginLeft,
    marginX,
    marginY
  } = props;

  const filteredProps = { ...props };
  [
    "padding",
    "paddingX",
    "paddingY",
    "paddingBottom",
    "paddingTop",
    "paddingRight",
    "paddingLeft",
    "margin",
    "marginX",
    "marginY",
    "marginBottom",
    "marginTop",
    "marginRight",
    "marginLeft",
  ].forEach((prop) => delete filteredProps[prop]);

  const Tag = link ? "a" : "div";
  const activeClass = active === true ? "active" : "";
  const collapsibleTrailClass =
    collapsible && collapsibleTrail ? "collapsible_trail" : "";
  const fontSizeClass =
    fontSize === "small" ? "font_size_small" : "font_size_regular";
  const fontWeightClass =
    fontWeight === "bold"
      ? "font_bold"
      : fontWeight === "bolder"
      ? "font_bolder"
      : "font_regular";
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_nav_list_kit_item", activeClass),
    collapsible
      ? buildCss("pb_collapsible_nav_item", activeClass, collapsibleTrailClass)
      : "",
    fontSizeClass,
    fontWeightClass,
    globalProps(filteredProps),
    className
  );

  const spacingProps = {
    padding,
    paddingBottom,
    paddingTop,
    paddingRight,
    paddingLeft,
    paddingX,
    paddingY,
    margin,
    marginBottom,
    marginTop,
    marginRight,
    marginLeft,
    marginX,
    marginY,
  };

  const finalItemSpacing = {
    ...(itemSpacing || {}),
    ...Object.entries(spacingProps).reduce((acc: any, [prop, value]) => {
      if (value) {
        acc[prop] = value;
      }
      return acc;
    }, {}),
  };

  const tagClasses = classnames(
    collapsible ? "pb_nav_list_item_link_collapsible" : "pb_nav_list_item_link",
    globalProps({ ...finalItemSpacing })
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

  return (
    <li {...ariaProps} {...dataProps} className={classes} id={id}>
      {collapsible ? (
        <Collapsible
          icon={iconRight && iconRight}
          iconSize="xs"
          id={id}
          collapsed={collapsed}
          onIconClick={onIconRightClick}
          onClick={onClick}
        >
          <Collapsible.Main dark={dark}>
            <Tag className={tagClasses} href={link} target={target}>
              {imageUrl && (
                <div
                  className="pb_nav_list_item_icon_section_collapsible"
                  key={imageUrl}
                  onClick={(e) => handleIconClick(e)}
                >
                  <Image className="pb_nav_img_wrapper" url={imageUrl} />
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
              <span className="pb_nav_list_item_text_collapsible">{text}</span>
            </Tag>
          </Collapsible.Main>
          <Collapsible.Content>{childrenWithProps}</Collapsible.Content>
        </Collapsible>
      ) : (
        <Tag
          className={tagClasses}
          href={link}
          onClick={onClick}
          target={target}
        >
          {imageUrl && (
            <div className="pb_nav_list_item_icon_section" key={imageUrl}>
              <Image className="pb_nav_img_wrapper" url={imageUrl} />
            </div>
          )}

          {iconLeft && (
            <div className="pb_nav_list_item_icon_section" key={iconLeft}>
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
    </li>
  );
};

export default NavItem;
