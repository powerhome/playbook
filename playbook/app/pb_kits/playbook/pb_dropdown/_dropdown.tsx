import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import { GenericObject } from "../types";

import Body from '../pb_body/_body';
import Caption from "../pb_caption/_caption";

import DropdownContainer from "./subcomponents/DropdownContainer";
import DropdownContext from "./context";
import DropdownOption from "./subcomponents/DropdownOption";
import DropdownTrigger from "./subcomponents/DropdownTrigger";
import useDropdown from "./hooks/useDropdown";

import {
    separateChildComponents,
    prepareSubcomponents,
    handleClickOutside,
} from "./utilities";

type DropdownProps = {
    aria?: { [key: string]: string };
    autocomplete?: boolean;
    blankSelection?: string;
    children?: React.ReactChild[] | React.ReactChild | React.ReactElement[];
    className?: string;
    formPillProps?: GenericObject;
    dark?: boolean;
    data?: { [key: string]: string };
    defaultValue?: GenericObject;
    error?: string;
    htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
    id?: string;
    isClosed?: boolean;
    label?: string;
    multiSelect?: boolean;
    onSelect?: (arg: GenericObject) => null;
    options: GenericObject;
    separators?: boolean;
    variant?: "default" | "subtle";
    activeStyle?: {
      backgroundColor?: string;
      fontColor?: string;
    };
};

interface DropdownComponent
    extends React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<unknown>> {
    Option: typeof DropdownOption;
    Trigger: typeof DropdownTrigger;
    Container: typeof DropdownContainer;
}

let Dropdown = (props: DropdownProps, ref: any): React.ReactElement | null => {
    const {
        aria = {},
        autocomplete = false,
        blankSelection = '',
        children,
        className,
        dark = false,
        data = {},
        defaultValue = {},
        error,
        htmlOptions = {},
        id,
        isClosed = true,
        label,
        multiSelect = false,
        formPillProps,
        onSelect,
        options,
        separators = true,
        variant = "default",
        activeStyle,
    } = props;

    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const separatorsClass = separators ? '' : 'separators_hidden'
    const classes = classnames(
        buildCss("pb_dropdown", variant, separatorsClass),
        globalProps(props),
        className
    );

    const [isDropDownClosed, setIsDropDownClosed, toggleDropdown] = useDropdown(isClosed);

    const [filterItem, setFilterItem] = useState("");
    const initialSelected = useMemo(() => {
      if (multiSelect) {
        if (Array.isArray(defaultValue)) return defaultValue;
        return defaultValue && Object.keys(defaultValue).length
          ? [defaultValue]
          : [];
      }
      return defaultValue || {};
    }, [multiSelect, defaultValue]);

    const [selected, setSelected] = useState<GenericObject | GenericObject[]>(
      initialSelected
    );

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [hasTriggerSubcomponent, setHasTriggerSubcomponent] = useState(true);
    const [hasContainerSubcomponent, setHasContainerSubcomponent] =
        useState(true);
    //state for keyboard events
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

    const dropdownRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputWrapperRef = useRef(null);
    const dropdownContainerRef = useRef(null);

    const selectedArray = Array.isArray(selected)
    ? selected
    : selected && Object.keys(selected).length
    ? [selected]
    : [];

    const { trigger, container, otherChildren } =
        separateChildComponents(children);

    useEffect(() => {
     // Handle clicks outside the dropdown
        const handleClick = handleClickOutside({
            inputWrapperRef,
            dropdownContainerRef,
            setIsDropDownClosed,
            setFocusedOptionIndex,
            setIsInputFocused,
        });

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        setHasTriggerSubcomponent(!!trigger);
        setHasContainerSubcomponent(!!container);
    }, []);

    // dropdown to toggle with external control
    useEffect(() => {
        setIsDropDownClosed(isClosed)
    }, [isClosed])

    const blankSelectionOption: GenericObject = blankSelection ? [{ label: blankSelection, value: "" }] : [];
    const optionsWithBlankSelection = blankSelectionOption.concat(options);

    const availableOptions = useMemo(()=> {
        if (!multiSelect) return optionsWithBlankSelection;
        return optionsWithBlankSelection.filter((option: GenericObject) => !selectedArray.some((sel) => sel.label === option.label));
    }, [optionsWithBlankSelection, selectedArray, multiSelect]);
    
    const filteredOptions = useMemo(() => {
          return availableOptions.filter((opt: GenericObject) =>
            String(opt.label).toLowerCase().includes(filterItem.toLowerCase())
          );
        }, [availableOptions, filterItem]);

    // For keyboard accessibility: Set focus within dropdown to selected item if it exists
    useEffect(() => {
        if (!isDropDownClosed) {
            let newIndex = 0;
            if (selected && !Array.isArray(selected) && selected.label) {
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


      const handleOptionClick = (clickedItem: GenericObject) => {
                if (multiSelect) {
                    setSelected((prev) => {
                       const list = prev as GenericObject[];
                       const exists = list.find((option) => option.value === clickedItem.value);
                       const next = exists
                       ? list.filter((option) => option.value !== clickedItem.value)
                           : [...list, clickedItem];
                   onSelect && onSelect(next);
                       return next;
                   });
                   setFilterItem("");
                   setIsDropDownClosed(true);
               } else {
                   setSelected(clickedItem);
                   setFilterItem("");
                   setIsDropDownClosed(true);
                   onSelect && onSelect(clickedItem);
            }
             };

    const handleWrapperClick = () => {
        autocomplete && inputRef?.current?.focus();
        toggleDropdown();
    };

    const handleBackspace = () => {
      if (multiSelect) {
        setSelected([]);
        onSelect && onSelect([]);
      } else {
        setSelected({});
        onSelect && onSelect(null);
        setFocusedOptionIndex(-1);
      }
    };

    const componentsToRender = prepareSubcomponents({
        children,
        hasTriggerSubcomponent,
        hasContainerSubcomponent,
        trigger,
        container,
        otherChildren,
        dark
    });

    useImperativeHandle(ref, () => ({
      clearSelected: () => {
        if (multiSelect) {
          setSelected([]);
          onSelect && onSelect([]);
        } else {
          setSelected({});
          onSelect && onSelect(null);
        }
        setFilterItem("");
        setIsDropDownClosed(true);
      },
    }));

    return (
        <div {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
            style={{position: "relative"}}
        >
            <DropdownContext.Provider
                value={{
                    activeStyle,
                    autocomplete,
                    dropdownContainerRef,
                    filteredOptions,
                    filterItem,
                    focusedOptionIndex,
                    formPillProps,
                    handleBackspace,
                    handleChange,
                    handleOptionClick,
                    handleWrapperClick,
                    inputRef,
                    inputWrapperRef,
                    isDropDownClosed,
                    isInputFocused,
                    multiSelect,
                    onSelect,
                    optionsWithBlankSelection,
                    selected,
                    setFocusedOptionIndex,
                    setIsDropDownClosed,
                    setIsInputFocused,
                    setSelected,
                    toggleDropdown
                }}
            >
                {label &&
                    <Caption
                        dark={dark}
                        marginBottom="xs"
                        text={label}
                    />
                }
                <div className={`dropdown_wrapper ${error ? 'error' : ''}`}
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
                                {optionsWithBlankSelection &&
                                    optionsWithBlankSelection?.map((option: GenericObject) => (
                                        <DropdownOption key={option.id}
                                            option={option}
                                        />
                                    ))}
                            </DropdownContainer>
                        </>
                    )}

                    {error &&
                        <Body
                            status="negative"
                            text={error}
                        />
                    }
                </div>
            </DropdownContext.Provider>
        </div>
    )
}

Dropdown = forwardRef(Dropdown) as unknown as DropdownComponent;
(Dropdown as DropdownComponent).displayName = "Dropdown";
(Dropdown as DropdownComponent).Option = DropdownOption;
(Dropdown as DropdownComponent).Trigger = DropdownTrigger;
(Dropdown as DropdownComponent).Container = DropdownContainer;

export default Dropdown;
