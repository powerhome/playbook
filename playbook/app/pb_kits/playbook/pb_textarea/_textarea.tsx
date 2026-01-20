/* eslint-disable react-hooks/rules-of-hooks */

import React, { forwardRef, useEffect, useRef, ChangeEvent, ClipboardEvent } from 'react'
import classnames from 'classnames'

import PbTextarea from '.'
import type { InputCallback } from '../types'

import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'
import colors from '../tokens/exports/_colors.module.scss'

import { stripEmojisForPaste, applyEmojiMask } from '../utilities/emojiMask'

type TextareaProps = {
  aria?: {[key: string]: string},
  characterCount?: string,
  className?: string,
  children?: React.ReactChild[],
  data?: {[key: string]: string},
  disabled?: boolean,
  emojiMask?: boolean,
  error?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  inline?: boolean,
  object?: string,
  method?: string,
  label?: string,
  maxCharacters?: string,
  placeholder?: string,
  value?: string,
  name?: string,
  required?: boolean,
  requiredIndicator?: boolean,
  rows?: number,
  resize: "none" | "both" | "horizontal" | "vertical" | "auto",
  onChange?: InputCallback<HTMLTextAreaElement>,
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
  inline = false,
  resize = 'none',
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
  useEffect(() => {
    if (ref.current && resize === 'auto') {
      PbTextarea.addMatch(ref.current)
    }
  })

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
      const pastedText = e.clipboardData.getData('text')
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

        onChange({ ...e, target: textarea, currentTarget: textarea } as unknown as ChangeEvent<HTMLTextAreaElement>)
      }
    }
  }

  const errorClass = error ? 'error' : null
  const inlineClass = inline ? 'inline' : ''
  const resizeClass = `resize_${resize}`
  const classes = classnames('pb_textarea_kit', errorClass, inlineClass, resizeClass, globalProps(props), className)
  const noCount = typeof characterCount !== 'undefined'
  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const checkIfZero = (characterCount: string | number) => {
    return characterCount == 0 ? characterCount.toString() : characterCount
  }
  const characterCounter = () => {
    return maxCharacters && characterCount ? `${checkIfZero(characterCount)} / ${maxCharacters}` : `${checkIfZero(characterCount)}`
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
    >
    {label && (
      <label>
      {
        requiredIndicator ? (
          <Caption className="pb_text_input_kit_label">
            {label} <span style={{ color: `${colors.error}` }}>*</span>
          </Caption>
        ) : (
          <Caption  className="pb_text_input_kit_label"
              text={label}
          />
        )
      }
      </label>
    )}
      {children || (
        <textarea
            disabled={disabled}
            name={name}
            onChange={emojiMask ? handleChange : onChange}
            onPaste={emojiMask ? handlePaste : undefined}
            placeholder={placeholder}
            ref={ref}
            required={required}
            rows={rows}
            value={value}
            {...props}
        />
      )}

      {error ? (
        <>
          {characterCount ? (
            <Flex
                spacing="between"
                vertical="center"
            >
              <FlexItem>
                <Body
                    margin="none"
                    status="negative"
                    text={error}
                />
              </FlexItem>
              <FlexItem>
                <Caption
                    margin="none"
                    size="xs"
                    text={characterCounter()}
                />
              </FlexItem>
            </Flex>
          ) : (
            <Body
                status="negative"
                text={error}
            />
          )}
        </>
      ) : (
         noCount && (
          <Caption
              margin="none"
              size="xs"
              text={characterCounter()}
          />
        )
      )}
    </div>
  );
}

export default forwardRef(Textarea)
