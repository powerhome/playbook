import PbEnhancedElement from '../pb_enhanced_element';
export default class PbTextarea extends PbEnhancedElement {
    static get selector() {
        return '.resize_auto textarea';
    }
    onInput() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }
    connect() {
        this.element.setAttribute('style', 'height:' + (this.element.scrollHeight) + 'px;overflow-y:hidden;');
        this.element.addEventListener('input', this.onInput, false);
    }
}
//# sourceMappingURL=index.js.map