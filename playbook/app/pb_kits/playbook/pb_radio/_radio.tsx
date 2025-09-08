import React, { useRef, forwardRef } from 'react'
import Body from '../pb_body/_body'
import Flex from '../pb_flex/_flex'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type RadioProps = {
  aria?: { [key: string]: string },
  alignment?: string,
  checked?: boolean, // removed default assignment here
  children?: React.ReactChild[] | React.ReactChild,
  customChildren?: boolean,
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  error?: boolean,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
  id?: string,
  label: string,
  name?: string,
  value?: string,
  text?: string,
  onChange?: (event: React.FormEvent<HTMLInputElement> | null) => void,
} & GlobalProps

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  aria = {},
  alignment,
  children,
  className,
  customChildren = false,
  dark = false,
  disabled = false,
  error = false,
  data = {},
  htmlOptions = {},
  id,
  label,
  name = 'radio_name',
  text = 'Radio Text',
  value = 'radio_text',
  checked,
  onChange = () => { void 0 },
  ...props
}, ref) => {
  const internalRef = useRef<HTMLInputElement>(null)
  const setRefs = (el: HTMLInputElement) => {
    internalRef.current = el
    if (typeof ref === 'function') {
      ref(el)
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
    }
  }

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(
    buildCss('pb_radio_kit', `${alignment === 'vertical' ? 'vertical' : ''}`),
    dark ? 'dark' : null,
    error ? 'error' : null,
    globalProps(props),
    className
  )

  const classesCustom = classnames(
    dark ? 'dark' : null,
    error ? 'error' : null,
    globalProps(props),
    className
  )

  const checkedProps = checked !== undefined ? { checked } : {}

  const displayRadio = (inputProps: any) => {
    if (children && customChildren === false)
      return children
    else
      return (
        <input
            {...checkedProps}
            disabled={disabled}
            id={id}
            name={name}
            onChange={onChange}
            ref={setRefs}
            type="radio"
            value={value}
            {...inputProps}
        />
      )
  }

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    if (event) {
      const target = event.target as HTMLElement
      if (
        target.id === 'pb-radio-children-wrapper' ||
        target.closest('#pb-radio-children-wrapper')
      ) {
        internalRef.current?.click()
      }
    }
  }

  return customChildren ? (
    <Flex
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        align="center"
        className={classesCustom}
        cursor="pointer"
        htmlFor={id}
        htmlOptions={{
          onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            handleContainerClick(event)
          }) as unknown as () => void
        }}
        id="radio-container"
    >
      <label className={buildCss('pb_radio_kit', alignment)}>
        <input
            {...checkedProps}
            disabled={disabled}
            id={id}
            name={name}
            onChange={onChange}
            ref={setRefs}
            type="radio"
            value={value}
            {...props}
        />
        <span className="pb_radio_button" />
      </label>
      <div id="pb-radio-children-wrapper"> {children} </div>
    </Flex>
  ) : (
    <label
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        htmlFor={id}
    >
      {displayRadio(props)}
      <span className="pb_radio_button" />
      <Body
          dark={dark}
          status={error ? 'negative' : null}
          text={label}
          variant={null}
      />
    </label>
  )
})

Radio.displayName = "Radio"
export default Radio
