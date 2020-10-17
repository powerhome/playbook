import PbEnhancedElement from '../pb_enhanced_element'

export default class PbFixedConfirmationToast extends PbEnhancedElement {
  static get selector() {
    return '.remove_toast'
  }

  connect() {
    this.self = this.element
    this.self.addEventListener('click', () => {
      this.removeToast(this.self)
    })
  }

  removeToast(elem) {
    elem.parentNode.removeChild(elem)
  }
}
