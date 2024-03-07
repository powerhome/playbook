import React from 'react'
import { RichTextEditor } from '../..'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'


const RichTextEditorAdvancedDefault = (props) => {

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
          {...props}
      >
        <EditorContent editor={editor}/>
      </RichTextEditor>
    </div>
  )
}

export default RichTextEditorAdvancedDefault