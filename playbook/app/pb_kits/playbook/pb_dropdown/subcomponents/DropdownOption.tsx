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

import Body from "../../pb_body/_body";
import ListItem from "../../pb_list/_list_item";
import { GenericObject } from "../../types";

type DropdownOptionProps = {
  aria?: { [key: string]: string };
  children?: React.ReactChild[] | React.ReactChild;
  className?: string;
  dark?: boolean;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  key?: string | number;
  option?: GenericObject;
  padding?: string;
}  & GlobalProps;

const DropdownOption = (props: DropdownOptionProps) => {
  const {
    aria = {},
    children,
    className,
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    key,
    option,
  } = props;

  const {
    activeStyle,
    disabled,
    filteredOptions,
    filterItem,
    focusedOptionIndex,
    handleOptionClick,
    multiSelect,
    selected,
  } = useContext(DropdownContext);

  const isItemMatchingFilter = (option: GenericObject | undefined) => {
    const label = typeof option?.label === 'string' ? option.label.toLowerCase() : option?.label;
    return String(label).toLowerCase().includes(filterItem.toLowerCase());
  }

  // When multiSelect, then if an option is selected, remove from dropdown
  const isSelected = Array.isArray(selected)
   ? selected.some((item) => item.label === option?.label)
   : (selected as GenericObject)?.label === option?.label;


  const isOptionDisabled = option?.disabled === true;
  const isDisabled = disabled || isOptionDisabled;

  if (!isItemMatchingFilter(option) || (multiSelect && isSelected)) {
    return null;
  }
  const isFocused =
    focusedOptionIndex >= 0 &&
    filteredOptions[focusedOptionIndex].label === option?.label;
  const focusedClass = isFocused ? "focused" : "";

  const selectedClass = isSelected ? "selected" : "list";


  const bgTokenClass = activeStyle?.backgroundColor
      ? `bg-${activeStyle.backgroundColor}`
      : "";
  const fontTokenClass = activeStyle?.fontColor
    ? `font-${activeStyle.fontColor}`
    : "";

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss(
      "pb_dropdown_option",
      selectedClass,
      focusedClass,
    ),
    isDisabled && "disabled",
    bgTokenClass, 
    fontTokenClass,
    globalProps(props),
    className
  );
  const optionWrapperClass = classnames(
    "dropdown_option_wrapper",
    isDisabled && "disabled"
  );

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        aria-disabled={isDisabled}
        className={classes}
        id={id}
        key={key}
        onClick={isDisabled ? undefined : () => handleOptionClick(option)}
    >
      <ListItem
          cursor={disabled ? "default" : "pointer"}
          dark={dark}
          data-name={option?.value}
          key={option?.label}
          padding="none"
      >
          {children ? 
          <div className={optionWrapperClass}>{children}</div> :
              <Body dark={dark} 
                  text={option?.label} 
              />
          }
      </ListItem>
    </div>
  );
};

export default DropdownOption;
