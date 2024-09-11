export const showElement = (elem: HTMLElement) => {
  elem.style.display = 'block';
  const height = elem.scrollHeight + 'px'; // Get its height
  elem.style.height = height; // Update the max-height
  elem.classList.add('is-visible');
  elem.style.overflow = "hidden"
  // Once the transition is complete, remove the inline max-height so the content can scale responsively
  window.setTimeout(() => {
    // If a user toggles multiple times quickly in a row, 'is-visible' can be removed by hideElement's timeout
    if (!elem.classList.contains('is-visible')) {
      elem.classList.add('is-visible')
    }
    elem.style.height = '';
    elem.style.overflow = "visible"
  }, 300);
};

export const hideElement = (elem: HTMLElement) => {
  elem.style.height = elem.scrollHeight + 'px';

  window.setTimeout(() => {
    elem.style.height = '0';
    elem.style.paddingTop = '0';
    elem.style.paddingBottom = '0';
    elem.style.overflow = "hidden"
  }, 1);

  // When the transition is complete, hide it
  window.setTimeout(() => {
    elem.classList.remove('is-visible');
    elem.style.overflow = ""
  }, 300);
};
