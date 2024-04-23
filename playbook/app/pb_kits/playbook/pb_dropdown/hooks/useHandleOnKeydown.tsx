import React, { useContext } from "react";
import DropdownContext from "../context";


export const useHandleOnKeyDown = () => {

const {
  autocomplete,
  focusedOptionIndex,
  filteredOptions,
  setFocusedOptionIndex,
  handleOptionClick,
  setIsDropDownClosed,
  handleBackspace,
  selected
}= useContext(DropdownContext)

  return (e: React.KeyboardEvent) => {
    switch (e.key) {
    case "Backspace":
    case "Delete":
      if (autocomplete) {
      handleBackspace();
      }
      break;
    case "ArrowDown": {
      e.preventDefault();
      setIsDropDownClosed(false);
      const nextIndex = (focusedOptionIndex + 1) % filteredOptions.length;
      setFocusedOptionIndex(nextIndex);
      break;
    }
    case "ArrowUp": {
      e.preventDefault();
      const nextIndexUp =
        (focusedOptionIndex - 1 + filteredOptions.length) %
        filteredOptions.length;
      setFocusedOptionIndex(nextIndexUp);
      break;
    }
    case "Enter":
      if (focusedOptionIndex !== -1) {
        e.preventDefault();
        handleOptionClick(filteredOptions[focusedOptionIndex]);
        setFocusedOptionIndex(-1)
      }
      break;
    default:
        if (selected && selected.label) {
          e.preventDefault();
          handleBackspace();
        }
        break;
  }
}
};