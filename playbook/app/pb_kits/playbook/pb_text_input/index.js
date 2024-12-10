import PbEnhancedElement from '../pb_enhanced_element'
import { INPUTMASKS } from './inputMasks'

export default class PbTextInput extends PbEnhancedElement {
  static get selector() {
    return '.pb_text_input_kit input[data-mask]'
  }

  connect() {
    if (!this.maskType || !INPUTMASKS[this.maskType]) return
    
    this.element.addEventListener('input', this.handleInput.bind(this))
  }

  disconnect() {
    if (this.element) {
      this.element.removeEventListener('input', this.handleInput.bind(this))
    }
  }

  handleInput(event) {
    const inputValue = event.target.value
    const cursorPosition = event.target.selectionStart
    const isAtEnd = cursorPosition === inputValue.length
    
    const formattedValue = INPUTMASKS[this.maskType].format(inputValue)
    event.target.value = formattedValue
    
    if (!isAtEnd) {
      this.updateCursorPosition(inputValue, formattedValue, cursorPosition)
    }
  }

  updateCursorPosition(oldValue, newValue, oldPosition) {
    let newPosition = oldPosition

    if (newValue.length - oldValue.length === 1) {
      newPosition += 1
    } else if (this.maskType === 'currency' && newValue.length - oldValue.length === -1) {
      newPosition -= 1
    }

    this.element.selectionStart = this.element.selectionEnd = newPosition
  }

  get maskType() {
    return this.element.dataset.mask
  }
}

PbTextInput.start() 