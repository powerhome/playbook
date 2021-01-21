import PbEnhancedElement from '../pb_enhanced_element'

export default class PbTextarea extends PbEnhancedElement {
  static get selector() {
    console.log("hello")
    return '.resize_auto textarea'
  }

  onInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }

  connect() {
    console.log(this.element)
    this.element.setAttribute('style', 'height:' + (this.element.scrollHeight) + 'px;overflow-y:hidden;');
    this.element.addEventListener("input", this.onInput, false);
  }
}
