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
import MultiSelectTriggerDisplay from "./MultiSelectTriggerDisplay";

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
    blankSelection,
    clearable,
    error,
    errorId,
    filterItem,
    handleBackspace,
    handleChange,
    handleWrapperClick,
    inputRef,
    inputWrapperRef,
    isDropDownClosed,
    isInputFocused,
    label: contextLabel,
    multiSelect,
    optionsWithBlankSelection,
    selected,
    selectId,
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
    !autocomplete && !multiSelect && "select_only"
  );

  const selectedArray = Array.isArray(selected)
    ? selected
    : selected && Object.keys(selected).length
    ? [selected]
    : [];

  const joinedLabels = multiSelect
    ? ""
    : selectedArray.map((option) => option.label).join(", ");

  const customDisplayPlaceholder = selected?.label ? (
    ""
  ) : autocomplete ? (
    ""
  ) : placeholder ? (
    placeholder
  ) : (
    "Select..."
  );

  const defaultDisplayPlaceholder = joinedLabels
    ? joinedLabels
    : autocomplete
    ? ""
    : placeholder
    ? placeholder
    : "Select...";

  const triggerAriaLabel = contextLabel
    ? (children ? contextLabel : `${contextLabel}, ${defaultDisplayPlaceholder}`)
    : undefined;

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
                aria-describedby={errorId}
                aria-invalid={!!error}
                aria-label={triggerAriaLabel}
                id={selectId}
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
                    "aria-describedby": errorId,
                    "aria-invalid": !!error,
                    "aria-label": triggerAriaLabel,
                    id: selectId,
                    onClick: () => handleWrapperClick(),
                    onKeyDown: handleKeyDown,
                    tabIndex: "0",
                    ref:inputWrapperRef
                  }}
                  justify="between"
                  paddingX="sm"
                  paddingY="xs"
              >
                <FlexItem fixedSize={multiSelect ? "85%" : ""}>
                  <Flex align="center"
                      wrap
                  >
                    {customDisplay ? (
                      <Flex align="center">
                        {customDisplay}
                        <Body dark={dark} 
                            paddingLeft={`${joinedLabels ? "xs" : "none"}`}
                        >
                          {customDisplayPlaceholder}
                        </Body>
                      </Flex>
                    ) : (
                      multiSelect ? (
                        <>
                        <MultiSelectTriggerDisplay
                            autocomplete={autocomplete}
                            dark={dark}
                            placeholder={placeholder}
                            selected={selectedArray}
                        />
                        {autocomplete && (
                          <input
                              className="dropdown_input"
                              onChange={handleChange}
                              onClick={(e) => {
                                e.stopPropagation();// keep the wrapper’s handler from firing
                                toggleDropdown();
                              }}
                              onFocus={() => setIsInputFocused(true)}
                              onKeyDown={(e) => {
                                 handleKeyDown(e);
                                 e.stopPropagation(); //Fixes issue with keyboard accessibility
                               }}
                              placeholder={
                                joinedLabels
                                  ? ""
                                  : placeholder
                                  ? placeholder
                                  : "Select..."
                              }
                              ref={inputRef}
                              value={filterItem}
                          />
                        )}
                        </>
                      ) : (
                        <Body dark={dark} 
                            text={defaultDisplayPlaceholder} 
                        />
                      )
                    )}
                    {autocomplete && !multiSelect && (
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
                            joinedLabels
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
                <FlexItem>
                  <Body
                      alignItems="center"
                      dark={dark}
                      display="flex"
                      htmlOptions={{
                        onClick: (e: Event) => {e.stopPropagation();handleWrapperClick()}
                      }}
                      key={`${isDropDownClosed ? "chevron-down" : "chevron-up"}`}
                  >
                    {(!blankSelection || selected?.value !== optionsWithBlankSelection?.[0]?.value) && (
                      <>
                        {clearable !== false && selectedArray.length > 0 && (
                          <div onClick={(e)=>{e.stopPropagation();handleBackspace()}}>
                            <Icon
                                cursor="pointer"
                                dark={dark}
                                icon="times"
                                paddingRight="xs"
                                size="sm"
                            />
                          </div>
                        )}
                      </>
                    )}
                    <Icon
                        cursor="pointer"
                        dark={dark}
                        icon={`${isDropDownClosed ? "chevron-down" : "chevron-up"}`}
                        size="sm"
                    />
                  </Body>
                 
                </FlexItem>
              </Flex>
            </>
          )
      }
    </div>
  );
};

export default DropdownTrigger;
