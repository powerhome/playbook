import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { TrixEditor } from 'react-trix'
// We have to import Tiptap here because it is not compatible with Rails
import { useEditor, EditorContent, Extensions } from '@tiptap/react'
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
  railsAdvancedEditor?: boolean,
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
  tipTapOptions?: {
    extensions?: string[]
  }
} & GlobalProps

const RichTextEditor = (props: RichTextEditorProps): React.ReactElement => {
  const {
    aria = {},
    advancedEditor,
    railsAdvancedEditor,
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
    maxWidth = "md",
    tipTapOptions = {}
  } = props

  const ariaProps = buildAriaProps(aria),
    dataProps = buildDataProps(data),
    [editor, setEditor] = useState<Editor>(),
    [showToolbarOnFocus, setShowToolbarOnFocus] = useState(false),
    containerRef = useRef<HTMLDivElement>(null)

  // POC: hypothetical link for external projects, build extensions array from tipTapOptions for railsAdvancedEditor
  const buildExtensions = (extensionNames?: string[]) => {
    const defaultExtensions = [StarterKit, Link]
    
    if (!extensionNames || extensionNames.length === 0) {
      return defaultExtensions
    }

    // POC: not sure if will work sort of "out of the box/everything goes" like this or will need to permit each of whichever TipTap extensions we want.
    return defaultExtensions
  }

  // Creates TipTap editor when railsAdvancedEditor is true (from Rails)
  const internalDependencyTiptapEditor = useEditor({
    extensions: buildExtensions(tipTapOptions?.extensions),
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const text = editor.getText()
      onChange(html, text)
      
      // POC: Update hidden input for TipTap Rails Advanced Editor form submission
      if (railsAdvancedEditor) {
        const hiddenInput = document.getElementById(`hidden-input-${props.id || 'rich-text-editor'}`)
        if (hiddenInput) {
          (hiddenInput as HTMLInputElement).value = html ?? ''
        }
      }
    },
  }, [railsAdvancedEditor])

  // Uses Internal Dependency TipTap editor if railsAdvancedEditor is true, otherwise uses passed editor instance
  const currentEditor = railsAdvancedEditor ? internalDependencyTiptapEditor : advancedEditor

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
    // POC: Updates advancedEditor to currentEditor in useEffect so focus works for Rails and React Advanced Editors
    if (!currentEditor || !focus) return

    const handleFocus = () => setShowToolbarOnFocus(true)
    
    const handleClickOutside = (event: Event) => {
      if (isClickInContainer(event) || isClickInPopover(event)) return
      setShowToolbarOnFocus(false)
    }

    const editorElement = currentEditor?.view?.dom
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
  }, [currentEditor, focus])

  //============= end focus prop with advanced editor=================

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

  // Determine if toolbar should be shown
  const shouldShowToolbar = focus && currentEditor ? showToolbarOnFocus : advancedEditorToolbar

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={css}
        ref={focus ? containerRef : undefined}
    >
      {
        // POC: Uses currentEditor to render the editor content in return so works for Rails and React Advanced Editors
        currentEditor ? (
          <div 
              className={classnames("pb_rich_text_editor_advanced_container", { 
              ["toolbar-active"]: shouldShowToolbar,
              })}
          >
            {shouldShowToolbar && (
              <EditorToolbar editor={currentEditor}
                  extensions={extensions}
                  simple={simple}
                  sticky={sticky}
              />
            )}
            {/* POC: EditorContent ternary needed for TipTap editor in Rails Advanced Editors*/}
            {railsAdvancedEditor ? <EditorContent editor={currentEditor} /> : <>{children}</>}
            
            {/* POC: Set up hidden input for TipTap Rails Advanced Editor form submission */}
            {railsAdvancedEditor && (
              <input 
                  id={`hidden-input-${props.id || 'rich-text-editor'}`}
                  name={name || 'content'}
                  type="hidden" 
                  value={currentEditor?.getHTML() ?? ''}
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
