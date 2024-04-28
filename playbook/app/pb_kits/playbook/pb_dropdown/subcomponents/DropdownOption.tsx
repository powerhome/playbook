import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps, GlobalProps } from "../../utilities/globalProps";

import DropdownContext from "../context";

import Flex from "../../pb_flex/_flex";
import Body from "../../pb_body/_body";
import ListItem from "../../pb_list/_list_item";
import { GenericObject } from "../../types";

type DropdownOptionProps = {
  aria?: { [key: string]: string };
  className?: string;
  children?: React.ReactChild[] | React.ReactChild;
  data?: { [key: string]: string };
  dark?: boolean;
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  option?: GenericObject;
  key?: string;
  padding?: string;
}  & GlobalProps;

const DropdownOption = (props: DropdownOptionProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    dark = false,
    htmlOptions = {},
    id,
    option,
    key,
    padding = "xs",
  } = props;

  const {
    handleOptionClick,
    selected,
    filterItem,
    filteredOptions,
    focusedOptionIndex,
  } = useContext(DropdownContext);

  const isItemMatchingFilter = (option: GenericObject) =>
    option?.label.toLowerCase().includes(filterItem.toLowerCase());

  if (!isItemMatchingFilter(option)) {
    return null;
  }
  const isFocused =
    focusedOptionIndex >= 0 &&
    filteredOptions[focusedOptionIndex].label === option.label;
  const focusedClass = isFocused && "dropdown_option_focused";

  const selectedClass = `${
    selected.label === option.label
      ? "dropdown_option_selected"
      : "dropdown_option_list"
  }`;
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_dropdown_option"),
    selectedClass,
    focusedClass,
    globalProps(props, {padding}),
    className
  );

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
        key={key}
        onClick= {() => handleOptionClick(option)}
    >
      <ListItem
          cursor="pointer"
          dark={dark}
          data-name={option.value}
          key={option.label}
          padding="none"
      >
        <Flex
            align="center"
            className="dropdown_option"
            justify="between"
            paddingX="sm"
            paddingY="xxs"
        >
          {children ? 
              children : 
              <Body dark={dark} 
                  text={option.label} 
              />
          }
        </Flex>
      </ListItem>
    </div>
  );
};

export default DropdownOption;
