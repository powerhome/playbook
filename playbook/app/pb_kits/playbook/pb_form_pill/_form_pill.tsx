import React from 'react'
import classnames from 'classnames'
import Title from '../pb_title/_title'
import Icon from '../pb_icon/_icon'
import Avatar from '../pb_avatar/_avatar'
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
    size = '',
    textTransform = 'none',
    color = "neutral",
    data = {},
    tabIndex,
    icon = "",
  } = props

  const iconClass = icon ? "_icon" : ""
  const closeIconSize = size === "small" ? "xs" : "sm"
  const css = classnames(
    `pb_form_pill_kit_${color}${iconClass}`,
    globalProps(props),
    className,
    size === 'small' ? 'small' : null,
    textTransform,
  )

  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

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
          <Title
              className="pb_form_pill_text"
              size={4}
              text={name}
          />
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
          <Title
              className="pb_form_pill_text"
              size={4}
              text={name}
          />
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
          <Title
              className="pb_form_pill_tag"
              size={4}
              text={text}
          />
        </>
      )}
      {(!name && !icon && text) && (
        <Title
            className="pb_form_pill_tag"
            size={4}
            text={text}
        />
      )}
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
