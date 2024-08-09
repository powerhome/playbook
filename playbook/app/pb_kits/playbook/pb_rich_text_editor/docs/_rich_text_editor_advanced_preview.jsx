import React, { useState } from 'react'
import { Button, Card, RichTextEditor } from 'playbook-ui'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'


const RichTextEditorAdvancedPreview = (props) => {

  const editor = useEditor({
      extensions: [
          StarterKit,
          Link
      ],
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
        {showPreview && (
          <Card marginTop="md">
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
      </RichTextEditor>
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