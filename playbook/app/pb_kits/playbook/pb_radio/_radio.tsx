import React, { forwardRef, useRef } from 'react'
import Body from '../pb_body/_body'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type RadioProps = {
  aria?: { [key: string]: string },
  alignment?: string,
  checked?: boolean,
  children?: React.ReactChild[] | React.ReactChild,
  childrenPosition?: string,
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
  onChange: (event: React.FormEvent<HTMLInputElement> | null) => void,
} & GlobalProps

const Radio = ({
  aria = {},
  alignment,
  children,
  childrenPosition = "left",
  className,
  dark = false,
  disabled = false,
  error = false,
  htmlOptions = {},
  id,
  label,
  name = 'radio_name',
  text = 'Radio Text',
  value = 'radio_text',
  onChange = () => { void 0 },
  ...props
}: RadioProps, ref: any) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const combinedRef = ref || internalRef;

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps({})
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_radio_kit', alignment),
    dark ? 'dark' : null,
    error ? 'error' : null,
    globalProps(props),
    className
  )

  const handleChildClick = () => {
    if (combinedRef.current) {
      combinedRef.current.click();
    }
  }

  const renderInput = () => (
    <input
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        ref={combinedRef}
        text={text}
        type="radio"
        value={value}
        {...props}
    />
  )

  return (
    <label
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        htmlFor={id}
    >
      {childrenPosition === "left" && (
        <>
          <div onClick={handleChildClick}>
            {children}
          </div>
          {renderInput()}
          <span className="pb_radio_button" />
        </>
      )}
      <Body
          dark={dark}
          status={error ? 'negative' : null}
          text={label}
          variant={null}
        />
        {childrenPosition === "right" && (
          <>
            <span className="pb_radio_button" />
            <div onClick={handleChildClick}>
              {children}
            </div>
            {renderInput()}
      
          </>
        )}
    </label>
  )
}

export default forwardRef(Radio)
