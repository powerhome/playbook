import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'


const RichTextEditorAdvancedLabel = (props) => {

    const editor = useEditor({
      extensions: [StarterKit, Link],
      content: "Add your text here. You can format your text, add links, quotes, and bullets.",
    })

    const editorNoLabel = useEditor({
      extensions: [StarterKit, Link],
      content: "Add your text here. You can format your text, add links, quotes, and bullets.",
    })

    if (!editor || !editorNoLabel) return null

  return (
    <div>
      <RichTextEditor
          advancedEditor={editor}
          id={"advanced-example"}
          label="Advanced Example Label"
          {...props}
      >
        <EditorContent editor={editor}/>
      </RichTextEditor>
      <br/>
      <RichTextEditor
          advancedEditor={editorNoLabel}
          label="Advanced Example Label No ID"
          {...props}
      >
        <EditorContent editor={editorNoLabel}/>
      </RichTextEditor>
    </div>
  )
}

export default RichTextEditorAdvancedLabel
