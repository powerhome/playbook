/* @flow */

import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import inlineFocus from './inlineFocus'
import useFocus from './useFocus'
import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps } from '../utilities/props'

try {
  const Trix = require('trix')
  Trix.config.textAttributes.inlineCode = {
    tagName: 'code',
    inheritable: true,
  }
} catch (_e) { /* do nothing */ }

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

  document.addEventListener('trix-focus', inlineFocus)
  document.addEventListener('trix-blur', inlineFocus)

  const handleAnchorElementClick = (clickedElement) => {
    const trixEditorContainer = clickedElement.closest('.pb_rich_text_editor_kit')
    if (!trixEditorContainer) return

    const anchorElement = clickedElement.closest('a')
    if (!anchorElement) return

    if (anchorElement.hasAttribute('href')) window.open(anchorElement.href)
  }

  const handleClick = (event) => {
    handleAnchorElementClick(event.target)
  }

  useEffect(() => {
    trixRef.current.addEventListener('click', handleClick)
  }, [])

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
