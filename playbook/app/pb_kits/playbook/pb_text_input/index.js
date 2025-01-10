import PbEnhancedElement from '../pb_enhanced_element'



export default class PbTextInput extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-text-input-kit]'
  }

  connect() {
    console.log('PbTextInput connected')
  }





}
