/* @flow */

import React, { forwardRef, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { Body, Caption, Flex, FlexItem } from '../'
import type { InputCallback } from '../types.js'
import { globalProps } from '../utilities/globalProps.js'
import PbTextarea from './'

type TextareaProps = {
  characterCount?: string,
  className?: string,
  children?: array<React.ReactChild>,
  disabled?: boolean,
  error?: string,
  id?: string,
  object?: string,
  method?: string,
  label?: string,
  maxCharacters?: string,
  placeholder?: string,
  value?: string,
  name?: string,
  required?: boolean,
  rows?: number,
  resize: 'none' | 'both' | 'horizontal' | 'vertical' | 'auto',
  onChange?: InputCallback<HTMLTextAreaElement>,
}

const Textarea = ({
  characterCount,
  className,
  children,
  disabled,
  resize = 'none',
  error,
  label,
  maxCharacters,
  name,
  onChange = () => {},
  placeholder,
  required,
  rows = 4,
  value,
  ...props
}: TextareaProps, ref: React.ElementRef<"textarea">) => {

  ref = ref || useRef(false)
  useEffect(() => {
    if (ref.current && resize === "auto") {
      PbTextarea.addMatch(ref.current)
    }
  })


  const errorClass = error ? 'error' : null
  const resizeClass = `resize_${resize}`
  const classes = classnames('pb_textarea_kit', errorClass, resizeClass, globalProps(props), className)

  const characterCounter = () => {
    return maxCharacters && characterCount ? `${checkIfZero(characterCount)} / ${maxCharacters}` : checkIfZero(characterCount)
  }

  const checkIfZero = (characterCount) => {
    return characterCount == 0 ? characterCount.toString() : characterCount
  }

  return (
    <div className={classes}>
      <Caption
          text={label}
      />
      <If condition={children}>
        {children}
        <Else />
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
        <If condition={error}>
          <If condition={characterCount}>
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
            <Else />
            <Body
                status="negative"
                text={error}
            />
          </If>
          <Else />
          <Caption
              margin="none"
              size="xs"
              text={characterCounter()}
          />
        </If>
      </If>
    </div>
  )
}

export default forwardRef(Textarea)
