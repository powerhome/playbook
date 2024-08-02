export const showElement = (elem) => {
    elem.style.display = 'block';
    const height = elem.scrollHeight + 'px'; // Get its height
    elem.style.height = height; // Update the max-height
    elem.classList.add('is-visible');
    elem.style.overflow = "hidden";
    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(() => {
        elem.style.height = '';
        elem.style.overflow = "visible";
    }, 300);
};
export const hideElement = (elem) => {
    elem.style.height = elem.scrollHeight + 'px';
    window.setTimeout(() => {
        elem.style.height = '0';
        elem.style.paddingTop = '0';
        elem.style.paddingBottom = '0';
        elem.style.overflow = "hidden";
    }, 1);
    // When the transition is complete, hide it
    window.setTimeout(() => {
        elem.classList.remove('is-visible');
        elem.style.overflow = "";
    }, 300);
};
//# sourceMappingURL=_helper_functions.js.map