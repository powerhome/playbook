type HandleClickOutsideType = {
  inputWrapperRef?: React.RefObject<HTMLDivElement>;
  dropdownContainerRef?: React.RefObject<HTMLDivElement>;
  setIsDropDownClosed?: (value: boolean) => void;
  setFocusedOptionIndex?: (value: number) => void;
  setIsInputFocused?: (value: boolean) => void;
  closeOnClick?: "outside" | "inside" | "any";
};

export const handleClickOutside =
  ({
    inputWrapperRef,
    dropdownContainerRef,
    setIsDropDownClosed,
    setFocusedOptionIndex,
    setIsInputFocused,
    closeOnClick = "any",
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
      // Target dropdown container to open dropdown
      if (
        targetElement.getAttribute("data-dropdown") === "pb-dropdown-label"
      ) {
        shouldClose = false;
      }
      targetElement = targetElement.parentElement as HTMLElement;
    }
    // Only close on outside click if closeOnClick is "outside" or "any"
    const shouldCloseOnOutsideClick = closeOnClick === "outside" || closeOnClick === "any";
    
    if (
      inputWrapperRef.current &&
      !inputWrapperRef.current.contains((e.target as HTMLElement)) &&
      dropdownContainerRef.current &&
      !dropdownContainerRef.current.contains((e.target as HTMLElement)) &&
      shouldClose &&
      shouldCloseOnOutsideClick
    ) {
      setIsDropDownClosed(true);
      setFocusedOptionIndex(-1);
      setIsInputFocused(false);
    }
  };
