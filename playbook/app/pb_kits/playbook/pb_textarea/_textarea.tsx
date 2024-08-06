/* eslint-disable react-hooks/rules-of-hooks */

import React, { forwardRef, useEffect, useRef } from 'react'
import classnames from 'classnames'

import PbTextarea from '.'
import type { InputCallback } from '../types'

import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'

type TextareaProps = {
  aria?: {[key: string]: string},
  characterCount?: string,
  className?: string,
  children?: React.ReactChild[],
  data?: {[key: string]: string},
  disabled?: boolean,
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
      <Caption text={label} />
      {children || (
        <textarea
            className="pb_textarea_kit"
            disabled={disabled}
            name={name}
            onChange={onChange}
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
