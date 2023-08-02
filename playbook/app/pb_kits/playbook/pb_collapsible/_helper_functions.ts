export const showElement = (elem: any) => {
    elem.style.display = 'block';
    const height = elem.scrollHeight + 'px'; // Get its height
    elem.style.height = height; // Update the max-height
    elem.classList.add('is-visible')
    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(() => {
      elem.style.height = '';
    }, 300);
  };

  export const hideElement = (elem:any) => {
    elem.style.height = elem.scrollHeight + 'px';

    window.setTimeout(() => {
      elem.style.height = '0';
      elem.style.paddingTop = '0';
      elem.style.paddingBottom = '0';
    }, 1);

    // When the transition is complete, hide it
    window.setTimeout(() => {
      elem.classList.remove('is-visible');
    }, 300);
  };