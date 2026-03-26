import React, { useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import { GenericObject } from "../types";

import Body from '../pb_body/_body';
import Caption from "../pb_caption/_caption";
import colors from "../tokens/exports/_colors.module.scss";

import DropdownContainer from "./subcomponents/DropdownContainer";
import DropdownContext from "./context";
import DropdownOption from "./subcomponents/DropdownOption";
import DropdownTrigger from "./subcomponents/DropdownTrigger";
import useDropdown from "./hooks/useDropdown";
import getQuickPickOptions from "./quickpick";

import {
    separateChildComponents,
    prepareSubcomponents,
    handleClickOutside,
} from "./utilities";

import { usePopoverBodyContext } from "../pb_popover/popover_body_context";

type CustomQuickPickDate = {
    label: string;
    value: string[] | { timePeriod: string; amount: number };
};

type CustomQuickPickDates = {
    override?: boolean;
    dates: CustomQuickPickDate[];
};

type DropdownProps = {
    aria?: { [key: string]: string };
    autocomplete?: boolean;
    blankSelection?: string;
    children?: React.ReactChild[] | React.ReactChild | React.ReactElement[];
    className?: string;
    clearable?: boolean;
    closeOnClick?: "outside" | "inside" | "any";
    constrainHeight?: boolean;
    customQuickPickDates?: CustomQuickPickDates;
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
    options?: GenericObject;
    placeholder?: string;
    separators?: boolean;
    variant?: "default" | "subtle" | "quickpick";
    rangeEndsToday?: boolean;
    controlsStartId?: string;
    controlsEndId?: string;
    activeStyle?: {
      backgroundColor?: string;
      fontColor?: string;
    };
    requiredIndicator?: boolean;
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
        clearable = true,
        closeOnClick = "any",
        constrainHeight = false,
        customQuickPickDates,
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
        placeholder,
        rangeEndsToday = false,
        controlsStartId,
        controlsEndId,
        separators = true,
        variant = "default",
        activeStyle,
        requiredIndicator = false
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
    // ------------- Quick Pick ---------------------------------
    // Use QuickPick options when variant is "quickpick"
    const dropdownOptions = variant === "quickpick" 
        ? getQuickPickOptions(rangeEndsToday, customQuickPickDates) 
        : (options || []);
    // ----------------------------------------------------------

    const [isDropDownClosed, setIsDropDownClosed, toggleDropdown] = useDropdown(isClosed);

    // Use a suffix for the trigger ID to avoid conflict with the outer div's id
    const sanitizeForId = (str: string) =>
      str.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    const selectId = id
      ? `${id}_trigger`
      : label
        ? sanitizeForId(label)
        : undefined;
    const errorId = error ? `${selectId}-error` : undefined;

    const [filterItem, setFilterItem] = useState("");
    const initialSelected = useMemo(() => {
      // Handle quickpick variant with string defaultValue (e.g., "This Month")
      if (variant === "quickpick" && typeof defaultValue === "string" && defaultValue) {
        const matchedOption = dropdownOptions.find(
          (opt: GenericObject) => opt.label?.toLowerCase() === (defaultValue as string).toLowerCase()
        );
        return matchedOption || {};
      }
      
      if (multiSelect) {
        if (Array.isArray(defaultValue)) return defaultValue;
        return defaultValue && Object.keys(defaultValue).length
          ? [defaultValue]
          : [];
      }
      return defaultValue || {};
    }, [multiSelect, defaultValue, variant, dropdownOptions]);

    const [selected, setSelected] = useState<GenericObject | GenericObject[]>(
      initialSelected
    );

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [hasTriggerSubcomponent, setHasTriggerSubcomponent] = useState(true);
    const [hasContainerSubcomponent, setHasContainerSubcomponent] =
        useState(true);
    //state for keyboard events
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputWrapperRef = useRef<HTMLDivElement | null>(null);
    const dropdownContainerRef = useRef<HTMLDivElement | null>(null);

    const handleLabelClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (selectId) {
        const trigger = document.getElementById(selectId);
        if (trigger) trigger.focus();
      }
      setIsInputFocused(true);
      toggleDropdown();
    };

    const selectedArray = Array.isArray(selected)
    ? selected
    : selected && Object.keys(selected).length
    ? [selected]
    : [];

    const { trigger, container, otherChildren } =
        separateChildComponents(children);

    const popoverBody = usePopoverBodyContext();
    const shouldPortalMenu =
      popoverBody != null && variant === "default" && !children;

    const [scrollTick, setScrollTick] = useState(0);

    useEffect(() => {
     // Handle clicks outside the dropdown
        const handleClick = handleClickOutside({
            inputWrapperRef,
            dropdownContainerRef,
            setIsDropDownClosed,
            setFocusedOptionIndex,
            setIsInputFocused,
            closeOnClick,
        });

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [closeOnClick]);

    useEffect(() => {
        setHasTriggerSubcomponent(!!trigger);
        setHasContainerSubcomponent(!!container);
    }, []);

    // dropdown to toggle with external control
    useEffect(() => {
        setIsDropDownClosed(isClosed)
    }, [isClosed])

    const blankSelectionOption: GenericObject = blankSelection ? [{ label: blankSelection, value: "" }] : [];
    const optionsWithBlankSelection = blankSelectionOption.concat(dropdownOptions);

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

    // Auto-position dropdown above/below; when portaled into Popover scroll shell, align to outer body.
    // When the menu is portaled it is no longer under `.dropdown_wrapper`, so `closest()` would fail—use
    // `dropdownRef` (the wrapper) for trigger geometry in both cases.
    useLayoutEffect(() => {
        if (isDropDownClosed || !dropdownContainerRef.current) return;
        const container = dropdownContainerRef.current as HTMLElement;
        const wrapper =
            (dropdownRef.current as HTMLElement | null) ||
            (container.closest(".dropdown_wrapper") as HTMLElement | null);
        if (!wrapper) return;

        if (shouldPortalMenu && popoverBody?.bodyRef?.current) {
            const body = popoverBody.bodyRef.current;
            const br = body.getBoundingClientRect();
            const wr = wrapper.getBoundingClientRect();
            const h = container.getBoundingClientRect().height || container.scrollHeight;
            const spaceBelow = window.innerHeight - wr.bottom;
            const spaceAbove = wr.top;

            container.style.position = "absolute";
            container.style.left = `${wr.left - br.left}px`;
            container.style.width = `${wr.width}px`;
            container.style.marginTop = "0";
            container.style.marginBottom = "0";
            container.style.zIndex = "2";

            if (spaceBelow < h + 10 && spaceAbove >= h + 10) {
                container.style.top = "auto";
                container.style.bottom = `${br.bottom - wr.top + 5}px`;
            } else {
                container.style.top = `${wr.bottom - br.top}px`;
                container.style.bottom = "auto";
            }
            return;
        }

        const wrapperRect = wrapper.getBoundingClientRect();
        const h = container.getBoundingClientRect().height || container.scrollHeight;
        const spaceBelow = window.innerHeight - wrapperRect.bottom;
        const spaceAbove = wrapperRect.top;

        if (spaceBelow < h + 10 && spaceAbove >= h + 10) {
            container.style.top = "auto";
            container.style.bottom = "calc(100% + 5px)";
            container.style.marginTop = "0";
            container.style.marginBottom = "0";
        } else {
            container.style.top = "";
            container.style.bottom = "";
            container.style.marginTop = "";
            container.style.marginBottom = "";
        }
    }, [
        isDropDownClosed,
        shouldPortalMenu,
        popoverBody,
        scrollTick,
    ]);

    useEffect(() => {
        if (!shouldPortalMenu || !popoverBody?.scrollRef?.current || isDropDownClosed) return;
        const el = popoverBody.scrollRef.current;
        const onScroll = () => setScrollTick((n) => n + 1);
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [shouldPortalMenu, popoverBody?.scrollRef, isDropDownClosed]);

    useEffect(() => {
        if (!shouldPortalMenu || isDropDownClosed) return;
        const onResize = () => setScrollTick((n) => n + 1);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [shouldPortalMenu, isDropDownClosed]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterItem(e.target.value);
        setIsDropDownClosed(false);
    };


      const handleOptionClick = (clickedItem: GenericObject) => {
                const shouldCloseOnClick = closeOnClick === "any" || closeOnClick === "inside";
                
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
                   if (shouldCloseOnClick) {
                       setIsDropDownClosed(true);
                   }
               } else {
                   setSelected(clickedItem);
                   setFilterItem("");
                   if (shouldCloseOnClick) {
                       setIsDropDownClosed(true);
                   }
                   onSelect && onSelect(clickedItem);
                   
                   // Sync with DatePickers if this is a quickpick variant
                   if (variant === "quickpick" && Array.isArray(clickedItem.value)) {
                       const [start, end] = clickedItem.value;
                       
                       if (controlsStartId) {
                           const startPicker = (document.querySelector(`#${controlsStartId}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
                           startPicker?.setDate(start, true);
                       }
                       
                       if (controlsEndId) {
                           const endPicker = (document.querySelector(`#${controlsEndId}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
                           endPicker?.setDate(end, true);
                       }
                   }
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
        
        // Clear linked DatePickers as well if this is a quickpick variant with controls
        if (variant === "quickpick") {
          if (controlsStartId) {
            const startPicker = (document.querySelector(`#${controlsStartId}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
            startPicker?.clear();
          }
          
          if (controlsEndId) {
            const endPicker = (document.querySelector(`#${controlsEndId}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
            endPicker?.clear();
          }
        }
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

    // Create an internal ref object that holds the imperative handle methods
    const imperativeRef = useRef({
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
    });

    // Update imperativeRef whenever dependencies change
    // (needed for external clearing of normal Dropdown + DatePicker-synced QuickPick Dropdown)
    useEffect(() => {
      imperativeRef.current = {
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
      };
    }, [multiSelect, onSelect, setSelected, setFilterItem, setIsDropDownClosed]);

    useImperativeHandle(ref, () => imperativeRef.current);

    // Create a ref to the outer div to attach the dropdown ref for DatePicker sync
    const outerDivRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      // Attach the ref to the DOM element so DatePicker can access it
      if (outerDivRef.current && variant === "quickpick" && id) {
        (outerDivRef.current as any)._dropdownRef = imperativeRef;
      }
    }, [variant, id]);

    // Sync defaultValue with DatePickers on mount when 3 input pattern is used
    useEffect(() => {
      if (variant === "quickpick" && initialSelected && typeof initialSelected === "object" && !Array.isArray(initialSelected)) {
        const value = initialSelected.value;
        
        if (Array.isArray(value) && value.length === 2) {
          const [start, end] = value;
          
          // Wait for DatePickers to be initialized
          setTimeout(() => {
            if (controlsStartId) {
              const startPicker = (document.querySelector(`#${controlsStartId}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
              startPicker?.setDate(start, true);
            }
            
            if (controlsEndId) {
              const endPicker = (document.querySelector(`#${controlsEndId}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
              endPicker?.setDate(end, true);
            }
          }, 0);
        }
      }
    }, [variant, initialSelected, controlsStartId, controlsEndId]);

    return (
        <div {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
            ref={outerDivRef}
            style={{position: "relative"}}
        >
            <DropdownContext.Provider
                value={{
                    activeStyle,
                    autocomplete,
                    blankSelection,
                    clearable,
                    dropdownContainerRef,
                    menuPortaled: shouldPortalMenu,
                    portaledVariant: variant,
                    error,
                    errorId,
                    filterItem,
                    filteredOptions,
                    focusedOptionIndex,
                    label,
                    formPillProps,
                    handleBackspace,
                    handleChange,
                    handleOptionClick,
                    handleWrapperClick,
                    inputRef,
                    inputWrapperRef,
                    isDropDownClosed,
                    isInputFocused,
                    selectId,
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
                {label && (
                  <label
                      data-dropdown="pb-dropdown-label"
                      htmlFor={selectId}
                      onClick={handleLabelClick}
                  >
                    {requiredIndicator ? (
                      <Caption
                          className="pb_dropdown_kit_label"
                          color="lighter"
                          dark={dark}
                          marginBottom="xs"
                      >
                        {label} <span style={{ color: `${colors.error}` }}>*</span>
                      </Caption>
                    ) : (
                      <Caption
                          className="pb_dropdown_kit_label"
                          color="lighter"
                          dark={dark}
                          marginBottom="xs"
                          text={label}
                      />
                    )}
                  </label>
                )}
                <div className={`dropdown_wrapper ${error ? 'error' : ''}`}
                    onBlur={() => {
                        setTimeout(() => {
                            const active = document.activeElement as Node | null;
                            const inWrapper = dropdownRef.current?.contains(active);
                            const inMenu = dropdownContainerRef.current?.contains(active);
                            if (!inWrapper && !inMenu) {
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
                            <DropdownTrigger placeholder={placeholder} />
                            {shouldPortalMenu &&
                            popoverBody?.bodyRef?.current &&
                            !isDropDownClosed
                              ? ReactDOM.createPortal(
                                  <DropdownContainer constrainHeight={constrainHeight}>
                                    {optionsWithBlankSelection &&
                                      optionsWithBlankSelection?.map(
                                        (option: GenericObject) => (
                                          <DropdownOption
                                              key={option.id}
                                              option={option}
                                          />
                                        )
                                      )}
                                  </DropdownContainer>,
                                  popoverBody.bodyRef.current
                                )
                              : !shouldPortalMenu ? (
                                  <DropdownContainer constrainHeight={constrainHeight}>
                                    {optionsWithBlankSelection &&
                                      optionsWithBlankSelection?.map(
                                        (option: GenericObject) => (
                                          <DropdownOption
                                              key={option.id}
                                              option={option}
                                          />
                                        )
                                      )}
                                  </DropdownContainer>
                                ) : null}
                        </>
                    )}

                    {error && (
                        <Body
                            aria={{ atomic: "true", live: "polite" }}
                            dark={dark}
                            htmlOptions={{ role: "alert" }}
                            id={errorId}
                            status="negative"
                            text={error}
                        />
                    )}
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
