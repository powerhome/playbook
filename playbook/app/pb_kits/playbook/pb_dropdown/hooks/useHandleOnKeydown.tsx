import React, { useContext } from "react";
import DropdownContext from "../context";


export const useHandleOnKeyDown = () => {

const {
  asyncEnabled,
  isControlled,
  onInputChange,
  autocomplete,
  filterItem,
  filteredOptions,
  focusedOptionIndex,
  handleChange,
  handleOptionClick,
  multiSelect,
  selected,
  setFocusedOptionIndex,
  setIsDropDownClosed,
}= useContext(DropdownContext)

  // Helper function to find next non-disabled option
  const findNextAvailableIndex = (currentIndex: number, direction: 'forward' | 'backward'): number => {
    let nextIndex = currentIndex;
    let attempts = 0;

    while (attempts < filteredOptions.length) {
      if (direction === 'forward') {
        nextIndex = (nextIndex + 1) % filteredOptions.length;
      } else {
        nextIndex = (nextIndex - 1 + filteredOptions.length) % filteredOptions.length;
      }

      if (!filteredOptions[nextIndex]?.disabled) {
        return nextIndex;
      }
      attempts++;
    }

    // If all options are disabled, return current index
    return currentIndex;
  };

  return (e: React.KeyboardEvent) => {
    if (e.defaultPrevented) return;

    const printableKey = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
    const replacingSelectedLabel = filterItem === selected?.label;
    const legacyAutocomplete = !asyncEnabled && !isControlled && !onInputChange;

    // A typed character replaces the selected label. Backspace and Delete edit it one character at a time.
    if (autocomplete && !multiSelect && selected?.label &&
        (replacingSelectedLabel || legacyAutocomplete) &&
        printableKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleChange({ target: { value: e.key } }, true);
      return;
    }

    switch (e.key) {
    case "Escape":
      if (asyncEnabled) {
        setIsDropDownClosed(true);
        setFocusedOptionIndex(-1);
      }
      break;
    case "ArrowDown": {
      e.preventDefault();
      setIsDropDownClosed(false);
      const nextIndex = findNextAvailableIndex(focusedOptionIndex, 'forward');
      setFocusedOptionIndex(nextIndex);
      break;
    }
    case "ArrowUp": {
      e.preventDefault();
      const nextIndexUp = findNextAvailableIndex(focusedOptionIndex, 'backward');
      setFocusedOptionIndex(nextIndexUp);
      break;
    }
    case "Enter":
      if (focusedOptionIndex !== -1 && (!asyncEnabled || filteredOptions[focusedOptionIndex]) && !filteredOptions[focusedOptionIndex]?.disabled) {
        e.preventDefault();
        handleOptionClick(filteredOptions[focusedOptionIndex]);
        setFocusedOptionIndex(-1)
      } else if (focusedOptionIndex === -1) {
        setIsDropDownClosed(false)
      }
      break;
      case "Tab":
        setIsDropDownClosed(true);
        setFocusedOptionIndex(-1)
        break;
  }
}
};
