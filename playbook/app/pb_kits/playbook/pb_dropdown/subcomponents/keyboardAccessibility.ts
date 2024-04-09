import { GenericObject } from "../../types";

type KeydownProps ={
    e: any
    setSelected?: (arg:GenericObject)=> void,
    focusedOptionIndex?: number,
    filteredOptions?: GenericObject,
    setFocusedOptionIndex?: (arg: number)=> void,
    handleOptionClick?: (arg: GenericObject) => void,
    setIsDropDownClosed?: (arg:boolean) => void
    handleBackspace?: () => void
}

export const handleOnKeyDown = ({
  e,
  focusedOptionIndex,
  filteredOptions,
  setFocusedOptionIndex,
  handleOptionClick,
  setIsDropDownClosed,
  handleBackspace
}: KeydownProps) => {
  switch (e.key) {
    case "Backspace":
    case "Delete":
      handleBackspace();
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
  }
};