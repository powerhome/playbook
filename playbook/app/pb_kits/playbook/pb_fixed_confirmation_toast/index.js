import PbEnhancedElement from '../pb_enhanced_element'

export default class PbFixedConfirmationToast extends PbEnhancedElement {
  static get selector() {
    return '[class*="pb_fixed_confirmation_toast_kit"]'
  }

  connect() {
    this.self = this.element
    this.autoCloseToast(this.self)

    if (this.self.classList.contains('remove_toast')) {
      this.self.addEventListener('click', () => {
        this.removeToast(this.self)
      })
    }
  }

  removeToast(elem) {
    elem.parentNode.removeChild(elem)
  }

  autoCloseToast(element) {
    const autoCloseDataAttr = element.getAttribute('data-pb-auto-close')

    if (autoCloseDataAttr) {
      setTimeout(() => {
        this.removeToast(element)
      }, parseInt(autoCloseDataAttr))
    }
  }
}