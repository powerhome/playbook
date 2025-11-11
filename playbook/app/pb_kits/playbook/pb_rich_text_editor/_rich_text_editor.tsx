import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { TrixEditor } from 'react-trix'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

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
  maxWidth?: string,
  railsEditor?: boolean
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
    [editor, setEditor] = useState<Editor>(),
    [showToolbarOnFocus, setShowToolbarOnFocus] = useState(false),
    containerRef = useRef<HTMLDivElement>(null)

  const isRails = !advancedEditor && props.railsEditor === true

  // TipTap editor for Rails (hook always runs per React rules, but only used when isRails is true)
  const railsTipTapEditor = useEditor({
    extensions: [StarterKit, Link],
    content: value || '',
    onUpdate: ({ editor }) => {
      if (!isRails) return
      
      const html = editor.getHTML()
      const text = editor.getText()
      onChange(html, text)
      
      // Update hidden input for TipTap Rails form submission
      const hiddenInput = document.getElementById(`hidden-input-${props.id || 'rich-text-editor'}`)
      if (hiddenInput) {
        (hiddenInput as HTMLInputElement).value = html ?? ''
      }
    },
  }, [isRails, value])

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

  //===========focus prop with advanced editor=================
  const isClickInPopover = (event: Event): boolean => {
    return !!(event.target as Element).closest('.pb_tiptap_toolbar_dropdown_popover')
  }

  const isClickInContainer = (event: Event): boolean => {
    return !!(containerRef.current && containerRef.current.contains(event.target as Node))
  }

  useEffect(() => {
    const tiptapEditor = advancedEditor || railsTipTapEditor
    if (!tiptapEditor || !focus) return

    const handleFocus = () => setShowToolbarOnFocus(true)
    
    const handleClickOutside = (event: Event) => {
      if (isClickInContainer(event) || isClickInPopover(event)) return
      setShowToolbarOnFocus(false)
    }

    const editorElement = tiptapEditor?.view?.dom
    if (editorElement) {
      editorElement.addEventListener('focus', handleFocus)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('focus', handleFocus)
      }
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [advancedEditor, railsTipTapEditor, focus])

  //============= end focus prop with advanced editor=================

  useEffect(() => {
    if (!editor || !template) return
    editor.loadHTML('')
    editor.setSelectedRange([0, 0])
    editor.insertHTML(template)
  }, [editor, template])

  // Handle value prop changes for Rails TipTap editor
  useEffect(() => {
    if (!railsTipTapEditor) return
    const currentContent = railsTipTapEditor.getHTML()
    const newValue = value || ''

    if (currentContent !== newValue) {
      railsTipTapEditor.commands.setContent(newValue)
    }
  }, [railsTipTapEditor, value])

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

  // Generate CSS classes
  const css = classnames(
    'pb_rich_text_editor_kit',
    {
      simple: simple,
      'focus-editor-targets': focus,
      sticky: sticky,
      inline: inline,
      'toolbar-bottom': toolbarBottom,
    },
    globalProps(props, { maxWidth }),
    className
  )

  // Get the TipTap editor instance (either passed from React or auto-initialized for Rails)
  const tipTapEditor = advancedEditor || (isRails ? railsTipTapEditor : null)

  // Determine if toolbar should be shown
  const shouldShowToolbar = focus && tipTapEditor ? showToolbarOnFocus : advancedEditorToolbar

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={css}
        ref={focus ? containerRef : undefined}
    >
      {
        // Render TipTap editor if indicated (React with advancedEditor or Rails by default (railsEditor is true), otherwise Trix
        tipTapEditor ? (
          <div 
              className={classnames("pb_rich_text_editor_advanced_container", { 
              ["toolbar-active"]: shouldShowToolbar,
              })}
          >
            {shouldShowToolbar && (
              <EditorToolbar editor={tipTapEditor}
                  extensions={extensions}
                  simple={simple}
                  sticky={sticky}
              />
            )}
            {/* EditorContent for Rails railsTipTapEditor, children for React TipTap advancedEditor */}
            {railsTipTapEditor ? <EditorContent editor={tipTapEditor} /> : <>{children}</>}
            
            {/* Set up hidden input for TipTap Rails form submission */}
            {railsTipTapEditor && (
              <input 
                  id={`hidden-input-${props.id || 'rich-text-editor'}`}
                  name={name || 'content'}
                  type="hidden" 
                  value={tipTapEditor?.getHTML() ?? ''}
              />
            )}
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
