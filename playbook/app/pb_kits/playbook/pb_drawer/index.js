import PbEnhancedElement from "../pb_enhanced_element"

export default class PbDrawer extends PbEnhancedElement {
  static get selector() {
    return '.pb_drawer'
  }

  connect() {
    console.log('drawer start')
    this.handleToggle = this.handleToggle.bind(this)
    const triggerId = this.element.getAttribute('data-from')
    if (triggerId) {
      this.trigger = document.querySelector(`#${triggerId}`)
      if (this.trigger) {
        this.trigger.addEventListener('click', this.handleToggle)
      }
    }
  }

  disconnect() {
    if (this.trigger) {
      this.trigger.removeEventListener('click', this.handleToggle)
    }
  }

  handleToggle() {
    this.element.classList.toggle('is-active')
  }
}
