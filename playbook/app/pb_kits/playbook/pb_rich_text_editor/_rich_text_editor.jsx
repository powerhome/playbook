/* @flow */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import inlineFocus from './inlineFocus'
import useFocus from './useFocus'
import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps, noop } from '../utilities/props'

try {
  const Trix = require('trix')
  Trix.config.textAttributes.inlineCode = {
    tagName: 'code',
    inheritable: true,
  }
} catch (_e) { /* do nothing */ }

import { TrixEditor } from "react-trix"

type RichTextEditorProps = {
  aria?: object,
  toolbarBottom?: Boolean,
  className?: string,
  data?: object,
  focus?: boolean,
  id?: string,
  inline?: boolean,
  name?: string,
  onChange: (html: string, text: string) => void,
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
    inline = false,
    name,
    onChange = noop,
    placeholder,
    simple = false,
    sticky = false,
    template = '',
    value = '',
  } = props

  const ariaProps = buildAriaProps(aria),
  dataProps = buildDataProps(data),
  [editor, setEditor] = useState()

  const handleOnEditorReady = (editorInstance) => setEditor(editorInstance),
  element = editor?.element

  // DOM manipulation must wait for editor to be ready
  if (editor) {
    const toolbarElement = element.parentElement.querySelector('trix-toolbar'),
    blockCodeButton = toolbarElement.querySelector('[data-trix-attribute=code]'),
    inlineCodeButton = blockCodeButton.cloneNode(true)

    // set button attributes
    inlineCodeButton.hidden = true
    inlineCodeButton.dataset.trixAttribute = 'inlineCode'
    blockCodeButton.insertAdjacentElement('afterend', inlineCodeButton)

    if (toolbarBottom) editor.element.after(toolbarElement)

    const getCodeFormattingType = (): string => {
      if (editor.attributeIsActive('code')) return 'block'
      if (editor.attributeIsActive('inlineCode')) return 'inline'

      const range = editor.getSelectedRange()
      if (range[0] == range[1]) return 'block'

      const text = editor.getSelectedDocument().toString().trim()
      return /\n/.test(text) ? 'block' : 'inline'
    }

    // DOM event listeners
    element.addEventListener('trix-selection-change', () => {
      const type = getCodeFormattingType()
      blockCodeButton.hidden = type == 'inline'
      inlineCodeButton.hidden = type == 'block'
    })

    focus
      ? (document.addEventListener('trix-focus', useFocus),
      document.addEventListener('trix-blur', useFocus),
      useFocus())
      : null

    document.addEventListener('trix-focus', inlineFocus)
    document.addEventListener('trix-blur', inlineFocus)
  }

  useEffect(() => {
    if (!editor || !template) return
    editor.loadHTML('')
    editor.setSelectedRange([0, 0])
    editor.insertHTML(template)
  }, [editor, template])

  useEffect(() => {
    if (!element) return
    element.addEventListener('click', ({target}) => {
      const trixEditorContainer = target.closest('.pb_rich_text_editor_kit')
      if (!trixEditorContainer) return

      const anchorElement = target.closest('a')
      if (!anchorElement) return

      if (anchorElement.hasAttribute('href')) window.open(anchorElement.href)
    })
  }, [element])

  const richTextEditorClass = 'pb_rich_text_editor_kit',
  simpleClass = simple ? 'simple' : '',
  focusClass = focus ? 'focus-editor-targets' : '',
  stickyClass = sticky ? 'sticky' : '',
  inlineClass = inline ? 'inline' : '',
  toolbarBottomClass = toolbarBottom ? 'toolbar-bottom' : ''

  let css = classnames(globalProps(props), className)
  css = classnames(
    richTextEditorClass,
    simpleClass,
    focusClass,
    stickyClass,
    inlineClass,
    toolbarBottomClass,
    css
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
    >
      <TrixEditor
          className=""
          fileParamName={name}
          onChange={onChange}
          onEditorReady={handleOnEditorReady}
          placeholder={placeholder}
          value={value}
      />
    </div>
  )
}

export default RichTextEditor
