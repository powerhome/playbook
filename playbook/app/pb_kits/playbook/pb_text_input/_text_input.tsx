import React, { forwardRef, ChangeEvent, ClipboardEvent } from 'react'
import classnames from 'classnames'

import { globalProps, GlobalProps, domSafeProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'

import Flex from '../pb_flex/_flex'
import Card from '../pb_card/_card'
import Caption from '../pb_caption/_caption'
import Body from '../pb_body/_body'
import Icon from '../pb_icon/_icon'
import colors from '../tokens/exports/_colors.module.scss'

import { INPUTMASKS } from './inputMask'
import { stripEmojisForPaste, applyEmojiMask } from '../utilities/emojiMask'

type TextInputProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  dark?: boolean,
  disabled?: boolean,
  emojiMask?: boolean,
  error?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  inline?: boolean,
  name: string,
  label: string,
  mask?: 'currency' | 'zipCode' | 'postalCode' | 'ssn',
  onChange: (e: React.FormEvent<HTMLInputElement>, sanitizedValue?: string) => void,
  placeholder: string,
  required?: boolean,
  requiredIndicator?: boolean,
  type: string,
  value: string | number,
  children: React.ReactElement,
  addOn?: {
    icon?: string,
    alignment?: "right" | "left",
    border?: boolean,
  },
  autoComplete?: boolean | string,
} & GlobalProps

const TextInput = (props: TextInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
  const {
    addOn = { icon: null, alignment: 'right', border: true },
    aria = {},
    className,
    dark = false,
    data = {},
    disabled,
    emojiMask = false,
    error,
    htmlOptions = {},
    id,
    inline = false,
    mask = null,
    name,
    label,
    onChange = () => { void 0 },
    placeholder,
    required,
    type = 'text',
    value = '',
    children = null,
    requiredIndicator = false,
    autoComplete = true,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const filteredProps = {...props}
  if (filteredProps.marginBottom === undefined) {
     filteredProps.marginBottom = "sm"
  }

  const { alignment, border, icon } = addOn
  const addOnAlignment = alignment === 'left' ? 'left' : 'right'
  const borderToChange = addOnAlignment === 'left' ? 'right' : 'left'
  const borderToggle = border === false ? 'off' : 'on'
  const borderCss = `border_${borderToChange}_${borderToggle}`

  const shouldShowAddOn = icon !== null
  const addOnCss = shouldShowAddOn ? 'text_input_wrapper_add_on' : ""
  const addOnDarkModeCardCss = (shouldShowAddOn && dark) ? 'add-on-card-dark' : ""
  const css = classnames([
    'pb_text_input_kit',
    inline ? 'inline' : "",
    error ? 'error' : "",
    globalProps(filteredProps),
    className,
  ])
  const addOnIcon = (
    <Icon
        className="add-on-icon"
        dark={dark}
        fixedWidth={false}
        icon={icon}
    />
  )

  const isMaskedInput = mask && mask in INPUTMASKS

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Apply emoji mask if enabled using centralized helper
    if (emojiMask) {
      applyEmojiMask(e.target)
    }

    if (isMaskedInput) {
      const inputValue = e.target.value

      let cursorPosition = e.target.selectionStart;
      const isAtEnd = cursorPosition === inputValue.length;

      const formattedValue = INPUTMASKS[mask].format(inputValue)

      let sanitizedValue = formattedValue;
      if (INPUTMASKS[mask].sanitize) {
        sanitizedValue = INPUTMASKS[mask].sanitize(formattedValue)
      }

      e.target.value = formattedValue

      // Keep cursor position
      if (!isAtEnd) {
        // Account for extra characters (e.g., commas added/removed in currency)
        if (formattedValue.length - inputValue.length === 1) {
          cursorPosition = cursorPosition + 1
        } else if (mask === "currency" && formattedValue.length - inputValue.length === -1) {
          cursorPosition = cursorPosition - 1
        }
        e.target.selectionStart = e.target.selectionEnd = cursorPosition
      }

      onChange(e, sanitizedValue);
    } else {
      onChange(e)
    }
  }

  // Handle paste event for emoji mask - updates input value, cursor position, and calls onChange
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (emojiMask) {
      const pastedText = e.clipboardData.getData('text')
      const filteredText = stripEmojisForPaste(pastedText)
      
      if (pastedText !== filteredText) {
        e.preventDefault()
        const input = e.currentTarget
        const start = input.selectionStart || 0
        const end = input.selectionEnd || 0
        const currentValue = input.value
        const newValue = currentValue.slice(0, start) + filteredText + currentValue.slice(end)
        const newCursorPosition = start + filteredText.length
        
        input.value = newValue
        input.selectionStart = input.selectionEnd = newCursorPosition
        
        onChange({ ...e, target: input, currentTarget: input } as unknown as ChangeEvent<HTMLInputElement>)
      }
    }
  }

  const childInput = children ? children.type === "input" : undefined

  let formattedValue;
  if (isMaskedInput && value) {
    formattedValue = INPUTMASKS[mask].formatDefaultValue(value.toString())
  } else {
    formattedValue = value
  }

  const errorId = error ? `${id}-error` : undefined

  // Set custom handler between emoji mask and input mask
  const shouldUseCustomHandler = isMaskedInput || emojiMask

  // Filter out emojiMask from props passed to DOM element
  const { emojiMask: _emojiMask, ...domProps } = props

  const textInput = (
    childInput ? React.cloneElement(children, { className: "text_input" }) :
    (<input
        {...domSafeProps(domProps)}
        aria-describedby={errorId}
        aria-invalid={!!error}
        autoComplete={typeof autoComplete === "string" ? autoComplete : ( autoComplete ? undefined : "off" )}
        className="text_input"
        disabled={disabled}
        id={id}
        key={id}
        name={name}
        onChange={shouldUseCustomHandler ? handleChange : onChange}
        onPaste={emojiMask ? handlePaste : undefined}
        pattern={isMaskedInput ? INPUTMASKS[mask]?.pattern : undefined}
        placeholder={placeholder || (isMaskedInput ? INPUTMASKS[mask]?.placeholder : undefined)}
        ref={ref}
        required={required}
        type={type}
        value={formattedValue}
     />)
  )

  const addOnInput = (
    <React.Fragment>
      <Flex
          className={`add-on-${addOnAlignment} ${borderCss}`}
          vertical="center"
      >
        {addOnAlignment == 'left' && <>
          <Card
              className={`${addOnDarkModeCardCss} add-on-card card-left-aligned`}
              dark={dark}
          >
            {addOnIcon}
          </Card>
          {textInput}
        </> }
        {addOnAlignment != 'left' && <>
          {textInput}
          <Card
              className={`${addOnDarkModeCardCss} add-on-card card-right-aligned`}
              dark={dark}
          >
            {addOnIcon}
          </Card>
        </> }
      </Flex>
    </React.Fragment>
  )

  const render = (() => {
    if (children && !childInput) return children
    if (shouldShowAddOn) return addOnInput

    return textInput
  })()

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={css}
    >
      {label && (
        <label htmlFor={id}>
          {
            requiredIndicator ? (
              <Caption
                  className="pb_text_input_kit_label"
                  color="lighter"
                  dark={dark}
              >
                {label} <span style={{ color: dark ? colors.text_error_dark : colors.text_error }}>*</span>
              </Caption>
            ) : (
                <Caption
                    className="pb_text_input_kit_label"
                    color="lighter"
                    dark={dark}
                    text={label}
              />
            )
          }

        </label>
      )}
      <div className={`${addOnCss} text_input_wrapper`}>
        {render}

        {error && <Body
            aria={{ atomic: "true", live: "polite" }}
            htmlOptions={{ role: "alert" }}
            id={errorId}
            status="negative"
            text={error}
            variant={null}
                  />
        }
      </div>
    </div>
  )
}

export default forwardRef(TextInput)
