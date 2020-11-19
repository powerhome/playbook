/* @flow */

import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import useFocus from './useFocus.js'
import Trix from 'trix'
import { globalProps } from '../utilities/globalProps.js'

type RichTextEditorProps = {
  className?: string,
  focus?: boolean,
  id?: string,
  onChange: (string) => void,
  placeholder?: string,
  simple?: boolean,
  sticky?: boolean,
  template: string,
  value?: string,
}

const RichTextEditor = (props: RichTextEditorProps) => {
  const {
    className,
    focus = false,
    id,
    onChange,
    placeholder,
    simple = false,
    sticky = false,
    template = '',
    value = '',
  } = props
  const trixRef = useRef()

  useEffect(() => {
    Trix.config.textAttributes.inlineCode = {
      tagName: 'code',
      inheritable: true,
    }

    trixRef.current.addEventListener('trix-initialize', (event) => {
      const element = event.target

      const { toolbarElement, editor } = element

      const blockCodeButton = toolbarElement.querySelector(
        '[data-trix-attribute=code]'
      )
      const inlineCodeButton = blockCodeButton.cloneNode(true)

      inlineCodeButton.hidden = true
      inlineCodeButton.dataset.trixAttribute = 'inlineCode'
      blockCodeButton.insertAdjacentElement('afterend', inlineCodeButton)

      const getCodeFormattingType = () => {
        if (editor.attributeIsActive('code')) return 'block'
        if (editor.attributeIsActive('inlineCode')) return 'inline'

        const range = editor.getSelectedRange()
        if (range[0] == range[1]) return 'block'

        const text = editor.getSelectedDocument().toString().trim()
        return /\n/.test(text) ? 'block' : 'inline'
      }

      element.addEventListener('trix-selection-change', () => {
        const type = getCodeFormattingType()
        blockCodeButton.hidden = type == 'inline'
        inlineCodeButton.hidden = type == 'block'
      })
    })

    trixRef.current.addEventListener('trix-change', (event) => {
      onChange && onChange(event.target.innerHTML)
    })
  }, [trixRef])

  useEffect(() => {
    const editor = trixRef.current.editorController.editor
    if (template) {
      editor.loadHTML('')
      editor.setSelectedRange([0, 0])
      editor.insertHTML(template)
    }
  }, [template])

  focus
    ? (document.addEventListener('trix-focus', useFocus),
    document.addEventListener('trix-blur', useFocus),
    useFocus())
    : null

  const RichTextEditorClass = 'pb_rich_text_editor_kit'
  const SimpleClass = simple ? 'simple' : ''
  const FocusClass = focus ? 'focus-editor-targets' : ''
  const StickyClass = sticky ? 'sticky' : ''
  const css = classnames(globalProps(props), className)

  return (
    <div
        className={classnames(
        RichTextEditorClass,
        SimpleClass,
        FocusClass,
        StickyClass,
        css
      )}
    >
      <input
          id={id}
          type="hidden"
          value={value}
      />
      <trix-editor
          input={id}
          placeholder={placeholder}
          ref={trixRef}
      />
    </div>
  )
}

export default RichTextEditor
