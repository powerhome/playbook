/* @flow */

import React from 'react'
import classnames from 'classnames'

type RichTextEditorProps = {
  className?: String,
}

const RichTextEditor = ({
  className,
}: RichTextEditorProps) => (
  <div>
    <input
        className={classnames('pb_rich_text_editor_kit', className)}
        id="trix"
        type="hidden"
    />
    <trix-editor input="trix" />
  </div>
)

export default RichTextEditor
