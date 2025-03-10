import React from 'react'
import { RichTextEditor } from 'playbook-ui'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import HorizontalRule from '@tiptap/extension-horizontal-rule'

// Custom extension to support page breaks via a data-type attribute
const CustomHorizontalRule = HorizontalRule.extend({
  addAttributes() {
    return {
      type: {
        default: null,
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => {
          if (attributes.type) {
            return { 'data-type': attributes.type }
          }
        },
      },
    }
  },
})

const RichTextEditorAdvancedDefault = (props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      CustomHorizontalRule,
    ],
    content:
      "Add your text here. You can format your text, add links, quotes, and bullets.",
  })

  if (!editor) {
    return null
  }

  const insertPageBreak = () => {
    editor.chain().focus().insertContent('<hr data-type="pagebreak" /><p></p>').run()
  }

  return (
    <div>
      <button onClick={insertPageBreak}>Page Break</button>
      <RichTextEditor advancedEditor={editor}
          {...props}
      >
        <EditorContent editor={editor} />
      </RichTextEditor>
    </div>
  )
}

export default RichTextEditorAdvancedDefault
