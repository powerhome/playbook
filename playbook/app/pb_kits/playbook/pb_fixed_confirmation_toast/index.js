import PbEnhancedElement from '../pb_enhanced_element'

export default class PbFixedConfirmationToast extends PbEnhancedElement {
  static get selector() {
    return '.auto_close, .remove_toast'
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
    if (elem.autoCloseTimeout) {
      clearTimeout(elem.autoCloseTimeout)
      elem.autoCloseTimeout = null
    }

    elem.parentNode.removeChild(elem)
  }

  autoCloseToast(element) {
    const hasAutoCloseClass = element.classList.contains('auto_close')

    if (hasAutoCloseClass) {
      const autoCloseClass = Array.from(element.classList).find(cls => cls.startsWith('auto_close_'))
      if (autoCloseClass) {
        const duration = parseInt(autoCloseClass.split('_')[2])

        if (element.autoCloseTimeout) {
          clearTimeout(element.autoCloseTimeout)
        }

        element.autoCloseTimeout = setTimeout(() => {
          this.removeToast(element)
        }, duration)
      }
    }
  }
}