type HandleClickOutsideType = {
  inputWrapperRef?: React.RefObject<HTMLDivElement>;
  dropdownContainerRef?: React.RefObject<HTMLDivElement>;
  setIsDropDownClosed?: (value: boolean) => void;
  setFocusedOptionIndex?: (value: number) => void;
  setIsInputFocused?: (value: boolean) => void;
};

export const handleClickOutside =
  ({
    inputWrapperRef,
    dropdownContainerRef,
    setIsDropDownClosed,
    setFocusedOptionIndex,
    setIsInputFocused,
  }: HandleClickOutsideType) =>
  (e: MouseEvent) => {
    let targetElement = e.target as HTMLElement;
    let shouldClose = true;

    //Only needed for when useDropdown hook used with external trigger
    while (targetElement && shouldClose) {
      if (
        targetElement.getAttribute("data-dropdown") === "pb-dropdown-trigger"
      ) {
        shouldClose = false;
      }
      targetElement = targetElement.parentElement as HTMLElement;
    }
    if (
      inputWrapperRef.current &&
      !inputWrapperRef.current.contains((e.target as HTMLElement)) &&
      dropdownContainerRef.current &&
      !dropdownContainerRef.current.contains((e.target as HTMLElement)) &&
      shouldClose
    ) {
      setIsDropDownClosed(true);
      setFocusedOptionIndex(-1);
      setIsInputFocused(false);
    }
  };
