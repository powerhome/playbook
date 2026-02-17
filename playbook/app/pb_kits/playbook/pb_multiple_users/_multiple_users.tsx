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
  withTooltip?: boolean,
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
    withTooltip = false,
    users,
  } = props

  const displayCount =
    users.length > maxDisplayedUsers ? Math.max(1, maxDisplayedUsers - 1) : users.length
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

  const shouldApplyOverlapClass = (index: number, length: number): boolean => {
    return reverse ? index < length - 1 : index > 0;
  }

  const renderAvatar = (avatarData: { [key: string]: string; }, index: number) => {
    const avatar = (
      <Avatar
          {...avatarData}
          className={`pb_multiple_users_item${shouldApplyOverlapClass(index, usersToDisplay.length) ? ' pb_multiple_users_overlap' : ''}`}
          dark={dark}
          imageAlt={avatarData.name}
          size={size}
      />
    );

    if (withTooltip) {
      return (
        <Tooltip
            key={"user_tooltip_" + index}
            placement='top'
            text={avatarData.tooltip ? avatarData.tooltip : ''}
            zIndex={10}
        >
          {avatar}
        </Tooltip>
      );
    }

    return <div key={index}>{avatar}</div>;
  };

  const renderCountBadge = () => {
    const badge = (
      <div className={itemClasses + " pb_multiple_users_count_overlap"}>
        {`+${users.length - displayCount}`}
      </div>
    );

    if (withTooltip) {
      return (
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
          {badge}
        </Tooltip>
      );
    }

    return badge;
  };

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {usersToDisplay.map((avatarData, index) => renderAvatar(avatarData, index))}

      {users.length > maxDisplayedUsers && renderCountBadge()}

    </div>
  );
};

export default MultipleUsers;
