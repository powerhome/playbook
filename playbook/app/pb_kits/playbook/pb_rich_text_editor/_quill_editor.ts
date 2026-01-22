import PbEnhancedElement from "../pb_enhanced_element";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QUILL_EDITOR_SELECTOR = "[data-quill-editor]";

export default class PbQuillEditor extends PbEnhancedElement {
  static get selector() {
    return QUILL_EDITOR_SELECTOR;
  }

  private quill: any = null;

  connect() {
    const container = this.element.querySelector('.quill-editor-container') as HTMLElement;
    if (!container) return;

    const placeholder = this.element.getAttribute('data-placeholder') || 'Write something...';
    const theme = (this.element.getAttribute('data-theme') as 'snow' | 'bubble') || 'snow';

    const options = {
      theme: theme,
      placeholder: placeholder,
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['blockquote', 'code-block'],
          ['link'],
          ['clean']
        ]
      }
    };

    this.quill = new Quill(container, options);

    // Set up change handler if there's a hidden input to sync with
    const hiddenInput = this.element.querySelector('input[type="hidden"]') as HTMLInputElement;
    if (hiddenInput) {
      this.quill.on('text-change', () => {
        hiddenInput.value = this.getHTML();
      });
    }

    // Emit custom event for Rails
    this.quill.on('text-change', () => {
      const event = new CustomEvent('quill:change', {
        detail: {
          html: this.getHTML(),
          text: this.getText()
        },
        bubbles: true
      });
      this.element.dispatchEvent(event);
    });
  }

  disconnect() {
    if (this.quill) {
      this.quill = null;
    }
  }

  getHTML(): string {
    return this.quill?.root.innerHTML || '';
  }

  getText(): string {
    return this.quill?.getText() || '';
  }

  setContent(html: string): void {
    if (this.quill) {
      this.quill.root.innerHTML = html;
    }
  }

  getQuill(): any {
    return this.quill;
  }
}
