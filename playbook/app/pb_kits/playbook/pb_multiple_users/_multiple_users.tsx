import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Avatar from '../pb_avatar/_avatar'
import Tooltip from '../pb_tooltip/_tooltip'

type MultipleUsersProps = {
  aria?: { [key: string]: string },
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string },
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
  id?: string,
  maxDisplayedUsers?: number,
  reverse?: boolean,
  size?: "md" | "lg" | "sm" | "xl" | "xs" | "xxs",
  tooltip?: boolean,
  users: Array<{ [key: string]: string }>,
}

const MultipleUsers = (props: MultipleUsersProps): React.ReactElement => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    maxDisplayedUsers = 4,
    reverse = false,
    size = 'xs',
    tooltip = false,
    users,
  } = props

  const displayCount =
    users.length > maxDisplayedUsers ? maxDisplayedUsers - 1 : users.length
  const usersToDisplay = users.slice(0, displayCount)

  const reverseClass = reverse === true ? 'reverse' : ''
  const avatarSizeClass = size === 'xxs' ? 'xxs' : 'xs'
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_multiple_users_kit', reverseClass),
    globalProps(props),
    className
  )

  const itemClasses = classnames(
    'pb_multiple_users_item',
    dark && 'dark',
    buildCss('multiple_users_badge', avatarSizeClass)
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {tooltip ?
        <>
          {usersToDisplay.map((avatarData, index) => (
            <Tooltip
                key={"user_tooltip_" + index}
                placement='top'
                text={avatarData.tooltip ? avatarData.tooltip : ''}
                zIndex={10}
            >
              <Avatar
                  {...avatarData}
                  className={"pb_multiple_users_item" + (tooltip ? " user_tooltip" : "")}
                  dark={dark}
                  imageAlt={avatarData.name}
                  key={index}
                  size={size}
              />
            </Tooltip>
          ))}

          {users.length > maxDisplayedUsers &&
            <Tooltip
                placement='top'
                text={
                  <div>
                    {
                      usersToDisplay.length < users.length ? 
                        users.slice(displayCount).map((u, i) => (
                          <div key={i}>{u.tooltip}</div>
                        ))
                      : 
                        ''
                    }
                  </div>
                }
                zIndex={10}
            >
              <div className={itemClasses + (tooltip ? " user_count_tooltip" : "")}>
                {`+${users.length - displayCount}`}
              </div>
            </Tooltip>
          }
        </>
        :
        <>
          {usersToDisplay.map((avatarData, index) => (
            <Avatar
                {...avatarData}
                className="pb_multiple_users_item"
                dark={dark}
                imageAlt={avatarData.name}
                key={index}
                size={size}
            />
          ))}

          {users.length > maxDisplayedUsers &&
            <div className={itemClasses}>
              {`+${users.length - 3}`}
            </div>
          }
        </>
      }

    </div>
  )
}

export default MultipleUsers
