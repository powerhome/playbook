/* @flow */
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
  color?: "primary" | "neutral",
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
    color = "primary",
    data = {},
    tabIndex,
    icon = "",
  } = props

  const iconClass = icon ? "_icon" : ""
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
        {name &&
        <>
        <Avatar
            imageUrl={avatarUrl}
            name={name}
            size="xs"
            status={null}
        />
        <Title
            className="pb_form_pill_text"
            size={4}
            text={name}
        />
        </>
        }
      {icon && 
        <Icon
            className="pb_form_pill_icon"
            icon={icon}
        />
      }
      {text &&
        <Title
            className="pb_form_pill_tag"
            size={4}
            text={text}
        />
      }
      <div
          className="pb_form_pill_close"
          onClick={onClick}
          {...closeProps}
      >
        <Icon
            fixedWidth
            icon="times"
        />
      </div>
    </div>
  )
}
export default FormPill
