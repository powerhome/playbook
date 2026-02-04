/* eslint-disable react-hooks/rules-of-hooks */

import React, { forwardRef, useEffect, useRef, ChangeEvent, ClipboardEvent } from "react"
import classnames from "classnames"

import PbTextarea from "."
import type { InputCallback } from "../types"

import { buildAriaProps, buildDataProps, buildHtmlProps } from "../utilities/props"

let pbTextareaIdCounter = 0
const useUniqueId = (prefix = "pb_textarea_") => {
  const idRef = useRef<string | null>(null)
  if (idRef.current === null) {
    pbTextareaIdCounter += 1
    idRef.current = `${prefix}${pbTextareaIdCounter}`
  }
  return idRef.current
}
import { globalProps, GlobalProps } from "../utilities/globalProps"

import Body from "../pb_body/_body"
import Caption from "../pb_caption/_caption"
import Flex from "../pb_flex/_flex"
import FlexItem from "../pb_flex/_flex_item"
import colors from "../tokens/exports/_colors.module.scss"

import { stripEmojisForPaste, applyEmojiMask } from "../utilities/emojiMask"

type TextareaProps = {
  aria?: { [key: string]: string }
  characterCount?: string
  className?: string
  children?: React.ReactChild[]
  data?: { [key: string]: string }
  disabled?: boolean
  emojiMask?: boolean
  error?: string
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) }
  id?: string
  inline?: boolean
  inputOptions?: { [k: string]: any }
  object?: string
  method?: string
  label?: string
  maxCharacters?: string
  placeholder?: string
  value?: string
  name?: string
  required?: boolean
  requiredIndicator?: boolean
  rows?: number
  resize: "none" | "both" | "horizontal" | "vertical" | "auto"
  onChange?: InputCallback<HTMLTextAreaElement>
} & GlobalProps

const Textarea = ({
  aria = {},
  characterCount,
  className,
  children,
  data = {},
  disabled,
  emojiMask = false,
  htmlOptions = {},
  id,
  inline = false,
  inputOptions = {},
  resize = "none",
  error,
  label,
  maxCharacters,
  name,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = () => {},
  placeholder,
  required,
  requiredIndicator = false,
  rows = 4,
  value,
  ...props
}: TextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const generatedId = useUniqueId()

  useEffect(() => {
    if (ref.current && resize === "auto") {
      PbTextarea.addMatch(ref.current)
    }
  })

  const textareaId = inputOptions?.id ?? id ?? generatedId

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // Apply emoji mask if enabled using centralized helper
    if (emojiMask) {
      applyEmojiMask(e.target)
    }
    onChange(e)
  }

  // Handle paste event for emoji mask - updates textarea value, cursor position, and calls onChange
  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    if (emojiMask) {
      const pastedText = e.clipboardData.getData("text")
      const filteredText = stripEmojisForPaste(pastedText)

      if (pastedText !== filteredText) {
        e.preventDefault()
        const textarea = e.currentTarget
        const start = textarea.selectionStart || 0
        const end = textarea.selectionEnd || 0
        const currentValue = textarea.value
        const newValue = currentValue.slice(0, start) + filteredText + currentValue.slice(end)
        const newCursorPosition = start + filteredText.length

        textarea.value = newValue
        textarea.selectionStart = textarea.selectionEnd = newCursorPosition

        onChange({
          ...e,
          target: textarea,
          currentTarget: textarea
        } as unknown as ChangeEvent<HTMLTextAreaElement>)
      }
    }
  }

  const errorClass = error ? "error" : null
  const inlineClass = inline ? "inline" : ""
  const resizeClass = `resize_${resize}`
  const classes = classnames(
    "pb_textarea_kit",
    errorClass,
    inlineClass,
    resizeClass,
    globalProps(props),
    className
  )
  const noCount = typeof characterCount !== "undefined"
  const ariaProps: { [key: string]: string } = buildAriaProps(aria)
  const dataProps: { [key: string]: string } = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  // Extract aria attributes and data from inputOptions to handle separately
  const {
    "aria-describedby": customAriaDescribedBy,
    "aria-invalid": customAriaInvalid,
    data: inputOptionsData,
    ...inputOptionsWithoutAriaAndData
  } = inputOptions || {}

  const textareaDataProps = buildDataProps(inputOptionsData || {})

  const errorId = error ? `${textareaId}-error` : undefined

  // Build aria-describedby: combine error ID with custom if both exist
  const ariaDescribedBy = [errorId, customAriaDescribedBy].filter(Boolean).join(" ")

  const textareaAttrs = {
    "aria-describedby": ariaDescribedBy || undefined,
    "aria-invalid": customAriaInvalid !== undefined ? customAriaInvalid : !!error,
    id: textareaId,
    name,
    rows,
    placeholder,
    value,
    disabled,
    required,
    onChange: emojiMask ? handleChange : onChange,
    onPaste: emojiMask ? handlePaste : undefined,
    ...inputOptionsWithoutAriaAndData,
    ...textareaDataProps
  }

  const checkIfZero = (characterCount?: string | number): string => {
    if (characterCount === undefined || characterCount === null) return ""
    return characterCount == 0 ? characterCount.toString() : String(characterCount)
  }

  const characterCounter = () => {
    return maxCharacters && characterCount
      ? `${checkIfZero(characterCount)} / ${maxCharacters}`
      : `${checkIfZero(characterCount)}`
  }

  return (
    <div {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
    >
      {label && (
        <label htmlFor={textareaId}>
          {requiredIndicator ? (
            <Caption className="pb_text_input_kit_label">
              {label} <span style={{ color: `${colors.error}` }}>{"*"}</span>
            </Caption>
          ) : (
            <Caption className="pb_text_input_kit_label"
                text={label}
            />
          )}
        </label>
      )}
      {children || <textarea ref={ref}
          {...textareaAttrs}
                   />}

      {error ? (
        <>
          {characterCount ? (
            <Flex spacing="between"
                vertical="center"
            >
              <FlexItem>
                <Body
                    aria={{ atomic: "true", live: "polite" }}
                    htmlOptions={{ role: "alert" }}
                    id={errorId}
                    margin="none"
                    status="negative"
                    text={error}
                />
              </FlexItem>
              <FlexItem>
                <Caption margin="none"
                    size="xs"
                    text={characterCounter()}
                />
              </FlexItem>
            </Flex>
          ) : (
            <Body
                aria={{ atomic: "true", live: "polite" }}
                htmlOptions={{ role: "alert" }}
                id={errorId}
                status="negative"
                text={error}
            />
          )}
        </>
      ) : (
        noCount && <Caption margin="none"
            size="xs"
            text={characterCounter()}
                   />
      )}
    </div>
  )
}

export default forwardRef(Textarea)
