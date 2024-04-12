import React, { useState, useRef, useEffect } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import Body from "../pb_body/_body";

import DropdownContainer from "./subcomponents/DropdownContainer";
import DropdownOption from "./subcomponents/DropdownOption";
import DropdownTrigger from "./subcomponents/DropdownTrigger";
import DropdownContext from "./context";
import useDropdown from "./hooks/useDropdown";

import {
  separateChildComponents,
  prepareComponents,
} from "./utilities/subComponentHelper";
import { GenericObject } from "../types";

type DropdownProps = {
  aria?: { [key: string]: string };
  autocomplete?: boolean;
  className?: string;
  data?: { [key: string]: string };
  id?: string;
  children?: React.ReactChild[] | React.ReactChild;
  options: GenericObject;
  onSelect?: (arg: GenericObject) => null;
};

const Dropdown = (props: DropdownProps) => {
  const {
    aria = {},
    autocomplete = false,
    children,
    className,
    data = {},
    id,
    options,
    onSelect,
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_dropdown"),
    globalProps(props),
    className
  );

  const [isDropDownClosed, setIsDropDownClosed, toggleDropdown] = useDropdown();

  const [filterItem, setFilterItem] = useState("");
  const [selected, setSelected] = useState({});
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasTriggerSubcomponent, setHasTriggerSubcomponent] = useState(true);
  const [hasContainerSubcomponent, setHasContainerSubcomponent] =
    useState(true);

  //state for keyboard events
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const { trigger, container, otherChildren } =
    separateChildComponents(children);

  // useEffect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropDownClosed(true);
        setIsInputFocused(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setHasTriggerSubcomponent(!!trigger);
    setHasContainerSubcomponent(!!container);
  }, []);

  const handleChange = (e: any) => {
    setFilterItem(e.target.value);
    setIsDropDownClosed(false);
  };

  const handleOptionClick = (selectedItem: GenericObject) => {
    setSelected(selectedItem);
    setFilterItem("");
    setIsDropDownClosed(true);
    onSelect(selectedItem);
  };

  const handleWrapperClick = () => {
    autocomplete && inputRef.current.focus();
    toggleDropdown();
  };

  const handleBackspace = () => {
    setSelected({});
    onSelect(null);
    setFocusedOptionIndex(-1);
  };

  const filteredOptions = options?.filter((option: GenericObject) =>
    option.label.toLowerCase().includes(filterItem.toLowerCase())
  );

  const componentsToRender = prepareComponents({
    children,
    hasTriggerSubcomponent,
    hasContainerSubcomponent,
    trigger,
    container,
    otherChildren,
  });

  return (
    <div {...ariaProps} 
        {...dataProps} 
        className={classes} 
        id={id}
    >
      <DropdownContext.Provider
          value={{
              autocomplete,
              filteredOptions,
              filterItem,
              focusedOptionIndex,
              handleBackspace,
              handleChange,
              handleOptionClick,
              handleWrapperClick,
              inputRef,
              isDropDownClosed,
              isInputFocused,
              options,
              selected,
              setFocusedOptionIndex,
              setIsDropDownClosed,
              setIsInputFocused,
              setSelected,
              toggleDropdown,
          }}
      >
        <div className="dropdown_wrapper" 
            ref={dropdownRef}
        >
          {children ? (
            <>
              {componentsToRender.map((component, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
              ))}
            </>
          ) : (
            <>
              <DropdownTrigger />
              <DropdownContainer>
                {options &&
                  options?.map((option: GenericObject) => (
                    <Dropdown.Option key={option.id} 
                        option={option}
                    >
                      <Body text={option.label} />
                    </Dropdown.Option>
                  ))}
              </DropdownContainer>
            </>
          )}
        </div>
      </DropdownContext.Provider>
    </div>
  );
};

Dropdown.Option = DropdownOption;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Container = DropdownContainer;

export default Dropdown;
