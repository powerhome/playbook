import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { useHandleOnKeyDown } from "../utilities/keyboardAccessibility";

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
};

const DropdownTrigger = (props: DropdownTriggerProps) => {
  const { aria = {}, className, children, customDisplay, data = {}, id } = props;

  const {
    handleWrapperClick,
    selected,
    filterItem,
    handleChange,
    setIsDropDownClosed,
    isDropDownClosed,
    inputRef,
    isInputFocused,
    setIsInputFocused
  } = useContext(DropdownContext);
  
  const handleKeyDown = useHandleOnKeyDown();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_dropdown_trigger"),
    globalProps(props),
    className
  );

  return (
    <div {...ariaProps} 
        {...dataProps} 
        className={classes} 
        id={id}
    >
      {children ? (
        <div
            onClick={() => setIsDropDownClosed(!isDropDownClosed)}
            style={{ display: "inline-block" }}
        >
          {children}
        </div>
      ) : (
        <>
          <Flex align="center"
              borderRadius="lg"
              className={`dropdown_trigger_wrapper ${isInputFocused && 'dropdown_trigger_wrapper_focus'}`}
              cursor="text"
              htmlOptions={{ onClick: () => handleWrapperClick(), tabIndex:"0" }}
              justify="between"
              paddingX="sm"
              paddingY="xs"
          >
            <FlexItem>
                <Flex align="center">
                    {customDisplay ? (
                      <Flex align="center">
                          {customDisplay}
                          <Body paddingLeft="xs">
                              <b>{selected.label}</b>
                          </Body>
                      </Flex>
                      ) : (
                        selected.label && <Body text={selected.label} />
                      )
                    }
                    <input
                        className="dropdown_input"
                        onChange={handleChange}
                        onClick={() => setIsDropDownClosed(!isDropDownClosed)}
                        onFocus={() => setIsInputFocused(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={selected.label ? "" : "Select..."}
                        ref={inputRef}
                        value={filterItem}
                    />
                </Flex>
            </FlexItem>
            <FlexItem>
                <Body color="light" 
                    key={`${isDropDownClosed ? "chevron-down" : 'chevron-up'}`}
                >
                    <Icon cursor="pointer"
                        icon={`${isDropDownClosed ? "chevron-down" : 'chevron-up'}`}
                        size="sm" 
                    />
                </Body>
            </FlexItem>
          </Flex>
        </>
      )}
    </div>
  );
};

export default DropdownTrigger;
