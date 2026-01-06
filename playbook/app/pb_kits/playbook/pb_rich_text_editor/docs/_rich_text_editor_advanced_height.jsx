import React from 'react'
import RichTextEditor from '../_rich_text_editor'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'
import { Caption } from "playbook-ui"


const RichTextEditorAdvancedHeight = (props) => {

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
      <Caption>sm</Caption>
      <RichTextEditor
          advancedEditor={editor}
          inputHeight="sm"
          {...props}
      >
        <EditorContent editor={editor} />
      </RichTextEditor>

      <br />

      <Caption>md</Caption>
      <RichTextEditor
          advancedEditor={editor2}
          inputHeight="md"
          {...props}
      >
        <EditorContent editor={editor2} />
      </RichTextEditor>

      <br />

      <Caption>lg</Caption>
      <RichTextEditor
          advancedEditor={editor3}
          inputHeight="lg"
          {...props}
      >
        <EditorContent editor={editor3} />
      </RichTextEditor>
    </div>
  )
}

export default RichTextEditorAdvancedHeight