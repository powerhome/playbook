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

  
  if (!isItemMatchingFilter(option) || (multiSelect && isSelected)) {
    return null;
  }
  const isFocused =
    focusedOptionIndex >= 0 &&
    filteredOptions[focusedOptionIndex].label === option?.label;
  const focusedClass = isFocused && "focused";

  const selectedClass = isSelected ? "selected" : "list";

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss(
      "pb_dropdown_option",
      selectedClass,
      focusedClass,
    ),
    globalProps(props),
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
          data-name={option?.value}
          key={option?.label}
          padding="none"
      >
          {children ? 
          <div className="dropdown_option_wrapper">{children}</div> :
              <Body dark={dark} 
                  text={option?.label} 
              />
          }
      </ListItem>
    </div>
  );
};

export default DropdownOption;
