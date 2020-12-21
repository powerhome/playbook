import React, { useState } from 'react'
import {
  Button,
  Card,
  RichTextEditor,
} from '../../'

const RichTextEditorPreview = () => {
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
      />
      <If condition={showPreview}>
        <Card marginY="md">
          <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: previewText }}
              id="preview-content"
          />
        </Card>
        <Else />
        <div />
      </If>
      <Button
          id="preview-button"
          onClick={handleClick}
          text="Preview Output"
          variant="secondary"
      />
    </div>
  )
}
export default RichTextEditorPreview
