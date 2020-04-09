/* @flow */

import React from 'react'
import classnames from 'classnames'

type RichTextEditorProps = {
  className?: String,
  dark?: Boolean,
  focus?: Boolean,
  simple?: Boolean,
  content?: String,
  sticky?: Boolean
}

const RichTextEditor = ({
  className,
  dark = false,
  focus = false,
  simple = false,
  sticky = false,
  content = '',
}: RichTextEditorProps) => {
  // useFocus Hook to be extracted to separate file.
  const useFocus = () => {
    const allTrixEditors = document.querySelectorAll(
      '.focus-editor-targets trix-editor'
    )
    allTrixEditors.forEach((editorElement) => {
      const toolbarElement = editorElement.toolbarElement
      if (editorElement == document.activeElement) {
        editorElement.classList.add('focused-editor')
        toolbarElement.style.display = 'block'
      } else {
        // don't hide the toolbar if we've unfocused to focus on the link dialog.
        if (!toolbarElement.contains(document.activeElement)) {
          editorElement.classList.remove('focused-editor')
          toolbarElement.style.display = 'none'
        }
      }
    })
  }

  focus
    ? (document.addEventListener('trix-focus', useFocus),
    document.addEventListener('trix-blur', useFocus),
    useFocus())
    : null

  const RichTextEditorClass = `pb_rich_text_editor_kit${dark ? '_dark' : ''}`
  const SimpleClass = simple ? 'simple' : ''
  const FocusClass = focus ? 'focus-editor-targets' : ''
  const StickyClass = sticky ? 'sticky' : ''

  return (
    <div
        className={classnames(
        RichTextEditorClass,
        SimpleClass,
        FocusClass,
        StickyClass,
        className
      )}
    >
      <input
          id="trix"
          type="hidden"
          value={content}
      />
      <trix-editor
          input="trix"
          placeholder="Empty Placeholder"
      />
    </div>
  )
}

export default RichTextEditor
