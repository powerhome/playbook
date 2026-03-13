import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'

import Caption from '../pb_caption/_caption'
import colors from '../tokens/exports/_colors.module.scss'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps, noop, buildHtmlProps } from '../utilities/props'
import TipTapEditor from './_tiptap_editor'
import TrixTextEditor from './_trix_editor'

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
  label?: string,
  extensions?: { [key: string]: string }[],
  name?: string,
  onChange: (html: string, text: string) => void,
  placeholder?: string,
  inputHeight?: "sm" | "md" | "lg",
  inputMinHeight?: "sm" | "md" | "lg",
  requiredIndicator?: boolean,
  simple?: boolean,
  sticky?: boolean,
  template: string,
  value?: string,
  maxWidth?: string
  TrixEditor?: React.ComponentType<any>,
  trixInstance?: any,
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
    id,
    inputOptions = {},
    inline = false,
    extensions,
    name,
    onChange = noop,
    placeholder,
    inputHeight,
    inputMinHeight,
    simple = false,
    sticky = false,
    template = '',
    value = '',
    maxWidth = "md",
    requiredIndicator = false,
    label,
    TrixEditor,
    trixInstance: trixInstance = undefined,
  } = props

  const ariaProps = buildAriaProps(aria),
    dataProps = buildDataProps(data),
    [showToolbarOnFocus, setShowToolbarOnFocus] = useState(false),
    containerRef = useRef<HTMLDivElement>(null)

  const htmlProps = buildHtmlProps(htmlOptions)

  const fieldId = id ? (id as string) : null
  const labelElementId = fieldId ? `${fieldId}-label` : undefined
  useEffect(() => {
    if (!advancedEditor || !fieldId || !labelElementId) return

    const dom = advancedEditor.view?.dom as HTMLElement | undefined
    if (!dom) return

    dom.setAttribute("aria-labelledby", labelElementId)
    dom.setAttribute("role", "textbox")
    dom.setAttribute("aria-multiline", "true")
  }, [advancedEditor, fieldId, labelElementId])

  //===========focus prop with advanced editor=================
  const isClickInPopover = (event: Event): boolean => {
    return !!(event.target as Element).closest('.pb_tiptap_toolbar_dropdown_popover')
  }

  const isClickInContainer = (event: Event): boolean => {
    return !!(containerRef.current && containerRef.current.contains(event.target as Node))
  }

  useEffect(() => {
    if (!advancedEditor || !focus) return

    const handleFocus = () => setShowToolbarOnFocus(true)

    const handleClickOutside = (event: Event) => {
      if (isClickInContainer(event) || isClickInPopover(event)) return
      setShowToolbarOnFocus(false)
    }

    const editorElement = advancedEditor?.view?.dom
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
  }, [advancedEditor, focus])

  //============= end focus prop with advanced editor=================

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
  const shouldShowToolbar = focus && advancedEditor ? showToolbarOnFocus : advancedEditorToolbar

  const labelFor = advancedEditor ? fieldId : (id ? id : (inputOptions.id ? `${inputOptions.id}_trix` : undefined))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={css}
        ref={focus ? containerRef : undefined}
    >
    {label && (
      <label
          {...(labelFor ? { htmlFor: labelFor, id: labelElementId } : {})}
          onMouseDown={(e) => {
            if (!advancedEditor || !fieldId) return
            e.preventDefault()
            advancedEditor.commands.focus()
          }}
      >
        {
          requiredIndicator ? (
            <Caption className="pb_text_input_kit_label"
                color="lighter"
                marginBottom="xs"
            >
              {label} <span style={{ color: `${colors.error}` }}>*</span>
            </Caption>
          ) : (
            <Caption
                className="pb_text_input_kit_label"
                color="lighter"
                marginBottom="xs"
                text={label}
            />
          )
        }

      </label>
    )}
      {advancedEditor ? (
        <TipTapEditor
            editor={advancedEditor}
            extensions={extensions}
            inputHeight={inputHeight}
            inputMinHeight={inputMinHeight}
            shouldShowToolbar={shouldShowToolbar}
            simple={simple}
            sticky={sticky}
        >
          {children}
        </TipTapEditor>
      ) : (
        <TrixTextEditor
            TrixEditor={TrixEditor}
            focus={focus}
            id={id}
            inputOptions={inputOptions}
            label={label}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            template={template}
            toolbarBottom={toolbarBottom}
            trixInstance={trixInstance}
            value={value}
        />
      )}
    </div>
  )
}

export default RichTextEditor
