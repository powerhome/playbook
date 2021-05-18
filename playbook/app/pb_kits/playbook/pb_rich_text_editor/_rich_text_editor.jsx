/* @flow */

import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import useFocus from './useFocus'
import Trix from 'trix'
import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps } from '../utilities/props'

type RichTextEditorProps = {
  aria?: object,
  toolbarBottom?: Boolean,
  className?: string,
  data?: object,
  focus?: boolean,
  id?: string,
  inline?: boolean,
  name?: string,
  onChange: (string) => void,
  placeholder?: string,
  simple?: boolean,
  sticky?: boolean,
  template: string,
  value?: string,
}

const RichTextEditor = (props: RichTextEditorProps) => {
  const {
    aria = {},
    toolbarBottom = false,
    className,
    data = {},
    focus = false,
    id,
    inline = false,
    name,
    onChange,
    placeholder,
    simple = false,
    sticky = false,
    template = '',
    value = '',
  } = props
  const trixRef = useRef()
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

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

      if (toolbarBottom) editor.element.after(toolbarElement)
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
  const InlineClass = inline ? 'inline' : ''
  const ToolbarBottomClass = toolbarBottom ? 'toolbar-bottom' : ''
  const css = classnames(globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(
        RichTextEditorClass,
        SimpleClass,
        FocusClass,
        StickyClass,
        InlineClass,
        ToolbarBottomClass,
        css
      )}
    >
      <input
          id={id}
          name={name}
          type="hidden"
          value={value}
      />
      <trix-editor
          input={id}
          name={name}
          placeholder={placeholder}
          ref={trixRef}
      />
    </div>
  )
}

export default RichTextEditor
