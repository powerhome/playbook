import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorOptions {
  placeholder?: string;
  theme?: 'snow' | 'bubble';
  readOnly?: boolean;
  modules?: {
    toolbar?: any;
  };
}

export class QuillEditor {
  private quill: any = null;
  private container: HTMLElement;
  private options: QuillEditorOptions;

  constructor(container: HTMLElement, options: QuillEditorOptions = {}) {
    this.container = container;
    this.options = {
      theme: 'snow',
      placeholder: options.placeholder || 'Write something...',
      readOnly: options.readOnly || false,
      modules: options.modules || {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['blockquote', 'code-block'],
          ['link'],
          ['clean']
        ]
      },
      ...options
    };

    this.initialize();
  }

  private initialize(): void {
    this.quill = new Quill(this.container, this.options);

    // Set up change handler if there's a hidden input to sync with
    const hiddenInput = this.container.parentElement?.querySelector('input[type="hidden"]') as HTMLInputElement;
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
      this.container.dispatchEvent(event);
    });
  }

  public getHTML(): string {
    return this.quill?.root.innerHTML || '';
  }

  public getText(): string {
    return this.quill?.getText() || '';
  }

  public setContent(html: string): void {
    if (this.quill) {
      this.quill.root.innerHTML = html;
    }
  }

  public getQuill(): any {
    return this.quill;
  }

  public destroy(): void {
    // Clean up if needed
    this.quill = null;
  }
}

// Auto-initialize Quill editors on page load
document.addEventListener('DOMContentLoaded', () => {
  const editors = document.querySelectorAll('[data-quill-editor]');
  editors.forEach((element) => {
    const container = element.querySelector('.quill-editor-container') as HTMLElement;
    if (container) {
      const placeholder = element.getAttribute('data-placeholder') || undefined;
      const theme = (element.getAttribute('data-theme') as 'snow' | 'bubble') || 'snow';
      
      new QuillEditor(container, {
        placeholder,
        theme
      });
    }
  });
});
