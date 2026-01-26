import PbEnhancedElement from '../pb_enhanced_element'
import { stripEmojisForPaste, applyEmojiMask } from '../utilities/emojiMask'

export default class PbTextarea extends PbEnhancedElement {
  style: {[key: string]: string}
  scrollHeight: string
  private skipNextEmojiFilter = false
  
  static get selector(): string {
    return '.resize_auto textarea, [data-pb-emoji-mask="true"]'
  }

  hasEmojiMask(): boolean {
    if (!this.element) return false
    return (this.element as HTMLElement).dataset.pbEmojiMask === "true"
  }

  onInput = (): void => {
    if (!this.element) return
    
    if ((this.element as HTMLElement).closest('.resize_auto')) {
      (this.element as HTMLTextAreaElement).style.height = 'auto';
      (this.element as HTMLTextAreaElement).style.height = (this.element as HTMLTextAreaElement).scrollHeight + 'px'
    }
  }

  handleEmojiInput = (): void => {
    if (!this.element || !this.hasEmojiMask()) return
    
    if (this.skipNextEmojiFilter) {
      this.skipNextEmojiFilter = false
      return
    }

    applyEmojiMask(this.element as HTMLTextAreaElement)
  }

  handleEmojiPaste = (event: ClipboardEvent): void => {
    if (!this.element || !this.hasEmojiMask()) return

    const pastedText = event.clipboardData?.getData('text') || ''
    const filteredText = stripEmojisForPaste(pastedText)

    if (pastedText !== filteredText) {
      event.preventDefault()
      const textarea = this.element as HTMLTextAreaElement
      const start = textarea.selectionStart || 0
      const end = textarea.selectionEnd || 0
      const currentValue = textarea.value
      const newValue = currentValue.slice(0, start) + filteredText + currentValue.slice(end)
      const newCursor = start + filteredText.length
      
      textarea.value = newValue
      textarea.selectionStart = textarea.selectionEnd = newCursor
      
      this.skipNextEmojiFilter = true
      
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  connect(): void {
    if (!this.element) return
    
    if ((this.element as HTMLElement).closest('.resize_auto')) {
      this.element.setAttribute('style', 'height:' + (this.element as HTMLTextAreaElement).scrollHeight + 'px;overflow-y:hidden;')
      this.element.addEventListener('input', this.onInput, false)
    }
    
    if (this.hasEmojiMask()) {
      this.element.addEventListener('input', this.handleEmojiInput, false)
      this.element.addEventListener('paste', this.handleEmojiPaste as EventListener, false)
    }
  }

  disconnect(): void {
    if (!this.element) return
    
    this.element.removeEventListener('input', this.onInput, false)
    this.element.removeEventListener('input', this.handleEmojiInput, false)
    this.element.removeEventListener('paste', this.handleEmojiPaste as EventListener, false)
  }
}
