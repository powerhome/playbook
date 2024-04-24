import React, { useState, useRef, useEffect, ReactElement } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import Body from "../pb_body/_body";
import Caption from "../pb_caption/_caption";

import DropdownContainer from "./subcomponents/DropdownContainer";
import DropdownOption from "./subcomponents/DropdownOption";
import DropdownTrigger from "./subcomponents/DropdownTrigger";
import DropdownContext from "./context";
import useDropdown from "./hooks/useDropdown";

import {
  separateChildComponents,
  prepareSubcomponents,
} from "./utilities/subComponentHelper";
import { GenericObject } from "../types";

type DropdownProps = {
  aria?: { [key: string]: string };
  autocomplete?: boolean;
  className?: string;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  children?: React.ReactChild[] | React.ReactChild | ReactElement[];
  label?: string;
  options: GenericObject;
  onSelect?: (arg: GenericObject) => null;
  isClosed?: boolean;
  triggerNone?: boolean;
};

const Dropdown = (props: DropdownProps) => {
  const {
    aria = {},
    autocomplete = false,
    children,
    className,
    data = {},
    htmlOptions = {},
    id,
    label,
    options,
    onSelect,
    isClosed = true,
    triggerNone = false,
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_dropdown"),
    globalProps(props),
    className
  );

  const [isDropDownClosed, setIsDropDownClosed, toggleDropdown] = useDropdown(isClosed);

  const [filterItem, setFilterItem] = useState("");
  const [selected, setSelected] = useState<GenericObject>({});
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasTriggerSubcomponent, setHasTriggerSubcomponent] = useState(true);
  const [hasContainerSubcomponent, setHasContainerSubcomponent] =
    useState(true);

  //state for keyboard events
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const inputWrapperRef = useRef(null);
  const dropdownContainerRef = useRef(null);

  const { trigger, container, otherChildren } =
    separateChildComponents(children);

  // useEffect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if the clicked element or any of its parents have the specified data attribute
      let targetElement = e.target as HTMLElement;
      let shouldClose = true;
  
      while (targetElement && shouldClose) {
        if (targetElement.getAttribute('data-dropdown') === 'pb-dropdown-trigger') {
          shouldClose = false;
        }
        targetElement = targetElement.parentElement as HTMLElement;
      }
      if (
        inputWrapperRef.current && !inputWrapperRef.current.contains(e.target) &&
        (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target)) &&
        shouldClose
      ) {
        setIsDropDownClosed(true);
        setFocusedOptionIndex(-1);
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

// dropdown to toggle with external control
  useEffect(()=> {
    setIsDropDownClosed(isClosed)
   },[isClosed])

  const filteredOptions = options?.filter((option: GenericObject) =>
    option.label.toLowerCase().includes(filterItem.toLowerCase())
  );

  useEffect(() => {
    if (!isDropDownClosed) { 
        let newIndex = 0; 
        if (selected && selected?.label) {
            const selectedIndex = filteredOptions.findIndex((option: GenericObject) => option.label === selected.label);
            if (selectedIndex >= 0) {
                newIndex = selectedIndex;
            }
        }
        setFocusedOptionIndex(newIndex);
    }
}, [isDropDownClosed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const componentsToRender = prepareSubcomponents({
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
        {...htmlProps}
        className={classes} 
        id={id}
    >
      <DropdownContext.Provider
          value={{
              autocomplete,
              dropdownContainerRef,
              filteredOptions,
              filterItem,
              focusedOptionIndex,
              handleBackspace,
              handleChange,
              handleOptionClick,
              handleWrapperClick,
              inputRef,
              inputWrapperRef,
              isDropDownClosed,
              isInputFocused,
              options,
              selected,
              setFocusedOptionIndex,
              setIsDropDownClosed,
              setIsInputFocused,
              setSelected,
              toggleDropdown,
              triggerNone
          }}
      >
        {label &&
        <Caption
            marginBottom="xs"
            text={label}
        />
        }
        <div className="dropdown_wrapper" 
            onBlur={() => {
                // Debounce to delay the execution to prevent jumpiness in Focus state
                setTimeout(() => {
                    if (!dropdownRef.current.contains(document.activeElement)) {
                        setIsInputFocused(false);
                    }
                }, 0);
            }}
            onFocus={() => setIsInputFocused(true)}
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
