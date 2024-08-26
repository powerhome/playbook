import React, { forwardRef, isValidElement, useRef } from 'react'
import Body from '../pb_body/_body'
import Flex from '../pb_flex/_flex'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type RadioProps = {
  aria?: { [key: string]: string },
  alignment?: string,
  checked?: boolean,
  children?: React.ReactChild[] | React.ReactChild,
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
  className,
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
  onChange = () => { void 0 },
  ...props
}: RadioProps ) => {
  const radioRef = useRef(null);

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss('pb_radio_kit', alignment),
    dark ? 'dark' : null,
    error ? 'error' : null,
    globalProps(props),
    className
  );

  const classesCustom = classnames(
    dark ? 'dark' : null,
    error ? 'error' : null,
    globalProps(props),
    className
  );

  const isCustomChild = children && isValidElement(children) && children.type !== 'input';

  const displayRadio = (props: RadioProps & any) => {
    if (isValidElement(children) && children.type === 'input') {
      return React.cloneElement(children, { ...props, ref: radioRef });
    } else if (isCustomChild || !children) {
      return (
        <input
            disabled={disabled}
            id={id}
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
    if (
      event.target.id === 'children-wrapper' ||
      event.target.closest('#children-wrapper')
    ) {
      radioRef.current?.click();
    }
  };

  return (
    isCustomChild ? (
      <Flex 
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          align='center'
          className={classesCustom}
          cursor='pointer'
          htmlFor={id}
          htmlOptions={{onClick: () => handleContainerClick(event)}}
          id="radio-container"
      >
        <label className={buildCss('pb_radio_kit', alignment)}>
          <>{displayRadio(props)}</>
          <span className="pb_radio_button" />
        </label>
        <div id="children-wrapper"> {children} </div>
      </Flex>
    ) : (
      <label
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          htmlFor={id}
      >
        <>{displayRadio(props)}</>
        <span className="pb_radio_button" />
        <Body
            dark={dark}
            status={error ? 'negative' : null}
            text={label}
            variant={null}
        />
      </label>
    )
  );
};

export default forwardRef(Radio);
