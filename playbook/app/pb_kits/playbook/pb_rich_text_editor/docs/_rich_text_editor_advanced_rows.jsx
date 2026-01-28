import React from 'react'
import RichTextEditor from '../_rich_text_editor'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'


const RichTextEditorAdvancedRows = (props) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link
    ],
    content: "Add your text here. You can format your text, add links, quotes, and bullets."
  })

  const editor2 = useEditor({
    extensions: [
      StarterKit,
      Link
    ],
    content: "Add your text here. You can format your text, add links, quotes, and bullets."
  })

  const editor3 = useEditor({
    extensions: [
      StarterKit,
      Link
    ],
    content: "Add your text here. You can format your text, add links, quotes, and bullets."
  })

  return (
    <div>
      <RichTextEditor
          advancedEditor={editor}
          textareaHeight="sm"
          {...props}
      >
        <EditorContent editor={editor} />
      </RichTextEditor>

      <br />

      <RichTextEditor
          advancedEditor={editor2}
          textareaHeight="md"
          {...props}
      >
        <EditorContent editor={editor2} />
      </RichTextEditor>

      <br />

      <RichTextEditor
          advancedEditor={editor}
          textareaHeight="lg"
          {...props}
      >
        <EditorContent editor={editor3} />
      </RichTextEditor>
    </div>
  )
}

export default RichTextEditorAdvancedRows