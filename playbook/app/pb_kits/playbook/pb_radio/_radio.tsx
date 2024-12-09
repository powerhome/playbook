/*eslint-disable react/no-multi-comp */

import React, { forwardRef, useRef } from 'react'
import { FieldValues } from 'react-hook-form'
import Body from '../pb_body/_body'
import Flex from '../pb_flex/_flex'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { HookFormProps, withHookForm } from '../utilities/hookFormProps'

type RadioProps<T extends FieldValues = FieldValues> = {
  aria?: { [key: string]: string },
  alignment?: string,
  checked?: boolean,
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
} & GlobalProps & Partial<HookFormProps<T>>

type RadioComponent = <T extends FieldValues = FieldValues>(
  props: RadioProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement

const Radio = <T extends FieldValues = FieldValues>({
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
  register,
  rules,
  text = 'Radio Text',
  value = 'radio_text',
  onChange,
  ...props
}: RadioProps<T>, ref: React.Ref<HTMLInputElement>) => {
  const radioRef = useRef<HTMLInputElement>(null);
  const hookFormProps = name ? withHookForm({ register, name, rules }) : {}

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss('pb_radio_kit', alignment || ''),
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

  const displayRadio = (props: RadioProps<T> & any) => {
    if (children && customChildren == false)
      return (children)
    else
    return (
    <input
        {...hookFormProps}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange || hookFormProps.onChange}
        ref={ref || hookFormProps.ref}
        text={text}
        type="radio"
        value={value}
        {...props}
    />
  )}

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    if (event) {
      const target = event.target as HTMLElement;
      if (
        target.id === 'pb-radio-children-wrapper' ||
        target.closest('#pb-radio-children-wrapper')
      ) {
        radioRef.current?.click();
      }
    }
  };

  return (
    customChildren ? (
      <Flex 
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          align='center'
          className={classesCustom}
          cursor='pointer'
          htmlFor={id}
          htmlOptions={{
            onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              handleContainerClick(event);
            }) as unknown as () => void
          }}
          id="radio-container"
      >
        <label className={buildCss('pb_radio_kit', alignment || '')}>
        <input
            {...hookFormProps}
            disabled={disabled}
            id={id}
            name={name}
            onChange={onChange || hookFormProps.onChange}
            ref={radioRef}
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
        <>{displayRadio(props)}</>
        <span className="pb_radio_button" />
        <Body
            dark={dark}
            status={error ? 'negative' : undefined}
            text={label}
            variant={undefined}
        />
      </label>
    )
  );
};

export default forwardRef(Radio) as RadioComponent;