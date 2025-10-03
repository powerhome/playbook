import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { TrixEditor } from 'react-trix'

import inlineFocus from './inlineFocus'
import useFocus from './useFocus'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps, noop, buildHtmlProps } from '../utilities/props'

import Trix from 'trix'
import './_dedupe_trix_toolbar'

Trix.config.textAttributes.inlineCode = {
  tagName: 'code',
  inheritable: true,
}

import EditorToolbar from './TipTap/Toolbar'

type Editor = {
  attributeIsActive?: ([any]: string) => boolean,
  element?: HTMLElement,
  getSelectedDocument?: () => any,
  getSelectedRange?: () => Array<number>,
  insertHTML?: ([any]: string) => void,
  loadHTML?: ([any]: string) => void,
  setSelectedRange?: (range: Array<number>) => void,
}

type RichTextEditorProps = {
  aria?: { [key: string]: string },
  advancedEditor?: any,
  advancedEditorToolbar?: boolean,
  toolbarBottom?: boolean,
  children?: React.ReactNode | React.ReactNode[],
  className?: string,
  data?: { [key: string]: string },
  focus?: boolean,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
  inputOptions?: { [key: string]: string | number | boolean | (() => void) },
  id?: string,
  inline?: boolean,
  extensions?: { [key: string]: string }[],
  name?: string,
  onChange: (html: string, text: string) => void,
  placeholder?: string,
  simple?: boolean,
  sticky?: boolean,
  template: string,
  value?: string,
  maxWidth?: string
} & GlobalProps

const RichTextEditor = (props: RichTextEditorProps): React.ReactElement => {
  const {
    aria = {},
    advancedEditor,
    advancedEditorToolbar = true,
    toolbarBottom = false,
    children,
    className,
    data = {},
    focus = false,
    htmlOptions = {},
    inputOptions = {},
    inline = false,
    extensions,
    name,
    onChange = noop,
    placeholder,
    simple = false,
    sticky = false,
    template = '',
    value = '',
    maxWidth = "md"
  } = props

  const ariaProps = buildAriaProps(aria),
    dataProps = buildDataProps(data),
    [editor, setEditor] = useState<Editor>()

  const htmlProps = buildHtmlProps(htmlOptions)
  
  const handleOnEditorReady = (editorInstance: Editor) => {
    setEditor(editorInstance)
    setTimeout(() => {
      const oldId = editorInstance.element.getAttribute('input')
      if (oldId) {
        const hiddenInput = document.getElementById(oldId)
        if (hiddenInput) {
          const newId = (inputOptions.id as string) || oldId  
          hiddenInput.id = newId
          editorInstance.element.setAttribute('input', newId)

          if (inputOptions.name) {
            hiddenInput.setAttribute('name', inputOptions.name as string)
          }
        }
      }
    })
  }

  // DOM manipulation must wait for editor to be ready
  if (editor && editor.element) {
    const toolbarElement = editor.element.parentElement.querySelector('trix-toolbar') as HTMLElement,
      blockCodeButton = toolbarElement.querySelector('[data-trix-attribute=code]') as HTMLElement

    // replace default trix "block code" button with "inline code" button
    let inlineCodeButton = toolbarElement.querySelector('[data-trix-attribute=inlineCode]') as HTMLElement
    if (!inlineCodeButton) {
      inlineCodeButton = blockCodeButton.cloneNode(true) as HTMLElement
      blockCodeButton.hidden = true
      // set button attributes
      inlineCodeButton.dataset.trixAttribute = 'inlineCode'
      blockCodeButton.insertAdjacentElement('afterend', inlineCodeButton)
    } 

    if (toolbarBottom) editor.element.after(toolbarElement)

    focus
      ? (document.addEventListener('trix-focus', useFocus),
        document.addEventListener('trix-blur', useFocus),
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
    if (!editor?.element) return
    editor.element.addEventListener('click', ({ target }: Event) => {
      const trixEditorContainer = (target as Element).closest('.pb_rich_text_editor_kit')
      if (!trixEditorContainer) return

      const anchorElement = (target as Element).closest('a')
      if (!anchorElement) return

      if (anchorElement.hasAttribute('href')) window.open(anchorElement.href)
    })
  }, [editor])

  const richTextEditorClass = 'pb_rich_text_editor_kit',
    simpleClass = simple ? 'simple' : '',
    focusClass = focus ? 'focus-editor-targets' : '',
    stickyClass = sticky ? 'sticky' : '',
    inlineClass = inline ? 'inline' : '',
    toolbarBottomClass = toolbarBottom ? 'toolbar-bottom' : ''

  let css = classnames(globalProps(props, { maxWidth }), className)
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
        {...htmlProps}
        className={css}
    >
      {
        advancedEditor ? (
          <div 
              className={classnames("pb_rich_text_editor_advanced_container", { 
              ["toolbar-active"]: advancedEditorToolbar,
              })}
          >
            {advancedEditorToolbar && (
              <EditorToolbar editor={advancedEditor}
                  extensions={extensions}
                  simple={simple}
              />
            )}
          { children }
          </div>
        ) : (
          <TrixEditor
              className=""
              fileParamName={name}
              mergeTags={[]}
              onChange={onChange}
              onEditorReady={handleOnEditorReady}
              placeholder={placeholder}
              value={value}
          />
        )
      }
    </div>
  )
}

export default RichTextEditor
