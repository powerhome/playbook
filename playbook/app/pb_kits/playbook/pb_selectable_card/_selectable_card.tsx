import React, {useRef} from 'react'
import classnames from 'classnames'

import { globalProps, GlobalProps } from '../utilities/globalProps'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  noop,
  buildHtmlProps } from '../utilities/props'

import Icon from '../pb_icon/_icon'
import Checkbox from '../pb_checkbox/_checkbox'
import Flex from '../pb_flex/_flex'
import Radio from '../pb_radio/_radio'
import Card from '../pb_card/_card'

type SelectableCardProps = {
  aria?: { [key: string]: string },
  checked?: boolean,
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  customIcon?: {[key: string] :SVGElement},
  dark?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  error?: boolean,
  icon?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  inputId?: string,
  id?: string,
  multi?: boolean,
  name?: string,
  onChange: (event: React.FormEvent<HTMLInputElement>) => void,
  text?: string,
  value?: string,
  variant?: string,
} & GlobalProps

const SelectableCard = (props: SelectableCardProps) => {
  const {
    aria = {},
    checked = false,
    className,
    customIcon,
    dark = false,
    data = {},
    disabled = false,
    error = false,
    htmlOptions = {},
    icon = false,
    inputId = null,
    multi = true,
    name,
    onChange = noop,
    text,
    value,
    variant = 'default',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(buildCss('pb_selectable_card_kit',
    {
      'checked': checked,
      'disabled': disabled,
      'enabled': !disabled,
      'display_input': variant === 'displayInput',
    }),
  { error },
  dark ? 'dark' : '',
  className
  )

  const displayIcon = () => {
    if (icon === true) {
      return (
        <div className="pb_selectable_card_circle">
          <Icon
              customIcon={customIcon}
              fixedWidth
              icon="check"
          />
        </div>
      )
    }
  }

  const inputRef = useRef(null)
  // Delegate clicks to hidden input from visible one
  const handleClick = () => {
    inputRef.current.click()
  }

  const inputType = multi ? 'checkbox' : 'radio'
  const inputIdPresent = inputId !== null ? inputId : name
  const Input = multi ? Checkbox : Radio

  const filteredProps = {...props}
  delete filteredProps?.inputId
  delete filteredProps?.children
  delete filteredProps?.icon
  delete filteredProps?.error
  delete filteredProps?.dark
  delete filteredProps?.multi
  delete filteredProps?.customIcon
  const labelProps: GlobalProps = variant === 'displayInput' ? { ...filteredProps, padding: 'none' } : { ...filteredProps }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
    >
      <input
          checked={checked}
          disabled={disabled}
          id={inputIdPresent}
          name={name}
          onChange={onChange}
          ref={inputRef}
          type={inputType}
          value={value}
          {...filteredProps}
      />

      <label
          className={globalProps(labelProps)}
          htmlFor={inputIdPresent}
      >
          {variant === 'displayInput' ? 
            <Flex vertical="center">
              <Flex
                  orientation="column"
                  padding="sm"
                  paddingRight="xs"
                  vertical="center"
              >
                <Input
                    dark={dark}
                >
                  <input
                      checked={checked}
                      disabled={disabled}
                      onClick={handleClick}
                      readOnly
                      type={inputType}
                  />
                </Input>
              </Flex>
              <div className="separator" />
              <div className="psuedo_separator"/>
              <Card
                  borderNone
                  dark={dark}
                  padding="sm"
                  status={error ? 'negative' : null}
              >
                {text ||props.children}
              </Card>
            </Flex>
          :
            text || props.children
             }
          {displayIcon()}
      </label>
    </div>
  )
}
export default SelectableCard
