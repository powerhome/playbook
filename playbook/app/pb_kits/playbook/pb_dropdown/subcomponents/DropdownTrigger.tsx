import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { useHandleOnKeyDown } from "../hooks/useHandleOnKeydown";

import DropdownContext from "../context";

import Body from "../../pb_body/_body";
import Icon from "../../pb_icon/_icon";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";

type DropdownTriggerProps = {
  aria?: { [key: string]: string };
  children?: React.ReactChild[] | React.ReactChild;
  className?: string;
  customDisplay?: React.ReactChild[] | React.ReactChild;
  data?: { [key: string]: string };
  id?: string;
  placeholder?: string;
};

const DropdownTrigger = (props: DropdownTriggerProps) => {
  const {
    aria = {},
    className,
    children,
    customDisplay,
    data = {},
    id,
    placeholder,
  } = props;

  const {
    autocomplete,
    handleWrapperClick,
    selected,
    filterItem,
    handleChange,
    toggleDropdown,
    isDropDownClosed,
    inputRef,
    isInputFocused,
    setIsInputFocused,
  } = useContext(DropdownContext);

  const handleKeyDown = useHandleOnKeyDown();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_dropdown_trigger"),
    globalProps(props),
    className
  );

  const triggerWrapperClasses = `dropdown_trigger_wrapper ${
    isInputFocused && "dropdown_trigger_wrapper_focus"
  } ${!autocomplete && "dropdown_trigger_wrapper_select_only"}`;

  const customDisplayPlaceholder = selected.label ? (
    <b>{selected.label}</b>
  ) : autocomplete ? (
    ""
  ) : placeholder ? (
    placeholder
  ) : (
    "Select..."
  );

  const defaultDisplayPlaceholder = selected.label
    ? selected.label
    : autocomplete
    ? ""
    : placeholder
    ? placeholder
    : "Select...";

  return (
    <div {...ariaProps} 
        {...dataProps} 
        className={classes} 
        id={id}
    >
      {children ? (
        <div
            onClick={() => toggleDropdown()}
            style={{ display: "inline-block" }}
        >
          {children}
        </div>
      ) : (
        <>
          <Flex
              align="center"
              borderRadius="lg"
              className={triggerWrapperClasses}
              cursor={`${autocomplete ? "text" : "pointer"}`}
              htmlOptions={{
                onClick: () => handleWrapperClick(),
                onKeyDown: handleKeyDown,
                tabIndex: "0",
              }}
              justify="between"
              paddingX="sm"
              paddingY="xs"
          >
            <FlexItem>
              <Flex align="center">
                {customDisplay ? (
                  <Flex align="center">
                    {customDisplay}
                    <Body paddingLeft={`${selected.label ? "xs" : "none"}`}>
                      {customDisplayPlaceholder}
                    </Body>
                  </Flex>
                ) : (
                  <Body text={defaultDisplayPlaceholder} />
                )}
                {autocomplete && (
                  <input
                      className="dropdown_input"
                      onChange={handleChange}
                      onClick={() => toggleDropdown()}
                      onFocus={() => setIsInputFocused(true)}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        selected.label
                          ? ""
                          : placeholder
                          ? placeholder
                          : "Select..."
                      }
                      ref={inputRef}
                      value={filterItem}
                  />
                )}
              </Flex>
            </FlexItem>
              <Body
                  display="flex"
                  htmlOptions={{
                    onClick: (e: Event) => {e.stopPropagation();handleWrapperClick()}
                  }}
                  key={`${isDropDownClosed ? "chevron-down" : "chevron-up"}`}
              >
                <Icon
                    cursor="pointer"
                    icon={`${isDropDownClosed ? "chevron-down" : "chevron-up"}`}
                    size="sm"
                />
              </Body>
          </Flex>
        </>
      )}
    </div>
  );
};

export default DropdownTrigger;
