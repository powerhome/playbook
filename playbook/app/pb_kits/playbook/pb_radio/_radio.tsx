import React, { forwardRef, isValidElement, useRef } from 'react'
import Body from '../pb_body/_body'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type RadioProps = {
  aria?: {[key: string]: string},
  alignment?: string,
  checked?: boolean,
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  dark?: boolean,
  data?: {[key: string]: string},
  disabled?: boolean,
  error?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  label: string,
  name?: string,
  value?: string,
  text?: string,
  onChange: (event: React.FormEvent<HTMLInputElement> | null)=>void,
} & GlobalProps

const Radio = ({
  aria = {},
  alignment,
  children,
  className,
  dark = false,
  data = {},
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
  const radioRef = useRef(null);
  
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_radio_kit', alignment ),
    dark ? 'dark': null, error ? 'error': null,
    globalProps(props),
    className)

  const displayRadio = (props: RadioProps & any) => {
    if (isValidElement(children) && children.type === 'input') {
      return React.cloneElement(children, { ...props, ref: radioRef });
    } else if (isValidElement(children) && children.type !== 'input' || !children) {
      return (
        <input
            disabled={disabled}
            id="hello"
            name={name}
            onChange={onChange}
            ref={radioRef}
            text={text}
            type="radio"
            value={value}
            {...props}
        />
      );
    }
  };

  const handleContainerClick = (event) => {
    // Check if the click originated from the div (custom component)
    if (
      event.target.id === 'custom-div-component' ||
      event.target.closest('#custom-div-component')
    ) {
      // Trigger the radio button click using the ref
      radioRef.current?.click();
    }
  }

  return (
    <div 
        id="radio-container"
        onClick={handleContainerClick}
    >
      <label
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          htmlFor="hello"
      >
        <>{displayRadio(props)}</>
        <span className="pb_radio_button" />
        {children && isValidElement(children) && children.type !== 'input' ? (
          null 
        ) : (
          <Body
              dark={dark}
              status={error ? 'negative' : null}
              text={label}
              variant={null}
          />
        )}
      </label>
      {children && isValidElement(children) && children.type !== 'input' && (
        <div id="custom-div-component"> {children} </div>
      )}
    </div>
  )
}

export default forwardRef(Radio)
