import React, { forwardRef } from 'react'
import classnames from 'classnames'

import { globalProps, GlobalProps, domSafeProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'

import Flex from '../pb_flex/_flex'
import Card from '../pb_card/_card'
import Caption from '../pb_caption/_caption'
import Body from '../pb_body/_body'
import Icon from '../pb_icon/_icon'

type TextInputProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  dark?: boolean,
  disabled?: boolean,
  error?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  inline?: boolean,
  name: string,
  label: string,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void,
  placeholder: string,
  required?: boolean,
  type: string,
  value: string | number,
  children: React.ReactElement,
  addOn?: {
    icon?: string,
    alignment?: "right" | "left",
    border?: boolean,
  },
} & GlobalProps

const TextInput = (props: TextInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
  const {
    addOn = { icon: null, alignment: 'right', border: true },
    aria = {},
    className,
    dark = false,
    data = {},
    disabled,
    error,
    htmlOptions = {},
    id,
    inline = false,
    name,
    label,
    onChange = () => { void 0 },
    placeholder,
    required,
    type = 'text',
    value = '',
    children = null,
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

  const childInput = children ? children.type === "input" : undefined

  const textInput = (
    childInput ? React.cloneElement(children, { className: "text_input" }) :
    (<input
        {...domSafeProps(props)}
        className="text_input"
        disabled={disabled}
        id={id}
        key={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        required={required}
        type={type}
        value={value}
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
      {label &&
        <Caption
            className="pb_text_input_kit_label"
            text={label}
        />
      }
      <div className={`${addOnCss} text_input_wrapper`}>
        {render}

        {error && <Body
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
