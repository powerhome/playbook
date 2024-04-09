import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

import DropdownContext from "../context";

import Flex from "../../pb_flex/_flex";
import ListItem from "../../pb_list/_list_item";
import { GenericObject } from "../../types";

type DropdownOptionProps = {
  aria?: { [key: string]: string };
  className?: string;
  children?: React.ReactChild[] | React.ReactChild;
  data?: { [key: string]: string };
  id?: string;
  option?: GenericObject;
  key?: string;
};

const DropdownOption = (props: DropdownOptionProps) => {
  const { aria = {}, className, children, data = {}, id, option, key } = props;

  const { handleOptionClick, selected, filterItem, filteredOptions, focusedOptionIndex } =
    useContext(DropdownContext);
  const isItemMatchingFilter = (option: GenericObject) =>
    option?.label.toLowerCase().includes(filterItem.toLowerCase());

  if (!isItemMatchingFilter(option)) {
    return null;
  }
  const isFocused = focusedOptionIndex >= 0 && filteredOptions[focusedOptionIndex].label === option.label
  const focusedClass = isFocused && "dropdown_option_focused"

  const selectedClass = `${
    selected.label === option.label
        ? "dropdown_option_selected"
        : "dropdown_option_list"
  }`
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_dropdown_option"),
    selectedClass,
    focusedClass,
    globalProps(props),
    className
  );

  return (
    <div {...ariaProps} 
        {...dataProps} 
        className={classes} 
        id={id} 
        key={key}
    >
      <ListItem
          cursor="pointer"
          data-name={option.value}
          htmlOptions={{ onClick: () => handleOptionClick(option) }}
          key={option.label}
          padding="xs"
      >
        <Flex
            align="center"
            className="dropdown_option"
            justify="between"
            paddingX="sm"
            paddingY="xxs"
        >
          {children}
        </Flex>
      </ListItem>
    </div>
  );
};

export default DropdownOption;
