import React, { useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle, useMemo, useContext, useCallback } from "react";
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
import useAsyncOptions, { LoadOptions } from "./hooks/useAsyncOptions";
import getQuickPickOptions from "./quickpick";

import {
    separateChildComponents,
    prepareSubcomponents,
    handleClickOutside,
} from "./utilities";

import { DialogContext } from "../pb_dialog/_dialog_context";
import {
    resolveFloatingOwnerId,
    resolvePortaledKitHost,
    positionDropdownPortalToWrapper,
    subscribeFloatingKitReposition,
} from "../utilities/floatingPortalHosts";
        
function serializeDropdownFilterResetDefault(
    variant: "default" | "subtle" | "quickpick" | undefined,
    multiSelect: boolean,
    defaultValue: GenericObject | GenericObject[] | string | undefined,
    dropdownOptions: GenericObject[] | GenericObject | undefined,
): string | undefined {
    const optionList: GenericObject[] = Array.isArray(dropdownOptions)
        ? dropdownOptions
        : [];
    const optionDefaultId = (option: GenericObject | undefined): string | undefined => {
        if (!option) return undefined;

        const id = option.id;
        if (id != null && id !== "") return String(id);

        const matched = optionList.find((listOption: GenericObject) => (
            (option.value != null && listOption.value === option.value) ||
            (option.label != null && listOption.label === option.label)
        ));

        if (matched?.id != null && matched.id !== "") return String(matched.id);
        return undefined;
    };

    if (variant === "quickpick") {
        if (typeof defaultValue === "string" && defaultValue) {
            const matched = optionList.find(
                (opt: GenericObject) => opt.label?.toLowerCase() === defaultValue.toLowerCase()
            );
            if (matched?.id != null && matched.id !== "") return String(matched.id);
        }
        return undefined;
    }
    if (multiSelect) {
        const arr = Array.isArray(defaultValue)
            ? defaultValue
            : defaultValue && typeof defaultValue === "object" && Object.keys(defaultValue).length
                ? [defaultValue as GenericObject]
                : [];
        if (!arr.length) return undefined;
        const ids = arr
            .map((v) => optionDefaultId(v as GenericObject))
            .filter((id) => id != null && id !== "");
        return ids.length ? ids.join(",") : undefined;
    }
    if (defaultValue && typeof defaultValue === "object" && !Array.isArray(defaultValue)) {
        const id = optionDefaultId(defaultValue as GenericObject);
        if (id) return id;
    }
    return undefined;
}

type CustomQuickPickDate = {
    label: string;
    value: string[] | { timePeriod: string; amount: number };
};

type CustomQuickPickDates = {
    override?: boolean;
    dates: CustomQuickPickDate[];
};

type InputChangeReason = "input" | "clear" | "reset";

type DropdownProps = {
    aria?: { [key: string]: string };
    async?: boolean;
    loadOptions?: LoadOptions;
    defaultOptions?: boolean | GenericObject[];
    cacheOptions?: boolean;
    cacheKey?: string | number;
    loading?: boolean;
    onInputChange?: (input: string, detail: { reason: InputChangeReason }) => void;
    resetOnFormReset?: boolean;
    value?: GenericObject | GenericObject[] | null;
    getOptionLabel?: (option: GenericObject) => string;
    renderValue?: (option: GenericObject) => React.ReactNode;
    loadingMessage?: string;
    noOptionsMessage?: string;
    errorMessage?: string;
    getOptionValue?: (option: GenericObject) => string | number;
    renderOption?: (option: GenericObject) => React.ReactNode;
    searchDebounceTimeout?: number;
    searchTermMinimumLength?: number;
    autocomplete?: boolean;
    blankSelection?: string;
    children?: React.ReactChild[] | React.ReactChild | React.ReactElement[];
    className?: string;
    clearable?: boolean;
    closeOnClick?: "outside" | "inside" | "any";
    constrainHeight?: boolean;
    customQuickPickDates?: CustomQuickPickDates;
    disabled?: boolean;
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
    name?: string;
    onChange?: (event: { target: { name?: string; value: any } }) => void;
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
        async = false,
        loadOptions,
        defaultOptions = false,
        cacheOptions = false,
        cacheKey,
        loading = false,
        onInputChange,
        resetOnFormReset = false,
        renderOption,
        value,
        getOptionValue,
        getOptionLabel,
        renderValue,
        loadingMessage = "Loading…",
        noOptionsMessage = "No results found",
        errorMessage = "Unable to load options",
        searchDebounceTimeout = 250,
        searchTermMinimumLength = 3,
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
        disabled = false,
        error,
        htmlOptions = {},
        id,
        isClosed = true,
        label,
        multiSelect = false,
        formPillProps,
        name,
        onChange,
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
        disabled && "disabled",
        globalProps(props),
        className
    );

    const floatingShellClasses = useMemo(
        () => classnames(classes, "pb_dropdown_floating_shell"),
        [classes],
    );

    const asyncEnabled = async && variant !== "quickpick";
    const { options: loadedOptions, status: asyncStatus, search: searchAsync, cancel: cancelAsync, clear: clearAsync } = useAsyncOptions(asyncEnabled && !!loadOptions && !disabled, loadOptions, searchTermMinimumLength, searchDebounceTimeout, defaultOptions, cacheOptions, cacheKey);

    // ------------- Quick Pick ---------------------------------
    // Use QuickPick options when variant is "quickpick"
    const dropdownOptions = variant === "quickpick" 
        ? getQuickPickOptions(rangeEndsToday, customQuickPickDates) 
        : (asyncEnabled && loadOptions ? loadedOptions : options || []);
    // ----------------------------------------------------------

    const [isDropDownClosed, setIsDropDownClosed, toggleDropdown] = useDropdown(disabled ? true : isClosed);

    const previouslyClosed = useRef(isDropDownClosed);
    useEffect(() => {
      if (asyncEnabled && (disabled || (!previouslyClosed.current && isDropDownClosed))) cancelAsync();
      previouslyClosed.current = isDropDownClosed;
    }, [asyncEnabled, isDropDownClosed, disabled, cancelAsync]);

    // Use a suffix for the trigger ID to avoid conflict with the outer div's id
    const sanitizeForId = (str: string) =>
      str.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    const selectId = id
      ? `${id}_trigger`
      : label
        ? sanitizeForId(label)
        : undefined;
    const errorId = error ? `${selectId}-error` : undefined;

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

    const [internalSelected, setInternalSelected] = useState<GenericObject | GenericObject[]>(
      initialSelected
    );

    const optionLabel = useCallback((option: GenericObject) => {
      if (!getOptionLabel) return option?.label;
      return option && !Array.isArray(option) && Object.keys(option).length ? getOptionLabel(option) : "";
    }, [getOptionLabel]);

    const isControlled = value !== undefined;
    const selected = isControlled ? (value ?? (multiSelect ? [] : {})) : internalSelected;
    const setSelected: React.Dispatch<React.SetStateAction<GenericObject | GenericObject[]>> = (next) => {
      if (!isControlled) setInternalSelected(next);
    };
    const isSameOption = useCallback((left: GenericObject, right: GenericObject, legacyKey = "label") => {
      if (!getOptionValue) return getOptionLabel && legacyKey === "label"
        ? optionLabel(left) === optionLabel(right)
        : left?.[legacyKey] === right?.[legacyKey];
      if (!left || !right || !Object.keys(left).length || !Object.keys(right).length) return false;
      return String(getOptionValue(left)) === String(getOptionValue(right));
    }, [getOptionValue, getOptionLabel, optionLabel]);

    // Autocomplete displays the selection in the input; seed from defaultValue
    const [filterItem, setFilterItem] = useState(() => {
      if (!autocomplete || multiSelect) return "";
      if (Array.isArray(selected)) return "";
      return optionLabel(selected as GenericObject) || "";
    });

    // Form adapters may recreate equivalent option objects on every render.
    // Synchronize the query only when selection identity or display text changes.
    const controlledSelectionKey = isControlled ? JSON.stringify(
      (Array.isArray(value) ? value : value && Object.keys(value).length ? [value] : [])
        .map((option) => [
          String(getOptionValue ? getOptionValue(option) : option.id ?? option.value ?? option.label),
          optionLabel(option),
        ])
    ) : undefined;
    const controlledLabel = !multiSelect && value && !Array.isArray(value) ? optionLabel(value) || "" : "";

    useEffect(() => {
      if (isControlled && autocomplete) {
        setFilterItem(controlledLabel);
      }
    }, [isControlled, controlledSelectionKey, controlledLabel, autocomplete, multiSelect]);

    const filterResetDefaultSerialized = useMemo(
        () => serializeDropdownFilterResetDefault(variant, multiSelect, defaultValue, dropdownOptions),
        [variant, multiSelect, defaultValue, dropdownOptions]
    );

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [hasTriggerSubcomponent, setHasTriggerSubcomponent] = useState(true);
    const [hasContainerSubcomponent, setHasContainerSubcomponent] =
        useState(true);
    //state for keyboard events
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

    const dropdownRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputWrapperRef = useRef<HTMLDivElement | null>(null);
    const dropdownContainerRef = useRef(null);
    const outerDivRef = useRef<HTMLDivElement>(null);

    const dialogCtx = useContext(DialogContext);
    const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);
    const [floatingOwnerId, setFloatingOwnerId] = useState<string | null>(null);

    useLayoutEffect(() => {
        if (isDropDownClosed) {
            setPortalHost(null);
            setFloatingOwnerId(null);
            return;
        }
        const root = outerDivRef.current;
        setFloatingOwnerId(resolveFloatingOwnerId(root));
        setPortalHost(
            resolvePortaledKitHost(
                root,
                dialogCtx?.selectMenuPortalTarget ?? null,
            ),
        );
    }, [isDropDownClosed, dialogCtx?.selectMenuPortalTarget]);

    const handleLabelClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
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

    const selectedOptionIds = useMemo(() => (
      multiSelect && getOptionValue
        ? new Set(selectedArray.map((option) => String(getOptionValue(option))))
        : null
    ), [multiSelect, getOptionValue, selectedArray]);

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
        setIsDropDownClosed(disabled ? true : isClosed)
    }, [disabled, isClosed])

    const blankSelectionOption: GenericObject = blankSelection ? [{ label: blankSelection, value: "" }] : [];
    const optionsWithBlankSelection = blankSelectionOption.concat(dropdownOptions);

    const availableOptions = useMemo(()=> {
        if (!multiSelect) return optionsWithBlankSelection;
        if (selectedOptionIds) {
          return optionsWithBlankSelection.filter((option: GenericObject) => !selectedOptionIds.has(String(getOptionValue(option))));
        }
        return optionsWithBlankSelection.filter((option: GenericObject) => !selectedArray.some((sel) => isSameOption(sel, option)));
    }, [optionsWithBlankSelection, selectedArray, multiSelect, isSameOption, selectedOptionIds, getOptionValue]);
    
    const filteredOptions = useMemo(() => {
          if (asyncEnabled) return availableOptions;
          // When the input shows the selected label, do not filter the list down to that one option
          const selectedLabel =
            !multiSelect &&
            !Array.isArray(selected) &&
            optionLabel(selected as GenericObject);
          const filterText =
            selectedLabel && filterItem === selectedLabel ? "" : filterItem;
          return availableOptions.filter((opt: GenericObject) =>
            String(optionLabel(opt)).toLowerCase().includes(filterText.toLowerCase())
          );
        }, [availableOptions, filterItem, multiSelect, selected, asyncEnabled, optionLabel]);

    // For keyboard accessibility: Set focus within dropdown to selected item if it exists
    useEffect(() => {
        if (!isDropDownClosed) {
            let newIndex = 0;
            if (selected && !Array.isArray(selected) && optionLabel(selected)) {
                const selectedIndex = filteredOptions.findIndex((option: GenericObject) => isSameOption(option, selected));
                if (selectedIndex >= 0) {
                    newIndex = selectedIndex;
                }
            }
            setFocusedOptionIndex(newIndex);
        }
    }, [isDropDownClosed]);

    // Auto-position dropdown above/below based on available space or fixed/absolute when portaled to body / floating root
    useLayoutEffect(() => {
        if (isDropDownClosed || !dropdownContainerRef.current || !dropdownRef.current) {
            return;
        }

        const container = dropdownContainerRef.current as HTMLElement;
        const wrapper = dropdownRef.current as HTMLElement;

        if (portalHost) {
            const applyPortalPosition = () => {
                const panel = dropdownContainerRef.current as HTMLElement | null;
                const wrap = dropdownRef.current as HTMLElement | null;
                if (!panel || !wrap) {
                    return;
                }
                positionDropdownPortalToWrapper({
                    panel,
                    wrapperViewportRect: wrap.getBoundingClientRect(),
                    positionHost: portalHost,
                });
            };
            applyPortalPosition();
            const raf = window.requestAnimationFrame(applyPortalPosition);
            const unsubscribeReposition = subscribeFloatingKitReposition(applyPortalPosition);
            return () => {
                window.cancelAnimationFrame(raf);
                unsubscribeReposition();
            };
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
        portalHost,
        filteredOptions,
        constrainHeight,
        filterItem,
    ]);


    const handleSelectionChange = (value: any) => {
        onSelect && onSelect(value);
        onChange && onChange({ target: { name, value } });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (asyncEnabled) {
          searchAsync(e.target.value);
          setFocusedOptionIndex(-1);
        }
        if ((asyncEnabled || onInputChange) && !e.target.value && autocomplete && !multiSelect && selectedArray.length) {
          setSelected({});
          handleSelectionChange(null);
        }
        setFilterItem(e.target.value);
        onInputChange?.(e.target.value, { reason: "input" });
        setIsDropDownClosed(false);
    };


      const handleOptionClick = (clickedItem: GenericObject) => {
                if (disabled) return;
                if (asyncEnabled) cancelAsync();
                const shouldCloseOnClick = closeOnClick === "any" || closeOnClick === "inside";
                
                if (multiSelect) {
                  if (isControlled || getOptionValue) {
                    const exists = selectedOptionIds
                      ? selectedOptionIds.has(String(getOptionValue(clickedItem)))
                      : selectedArray.some((option) => isSameOption(option, clickedItem, "value"));
                    const next = exists
                      ? selectedArray.filter((option) => !isSameOption(option, clickedItem, "value"))
                      : [...selectedArray, clickedItem];
                    setSelected(next);
                    handleSelectionChange(next);
                  } else {
                    setSelected((prev) => {
                       const list = prev as GenericObject[];
                       const exists = list.find((option) => isSameOption(option, clickedItem, "value"));
                       const next = exists
                       ? list.filter((option) => !isSameOption(option, clickedItem, "value"))
                           : [...list, clickedItem];
                   handleSelectionChange(next);
                       return next;
                   });
                  }
                   setFilterItem(isControlled && !multiSelect ? optionLabel(selected as GenericObject) || "" : "");
                   if (shouldCloseOnClick) {
                       setIsDropDownClosed(true);
                   }
               } else {
                   setSelected(clickedItem);
                   setFilterItem(isControlled && !multiSelect ? optionLabel(selected as GenericObject) || "" : "");
                   if (shouldCloseOnClick) {
                       setIsDropDownClosed(true);
                   }
                   handleSelectionChange(clickedItem);
                   
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
        if (disabled) return;
        autocomplete && inputRef?.current?.focus();
        toggleDropdown();
    };

    const handleBackspace = () => {
      if (disabled) return;
      if (asyncEnabled) clearAsync();
      onInputChange?.("", { reason: "clear" });
      if ((onInputChange || asyncEnabled) && multiSelect) setFilterItem("");
      if (multiSelect) {
        setSelected([]);
        handleSelectionChange([]);
      } else {
        setSelected({});
        handleSelectionChange(null);
        setFocusedOptionIndex(-1);
        setFilterItem(isControlled && !multiSelect ? optionLabel(selected as GenericObject) || "" : "");
        
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
      clearSelected: (reason: "clear" | "reset" = "clear") => {
          if (asyncEnabled) clearAsync();
          onInputChange?.("", { reason });
        if (multiSelect) {
          setSelected([]);
          handleSelectionChange([]);
        } else {
          setSelected({});
          handleSelectionChange(null);
        }
        setFilterItem(isControlled && !multiSelect ? optionLabel(selected as GenericObject) || "" : "");
        setIsDropDownClosed(true);
      },
    });

    // Update imperativeRef whenever dependencies change
    // (needed for external clearing of normal Dropdown + DatePicker-synced QuickPick Dropdown)
    useEffect(() => {
      imperativeRef.current = {
        clearSelected: (reason: "clear" | "reset" = "clear") => {
          if (asyncEnabled) clearAsync();
          onInputChange?.("", { reason });
          if (multiSelect) {
            setSelected([]);
            handleSelectionChange([]);
          } else {
            setSelected({});
            handleSelectionChange(null);
          }
          setFilterItem(isControlled && !multiSelect ? optionLabel(selected as GenericObject) || "" : "");
          setIsDropDownClosed(true);
        },
      };
    }, [multiSelect, handleSelectionChange, setSelected, setFilterItem, setIsDropDownClosed, asyncEnabled, clearAsync, onInputChange]);

    useImperativeHandle(ref, () => imperativeRef.current);

    useEffect(() => {
      if (!resetOnFormReset) return;
      const form = outerDivRef.current?.closest("form");
      if (!form) return;
      let mounted = true;
      const handleReset = (event: Event) => {
        Promise.resolve().then(() => {
          if (mounted && !event.defaultPrevented) imperativeRef.current.clearSelected("reset");
        });
      };
      form.addEventListener("reset", handleReset);
      return () => {
        mounted = false;
        form.removeEventListener("reset", handleReset);
      };
    }, [resetOnFormReset]);


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
            {...(filterResetDefaultSerialized ? { "data-default-value": filterResetDefaultSerialized } : {})}
            aria-busy={asyncEnabled ? (loading || asyncStatus === "loading") : undefined}
            className={classes}
            id={id}
            ref={outerDivRef}
            style={{position: "relative"}}
        >
            <DropdownContext.Provider
                value={{
                    asyncEnabled,
                    asyncStatus: asyncEnabled ? (loading || asyncStatus === "loading" ? loadingMessage : asyncStatus === "error" ? errorMessage : asyncStatus === "empty" ? noOptionsMessage : "") : "",
                    renderOption,
                    renderValue,
                    optionLabel,
                    isControlled,
                    onInputChange,
                    isSameOption,
                    selectedOptionIds,
                    getOptionValue,
                    activeStyle,
                    autocomplete,
                    blankSelection,
                    clearable,
                    dropdownContainerRef,
                    disabled,
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
                    handleSelectionChange,
                    handleWrapperClick,
                    inputRef,
                    inputWrapperRef,
                    isDropDownClosed,
                    isInputFocused,
                    floatingOwnerId,
                    floatingShellClasses,
                    portalHost,
                    selectId,
                    multiSelect,
                    onSelect,
                    optionsWithBlankSelection,
                    selected,
                    setFilterItem,
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
                        // Debounce to delay the execution to prevent jumpiness in Focus state
                        setTimeout(() => {
                            const active = document.activeElement;
                            if (!active) {
                                setIsInputFocused(false);
                                return;
                            }
                            const inTrigger = dropdownRef.current?.contains(active);
                            const inMenu =
                                dropdownContainerRef.current?.contains(active);
                            if (!inTrigger && !inMenu) {
                                setIsInputFocused(false);
                            }
                        }, 0);
                    }}
                    onFocus={() => !disabled && setIsInputFocused(true)}
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
                            <DropdownContainer constrainHeight={constrainHeight}>
                                {optionsWithBlankSelection &&
                                    optionsWithBlankSelection?.map((option: GenericObject) => (
                                        <DropdownOption key={getOptionValue ? getOptionValue(option) : option.id}
                                            option={option}
                                        />
                                    ))}
                            </DropdownContainer>
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
