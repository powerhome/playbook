import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { handleOnKeyDown } from "./keyboardAccessibility";

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
    focusedOptionIndex,
    filteredOptions,
    setFocusedOptionIndex,
    handleOptionClick,
    handleBackspace
  } = useContext(DropdownContext);

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
              className="dropdown_trigger_wrapper" 
              cursor="text"
              htmlOptions={{ onClick: () => handleWrapperClick() }}
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
                        onKeyDown={(e) =>
                          handleOnKeyDown({
                            e,
                            focusedOptionIndex,
                            filteredOptions,
                            setFocusedOptionIndex,
                            handleOptionClick,
                            setIsDropDownClosed,
                            handleBackspace
                        })
                        }
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