import React from 'react'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Italic from '@tiptap/extension-italic'

const PBTipTapEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Strike
        ],
        content:"Hi from Tiptap!"
    })
    Bold.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
      })
      if (!editor) {
        return null
      }

    return (
        <>
        <button
            className={editor.isActive('bold') ? 'is-active' : ''}
            onClick={() => editor.chain().focus().toggleBold().run()}
        >
        Bold
        </button>
        <button
            className={editor.isActive('italic') ? 'is-active' : ''}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            onClick={() => editor.chain().focus().toggleItalic().run()}
        >
        italic
        </button>
        <button
            className={editor.isActive('strike') ? 'is-active' : ''}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            onClick={() => editor.chain().focus().toggleStrike().run()}
        >
        strike
        </button>
        <EditorContent editor={editor}/>
        </>
    )
}

export default PBTipTapEditor