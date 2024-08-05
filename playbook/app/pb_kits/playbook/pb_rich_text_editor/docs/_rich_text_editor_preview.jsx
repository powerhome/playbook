import React, { useState } from 'react'
import {
  Button,
  Card,
  RichTextEditor,
} from 'playbook-ui'

const RichTextEditorPreview = (props) => {
  const [showPreview, setShowPreview] = useState(false)
  const [previewText, setPreviewText] = useState(<div />)

  const handleChange = (event) => setPreviewText(event)
  const handleClick = () => {
    setShowPreview(true)
  }

  return (
    <div>
      <RichTextEditor
          id="content-preview-editor"
          onChange={handleChange}
          {...props}
      />
      {showPreview && (
        <Card marginTop="md">
          <div
              className="trix-content"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: previewText }}
              id="preview-content"
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
export default RichTextEditorPreview
