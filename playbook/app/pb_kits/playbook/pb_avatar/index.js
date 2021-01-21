import PbEnhancedElement from '../pb_enhanced_element'

export default class PbAvatar extends PbEnhancedElement {
  static get selector() {
    return '.avatar_wrapper'
  }

  connect() {
    const img = this.element.querySelector('img')
    if (!img) return

    img.addEventListener('error', (e) => {
      e.target.style.display = 'none'
    })
  }
}
