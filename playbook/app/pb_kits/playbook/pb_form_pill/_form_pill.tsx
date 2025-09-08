import React from 'react'
import classnames from 'classnames'
import Title from '../pb_title/_title'
import Icon from '../pb_icon/_icon'
import Avatar from '../pb_avatar/_avatar'
import Tooltip from '../pb_tooltip/_tooltip'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { buildDataProps, buildHtmlProps } from '../utilities/props'

type FormPillProps = {
  className?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  text: string,
  name?: string,
  onClick?: React.MouseEventHandler<HTMLSpanElement>,
  avatar?: boolean,
  avatarUrl?: string,
  size?: string,
  textTransform?: 'none' | 'lowercase',
  color?: "primary" | "neutral" | "success" | "warning" | "error" | "info" | "data_1" | "data_2" | "data_3" | "data_4" | "data_5" | "data_6" | "data_7" | "data_8" | "windows" | "siding" | "roofing" | "doors" | "gutters" | "solar" | "insulation" | "accessories",
  data?: {[key: string]: string},
  tabIndex?: number,
  icon?: string,
  wrapped?: boolean,
  closeProps?: {
    onClick?: React.MouseEventHandler<HTMLSpanElement>,
    onMouseDown?: React.MouseEventHandler<HTMLSpanElement>,
    onTouchEnd?: React.TouchEventHandler<HTMLSpanElement>,
  },
} & GlobalProps
const FormPill = (props: FormPillProps): React.ReactElement => {
  const {
    className,
    htmlOptions = {},
    id,
    text,
    name,
    onClick = () => undefined,
    avatarUrl,
    closeProps = {},
    wrapped,
    size = '',
    textTransform = 'none',
    color = "primary",
    data = {},
    tabIndex,
    icon = "",
  } = props

  const iconClass = icon ? "icon" : ""
  const closeIconSize = size === "small" ? "xs" : "sm"
  const wrappedClass = wrapped ? "wrapped" : ""

  const filteredProps: FormPillProps = {...props}
  delete filteredProps.truncate

  const css = classnames(
    icon ? 'pb_form_pill_kit_icon' : 'pb_form_pill_kit',
    wrapped ? 'pb_form_pill_wrapped' : null,
    size === 'small' ? 'pb_form_pill_small' : null,
    `pb_form_pill_${color}`,
    `pb_form_pill_${textTransform}`,
     globalProps(filteredProps),
     className,
  )

  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const renderTitle = (content: string, className: string) => {
    const titleComponent = (
      <Title
          className={className}
          size={4}
          text={content}
          truncate={props.truncate}
      />
    )
    if (props.truncate) {
      return (
        <Tooltip
            interaction
            placement="top"
            position="fixed"
            text={content}
        >
          {titleComponent}
        </Tooltip>
      )
    }
    return titleComponent
  }

  return (
    <div className={css}
        id={id}
        tabIndex={tabIndex}
        {...dataProps}
        {...htmlProps}
    >
      {((name && !icon && !text) || (name && !icon && text)) && (
        <>
          <Avatar
              imageUrl={avatarUrl}
              name={name}
              size="xxs"
              status={null}
          />
          {renderTitle(name, "pb_form_pill_text")}
        </>
      )}
      {((name && icon && !text) || (name && icon && text)) && (
        <>
          <Avatar
              imageUrl={avatarUrl}
              name={name}
              size="xxs"
              status={null}
          />
          {renderTitle(name, "pb_form_pill_text")}
          <Icon
              className="pb_form_pill_icon"
              color={color}
              icon={icon}
          />
        </>
      )}
      {(!name && icon && text) && (
        <>
          <Icon
              className="pb_form_pill_icon"
              color={color}
              icon={icon}
          />
          {renderTitle(text, "pb_form_pill_tag")}
        </>
      )}
      {(!name && !icon && text) && renderTitle(text, "pb_form_pill_tag")}
      <div
          className="pb_form_pill_close"
          onClick={onClick}
          {...closeProps}
      >
        <Icon
            fixedWidth
            icon="times"
            size={closeIconSize}
        />
      </div>
    </div>
  )
}

export default FormPill
