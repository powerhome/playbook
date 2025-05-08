import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps
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
  dark?: boolean;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  placeholder?: string;
};

const DropdownTrigger = (props: DropdownTriggerProps) => {
  const {
    aria = {},
    children,
    className,
    customDisplay,
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    placeholder,
  } = props;

  const {
    autocomplete,
    filterItem,
    handleChange,
    handleWrapperClick,
    inputRef,
    inputWrapperRef,
    isDropDownClosed,
    isInputFocused,
    selected,
    setIsInputFocused,
    toggleDropdown,
  } = useContext(DropdownContext);

  const handleKeyDown = useHandleOnKeyDown();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_dropdown_trigger"),
    globalProps(props),
    className
  );

  const triggerWrapperClasses = buildCss(
    "dropdown_trigger_wrapper",
    isInputFocused && "focus",
    !autocomplete && "select_only"
  );

  const customDisplayPlaceholder = selected?.label ? (
    ""
  ) : autocomplete ? (
    ""
  ) : placeholder ? (
    "placeholder"
  ) : (
    "Select..."
  );

  const defaultDisplayPlaceholder = selected?.label
    ? selected.label
    : autocomplete
    ? ""
    : placeholder
    ? placeholder
    : "Select...";

  return (
    <div {...ariaProps} 
        {...dataProps} 
        {...htmlProps}
        className={classes} 
        id={id}
    >
      {
          children ? (
            <div
                onClick={() => toggleDropdown()}
                onKeyDown= {handleKeyDown}
                ref={inputWrapperRef}
                style={{ display: "inline-block" }}
                tabIndex= {0}
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
                    ref:inputWrapperRef
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
                        <Body dark={dark} 
                            paddingLeft={`${selected.label ? "xs" : "none"}`}
                        >
                          {customDisplayPlaceholder}
                        </Body>
                      </Flex>
                    ) : (
                      <Body dark={dark} 
                          text={defaultDisplayPlaceholder} 
                      />
                    )}
                    {autocomplete && (
                      <input
                          className="dropdown_input"
                          onChange={handleChange}
                          onClick={(e) => {
                            e.stopPropagation();// keep the wrapper’s handler from firing
                            toggleDropdown();
                          }}
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
                      dark={dark}
                      display="flex"
                      htmlOptions={{
                        onClick: (e: Event) => {e.stopPropagation();handleWrapperClick()}
                      }}
                      key={`${isDropDownClosed ? "chevron-down" : "chevron-up"}`}
                  >
                    <Icon
                        cursor="pointer"
                        dark={dark}
                        icon={`${isDropDownClosed ? "chevron-down" : "chevron-up"}`}
                        size="sm"
                    />
                  </Body>
              </Flex>
            </>
          )
      }
    </div>
  );
};

export default DropdownTrigger;
