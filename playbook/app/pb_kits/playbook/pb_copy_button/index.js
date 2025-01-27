export default class PbCopyButton {
  static start() {
    const copyButtons = document.querySelectorAll('.pb_copy_button')

    copyButtons.forEach((container) => {
      const button = container.querySelector('button')
      if (button) {
        button.addEventListener('click', () => {
          const fromId = container.getAttribute('data-from')
          if (fromId) {
            const fromElement = document.querySelector(`#${fromId}`)
            if (fromElement) {
              let contentToCopy = ''
              if (fromElement.tagName.toLowerCase() === 'input') {
                contentToCopy = fromElement.value
              } else {
                contentToCopy = fromElement.innerText
              }
              navigator.clipboard.writeText(contentToCopy)
                .then(() => console.log(`Copied from element: ${contentToCopy}`))
                .catch(err => console.error('Failed to copy text', err))
              return
            }
          }

          const textToCopy = container.getAttribute('data-copy-value')
          if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
              .then(() => console.log(`Copied to clipboard: ${textToCopy}`))
              .catch(err => console.error('Failed to copy text', err))
          } else {
            console.warn('No data-copy-value attribute found or data-from element')
          }
        })
      }
    })
  }
}
