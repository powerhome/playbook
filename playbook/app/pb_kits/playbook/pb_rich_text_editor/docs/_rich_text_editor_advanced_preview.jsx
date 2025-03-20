import React, { useState } from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import Button from '../../pb_button/_button'
import Card from '../../pb_card/_card'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'


const RichTextEditorAdvancedPreview = (props) => {

  const editor = useEditor({
      extensions: [
          StarterKit,
          Link
      ],
      content: "Add text here, format it, and press \"Preview Output\" to see what your stylized output will look like on the page."
  })

  const [showPreview, setShowPreview] = useState(false)
  const [previewText, setPreviewText] = useState(<div />)

  const handleChange = () => {
    if (editor) {
      setPreviewText(editor.getHTML())
    }
  }

  const handleClick = () => {
    handleChange()
    setShowPreview(true)
  }
  if (!editor) {
    return null
  } 
      

  return (
    <div>
      <RichTextEditor
          advancedEditor={editor}
          id="content-advanced-preview-editor"
          onChange={handleChange}
          {...props}
      >
        <EditorContent editor={editor}/>
      </RichTextEditor>
      {showPreview && (
        <Card 
            marginTop="md"
            maxWidth="md"
        >
          <div
              className="tiptap-content"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: previewText }}
              id="advanced-preview-content"
          />
        </Card>
      )}
      {!showPreview && (
        <div />
      )}
      <Button
          id="preview-button"
          marginTop="md"
          onClick={handleClick}
          text="Preview Output"
          variant="secondary"
      />
    </div>
  )
}

export default RichTextEditorAdvancedPreview