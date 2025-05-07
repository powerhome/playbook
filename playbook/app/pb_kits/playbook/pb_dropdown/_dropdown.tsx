import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
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
    dark?: boolean;
    data?: { [key: string]: string };
    defaultValue?: GenericObject;
    error?: string;
    htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
    id?: string;
    isClosed?: boolean;
    label?: string;
    onSelect?: (arg: GenericObject) => null;
    options: GenericObject;
    separators?: boolean;
    variant?: "default" | "subtle";
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
        onSelect,
        options,
        separators = true,
        variant = "default",
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
    const [selected, setSelected] = useState<GenericObject>(defaultValue);
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
    const filteredOptions = optionsWithBlankSelection?.filter((option: GenericObject) => {
        const label = typeof option.label === 'string' ? option.label.toLowerCase() : option.label;
        return String(label).toLowerCase().includes(filterItem.toLowerCase());
    });

    // For keyboard accessibility: Set focus within dropdown to selected item if it exists
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
        onSelect && onSelect(selectedItem);
    };

    const handleWrapperClick = () => {
        autocomplete && inputRef?.current?.focus();
        toggleDropdown();
    };

    const handleBackspace = () => {
        setSelected({});
        onSelect && onSelect(null);
        setFocusedOptionIndex(-1);
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
            setSelected({});
            setFilterItem("");
            setIsDropDownClosed(true);
            onSelect && onSelect(null);
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
