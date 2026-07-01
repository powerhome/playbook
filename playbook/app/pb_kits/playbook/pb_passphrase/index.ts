import PbEnhancedElement from '../pb_enhanced_element'

export default class PbPassphrase extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-passphrase]'
  }

  toggle: HTMLElement | null
  input: HTMLInputElement | null
  visible: boolean

  connect() {
    this.toggle = this.element.querySelector('.show-passphrase-icon')
    this.input = this.element.querySelector('.passphrase-text-input input')
    this.visible = false

    if (!this.toggle || !this.input) return

    this.toggle.addEventListener('click', this.handleToggle)
    this.toggle.addEventListener('keydown', this.handleKeydown)
  }

  disconnect() {
    if (!this.toggle) return

    this.toggle.removeEventListener('click', this.handleToggle)
    this.toggle.removeEventListener('keydown', this.handleKeydown)
  }

  handleToggle = (event: Event) => {
    event.preventDefault()
    this.setVisible(!this.visible)
  }

  handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    this.setVisible(!this.visible)
  }

  setVisible(visible: boolean) {
    this.visible = visible
    this.input.type = visible ? 'text' : 'password'
    this.toggle.setAttribute('aria-pressed', String(visible))
    this.toggle.setAttribute(
      'aria-label',
      visible
        ? 'Passphrase currently visible. Click icon to hide password'
        : 'Passphrase currently hidden. Click icon to reveal password'
    )

    const icons = this.toggle.querySelectorAll('.passphrase-toggle-icon')
    icons.forEach((iconWrapper, index) => {
      iconWrapper.classList.toggle('hide-icon', visible ? index === 0 : index === 1)
    })
  }
}
