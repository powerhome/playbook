export default class PbCopyButton {
  static start() {
    const copyButtons = document.querySelectorAll('.pb_copy_button');

    copyButtons.forEach((container) => {
      const button = container.querySelector('button'); 
      if (button) {
        button.addEventListener('click', () => {
          const textToCopy = container.getAttribute('data-copy-value');

          if (textToCopy) {
            navigator.clipboard
              .writeText(textToCopy)
              .then(() => {
                console.log(`Copied to clipboard: ${textToCopy}`);
              })
              .catch((err) => {
                console.error('Failed to copy text to clipboard', err);
              });
          } else {
            console.warn('No data-copy-value attribute found on the container');
          }
        });
      }
    });
  }
}
