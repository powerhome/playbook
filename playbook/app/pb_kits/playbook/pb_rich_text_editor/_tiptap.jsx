import React from 'react'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const PBTipTapEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content:"Hi from Tiptap!"
    })

    return (
        <EditorContent editor={editor}/>
    )
}

export default PBTipTapEditor