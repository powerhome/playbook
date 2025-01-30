import PbEnhancedElement from '../pb_enhanced_element'

export default class PbFixedConfirmationToast extends PbEnhancedElement {
  static get selector() {
    return '.remove_toast'
  }

  connect() {
    this.self = this.element
    this.autoCloseToast(this.self)

    this.self.addEventListener('click', () => {
      this.removeToast(this.self)
    })
  }

  removeToast(elem) {
    elem.parentNode.removeChild(elem)
  }

  autoCloseToast(element) {
    const classListValues = element.classList.value
    const hasAutoCloseClass = classListValues.includes('auto_close')

    if (hasAutoCloseClass) {
      const classList = classListValues.split(' ')
      const autoCloseValue = classList[classList.length - 1].split('_')[2]
      const autoCloseIntValue = parseInt(autoCloseValue)

      setTimeout(() => {
        this.removeToast(element)
      }, autoCloseIntValue)
    }
  }
}