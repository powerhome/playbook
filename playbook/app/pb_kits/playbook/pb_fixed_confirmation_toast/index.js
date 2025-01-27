import PbEnhancedElement from '../pb_enhanced_element'

const TOAST_WRAPPER_SELECTOR = '[data-pb-toast-wrapper]'
const TOAST_AUTO_CLOSE_CLASS = 'auto_close'
const TOAST_REMOVE_CLASS = 'remove_toast'

export default class PbFixedConfirmationToast extends PbEnhancedElement {
  static get selector() {
    return `${TOAST_WRAPPER_SELECTOR}, .${TOAST_AUTO_CLOSE_CLASS}, .${TOAST_REMOVE_CLASS}`
  }

  connect() {
    this.self = this.element

    if (this.self.classList.contains(TOAST_AUTO_CLOSE_CLASS) || 
        this.self.hasAttribute('data-pb-auto-close')) {
      this.autoCloseToast(this.self)
    }

    if (this.self.classList.contains(TOAST_REMOVE_CLASS) || 
        this.self.hasAttribute('data-pb-remove-toast')) {
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
    let duration

    if (element.classList.contains(TOAST_AUTO_CLOSE_CLASS)) {
      const autoCloseClass = Array.from(element.classList)
        .find(cls => cls.startsWith('auto_close_'))
      
      if (autoCloseClass) {
        duration = parseInt(autoCloseClass.split('_')[2])
      }
    }

    if (!duration) {
      duration = parseInt(element.getAttribute('data-pb-auto-close'))
    }

    if (duration) {
      if (element.autoCloseTimeout) {
        clearTimeout(element.autoCloseTimeout)
      }

      element.autoCloseTimeout = setTimeout(() => {
        this.removeToast(element)
      }, duration)
    }
  }

  disconnect() {
    if (this.element.autoCloseTimeout) {
      clearTimeout(this.element.autoCloseTimeout)
    }
  }
}