import PbEnhancedElement from '../pb_enhanced_element'

export default class PbTextarea extends PbEnhancedElement {
  static get selector() {
    console.log("hello")
    return '.resize_auto textarea'
  }

  // onInput() {
  //   this.style.height = 'auto';
  //   this.style.height = (this.scrollHeight) + 'px';
  // }

  connect() {
console.log(this.element)
    const textareas = document.querySelectorAll('.resize_auto textarea');

    function OnInput() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }

    for (let i = 0; i < textareas.length; i++) {
      textareas[i].setAttribute('style', 'height:' + (textareas[i].scrollHeight) + 'px;overflow-y:hidden;');
      textareas[i].addEventListener("input", OnInput, false);
    }
    // console.log(this.element)
    // this.element.setAttribute('style', 'height:' + (this.element.scrollHeight) + 'px;overflow-y:hidden;');
    // this.element.addEventListener("input", this.onInput, false);
  }
}
