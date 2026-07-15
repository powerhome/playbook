import React, { useContext } from "react";
import DropdownContext from "../context";


export const useHandleOnKeyDown = () => {

const {
  autocomplete,
  filteredOptions,
  focusedOptionIndex,
  handleBackspace,
  handleOptionClick,
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

    if (e.key !== "Tab" && autocomplete && selected && selected.label) {
      handleBackspace();
    }

    switch (e.key) {
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
      if (focusedOptionIndex !== -1 && !filteredOptions[focusedOptionIndex]?.disabled) {
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