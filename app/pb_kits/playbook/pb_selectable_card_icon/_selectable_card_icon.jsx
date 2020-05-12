/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Icon, SelectableCard, Title } from '../'

import { buildCss } from '../utilities/props'

type SelectableCardIconProps = {
  className?: String,
  dark?: Boolean,
  icon?: String,
  inputId?: String,
  name?: String,
  title?: String,
  text?: String,
  value?: String,
  checked?: Boolean,
  onChange?: (e) => void,
}

const SelectableCardIcon = ({
  className,
  dark,
  icon,
  inputId,
  name,
  title,
  text,
  value,
  checked,
  onChange,
}: SelectableCardIconProps) => {

  const css = buildCss({
    'pb_selectable_card_icon_kit': true,
    // 'checked': checked,
    // 'unchecked': !checked,
  })

  return (
    <div className={classnames(css, className)}>
      <SelectableCard
          className=""
          checked={checked}
          dark={dark}
          icon={false}
          inputId={inputId}
          name={name}
          onChange={onChange}
          value={value}
      >
        {
          <>
            <span>
              <Icon
                  icon={icon}
                  size="2x"
              />
            </span>
            <Title
                dark={dark}
                size={4}
                tag="h4"
                text={title}
            />
            <Body
                color="light"
                dark={dark}
                text={text}
            />
          </>
        }
      </SelectableCard>
    </div>
  )
}

export default SelectableCardIcon
