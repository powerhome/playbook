import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'

import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Highlight from '@tiptap/extension-highlight'


const RichTextEditorMoreExtensions = (props) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            HorizontalRule,
            Highlight.configure({ multicolor: true })
        ],
        content:"Add your text here. You can format your text, add links, quotes, and bullets."
    })
      if (!editor) {
        return null
      } 

  const ExtensionsList = [
    {
        icon: "horizontal-rule",
        isActive: editor.isActive("horizontalRule"),
        text: "Horizontal Rule",
        onclick: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: "highlighter",
      isActive: editor.isActive("highlight"),
      text: "Highlighter",
      onclick: () => editor.chain().focus().toggleHighlight().run(),
    }
  ]

      
  return (
    <div>
      <RichTextEditor
          advancedEditor={editor}
          extensions={ExtensionsList}
          {...props}
      >
        <EditorContent editor={editor}/>
      </RichTextEditor>
    </div>
  )
}

export default RichTextEditorMoreExtensions