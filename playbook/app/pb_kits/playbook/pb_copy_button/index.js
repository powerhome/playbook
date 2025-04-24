import PbEnhancedElement from "../pb_enhanced_element"

export class PbCopyButton extends PbEnhancedElement {
  static get selector() {
    return '.pb_copy_button_kit'
  }

  connect() {
    this.handleClick = this.handleClick.bind(this)
    this.button = this.element.querySelector('button')
    if (this.button) {
      this.button.addEventListener('click', this.handleClick)
    }
  }

  disconnect() {
    if (this.button) {
      this.button.removeEventListener('click', this.handleClick)
    }
  }

  handleClick() {
    const textToCopy = this.element.getAttribute('data-copy-value')
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .catch(err => console.error('Failed to copy text', err))

      return
    }

    const fromId = this.element.getAttribute('data-from')
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
          .catch(err => console.error('Failed to copy text', err))
      }
    } else {
      console.warn('No data-copy-value attribute found or data-from element')
    }
  }
}

export function addCopyEventListeners() {
  const divsWithDataExternalCopyValue = document.querySelectorAll('div[data-external-copy-value]')

  divsWithDataExternalCopyValue.forEach((element) => {
    element.addEventListener('click', function () {
      const textToCopy = element.getAttribute('data-external-copy-value')
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
          .catch(err => console.error('Failed to copy text', err))
      }
    })
  })


  const divsWithDataExternalCopyFrom = document.querySelectorAll('div[data-external-copy-from]')

  divsWithDataExternalCopyFrom.forEach((element) => {
    element.addEventListener('click', function () {
      const fromId = element.getAttribute('data-external-copy-from')
      const fromElement = document.querySelector(`#${fromId}`)
      if (fromElement) {
        let contentToCopy = ''
        if (fromElement.tagName.toLowerCase() === 'input') {
          contentToCopy = fromElement.value
        } else {
          contentToCopy = fromElement.innerText
        }
        navigator.clipboard.writeText(contentToCopy)
          .catch(err => console.error('Failed to copy text', err))
      }
    })
  })
}
