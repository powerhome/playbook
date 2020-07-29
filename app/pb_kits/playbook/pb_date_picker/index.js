import PbEnhancedElement from '../pb_enhanced_element'

export default class PbDatePicker extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-date-picker-kit]'
  }

  connect() {
    this.element.addEventListener('keydown', (event) => this.handleKeydown(event))
  }
}
