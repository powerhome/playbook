import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'


const RichTextEditorAdvancedSimple = (props) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link
        ],
        content:"Add your text here. You can format your text, add links, quotes, and bullets."
    })
      if (!editor) {
        return null
      } 

      


  return (
    <div>
      <RichTextEditor
          advancedEditor={editor}
          simple
          {...props}
      >
        <EditorContent editor={editor}/>
      </RichTextEditor>
    </div>
  )
}

export default RichTextEditorAdvancedSimple