/* @flow */

import React from 'react'
import classnames from 'classnames'

type RichTextEditorProps = {
  className?: String,
  dark?: Boolean
}

const RichTextEditor = ({ className, dark = false }: RichTextEditorProps) => {
  const RichTextEditorClass = `pb_rich_text_editor_kit${dark ? '_dark' : ''}`

  return (
    <div className={classnames(RichTextEditorClass, className)}>
      <input
          id="trix"
          type="hidden"
      />
      <trix-editor
          input="trix"
          placeholder="Empty Placeholder"
      />
    </div>
  )
}

export default RichTextEditor
