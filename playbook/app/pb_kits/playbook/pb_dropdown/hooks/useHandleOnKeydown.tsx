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

  return (e: React.KeyboardEvent) => {

    if (e.key !== "Tab" && autocomplete && selected && selected.label) {
      handleBackspace();
    }

    switch (e.key) {
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