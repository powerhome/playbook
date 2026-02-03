import React, { useState } from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import Button from '../../pb_button/_button'
import Card from '../../pb_card/_card'
import { TrixEditor } from 'react-trix'
// eslint-disable-next-line no-unused-vars
import Trix from 'trix'

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
          TrixEditor={TrixEditor}
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
