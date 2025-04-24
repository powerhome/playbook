import PbEnhancedElement from "../pb_enhanced_element"

function getTextFromElement(element) {
  if (!element) return ''
  return element.tagName.toLowerCase() === 'input'
    ? element.value
    : element.innerText
}

function copyTextToClipboard(text) {
  if (!text) return
  navigator.clipboard.writeText(text)
    .catch(err => console.error('Failed to copy text:', err))
}

function handleExternalControlCopyClick(element) {
  const value = element.getAttribute('data-external-copy-value')
  const fromId = element.getAttribute('data-external-copy-from')

  if (value) {
    copyTextToClipboard(value)
  } else if (fromId) {
    const fromElement = document.querySelector(`#${fromId}`)
    copyTextToClipboard(getTextFromElement(fromElement))
  } else {
    console.warn('Failed to copy:', element)
  }
}

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
    const value = this.element.getAttribute('data-copy-value')
    const fromId = this.element.getAttribute('data-from')

    if (value) {
      copyTextToClipboard(value)
    } else if (fromId) {
      const fromElement = document.querySelector(`#${fromId}`)
      copyTextToClipboard(getTextFromElement(fromElement))
    } else {
      console.warn('No data-copy-value or data-from attribute found')
    }
  }
}

export function addCopyEventListeners() {
  const externalCopyElements = [
    ...document.querySelectorAll('div[data-external-copy-value]'),
    ...document.querySelectorAll('div[data-external-copy-from]')
  ]

  externalCopyElements.forEach(element => {
    element.addEventListener('click', () => handleExternalControlCopyClick(element))
  })
}
