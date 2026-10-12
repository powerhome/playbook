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
    asyncEnabled,
    autocomplete,
    activeStyle,
    disabled,
    filteredOptions,
    filterItem,
    focusedOptionIndex,
    handleOptionClick,
    multiSelect,
    selected,
    renderOption,
    isSameOption,
    selectedOptionIds,
    getOptionValue,
  } = useContext(DropdownContext);

  const isItemMatchingFilter = (option: GenericObject | undefined) => {
    const selectedLabel =
      !multiSelect &&
      !Array.isArray(selected) &&
      (selected as GenericObject)?.label;
    if (asyncEnabled) {
      if (!(autocomplete && selectedLabel && filterItem === selectedLabel)) return true;
      return String(option?.label).toLowerCase().includes(String(selectedLabel).toLowerCase());
    }
    // When the input is only showing the selected label (e.g. seeded defaultValue), do not filter
    const filterText =
      selectedLabel && filterItem === selectedLabel ? "" : filterItem;
    const label = typeof option?.label === 'string' ? option.label.toLowerCase() : option?.label;
    return String(label).toLowerCase().includes(filterText.toLowerCase());
  }

  // When multiSelect, then if an option is selected, remove from dropdown
  const isSelected = selectedOptionIds && option
   ? selectedOptionIds.has(String(getOptionValue(option)))
   : Array.isArray(selected)
   ? selected.some((item) => isSameOption(item, option))
   : isSameOption(selected, option);


  const isOptionDisabled = option?.disabled === true;
  const isDisabled = disabled || isOptionDisabled;

  if (!isItemMatchingFilter(option) || (multiSelect && isSelected)) {
    return null;
  }
  const isFocused =
    focusedOptionIndex >= 0 &&
    isSameOption(filteredOptions[focusedOptionIndex], option);
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

  const content = children || (renderOption && option ? renderOption(option) : null);

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
          {content != null ?
          <div className={optionWrapperClass}>{content}</div> :
              <Body dark={dark} 
                  text={option?.label} 
              />
          }
      </ListItem>
    </div>
  );
};

export default DropdownOption;
