export const handleClickOutside = ({ inputWrapperRef, dropdownContainerRef, setIsDropDownClosed, setFocusedOptionIndex, setIsInputFocused, }) => (e) => {
    let targetElement = e.target;
    let shouldClose = true;
    //Only needed for when useDropdown hook used with external trigger
    while (targetElement && shouldClose) {
        if (targetElement.getAttribute("data-dropdown") === "pb-dropdown-trigger") {
            shouldClose = false;
        }
        targetElement = targetElement.parentElement;
    }
    if (inputWrapperRef.current &&
        !inputWrapperRef.current.contains(e.target) &&
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target) &&
        shouldClose) {
        setIsDropDownClosed(true);
        setFocusedOptionIndex(-1);
        setIsInputFocused(false);
    }
};
//# sourceMappingURL=clickOutsideHelper.js.map