/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Icon, SelectableCard, Title } from '../'

import { buildCss } from '../utilities/props'

type SelectableCardIconProps = {
  className?: String,
  icon?: String,
  title?: String,
  text?: String,
  checked?: Boolean,
  onChange?: (e) => void,
}

const SelectableCardIcon = ({
  className,
  icon,
  title,
  text,
  checked,
  onChange,
}: SelectableCardIconProps) => {

  const css = buildCss({
    'pb_selectable_card_icon_kit': true,
    // 'checked': checked,
    // 'unchecked': !checked,
  })

  // console.log(checked)

  return (
    <div className={classnames(css, className)}>
      <SelectableCard
          className="testStyle"
          checked={checked}
          icon={false}
          inputId="selectedWithoutIcon"
          name="selectedWithoutIcon"
          onChange={onChange}
          value="selectedWithoutIcon"
      >
        {
          <>
            <span>
              <Icon
                  className={checked ? 'checked' : 'unchecked'}
                  icon={icon}
                  size="2x"
              />
            </span>
            <Title
                size={4}
                tag="h4"
                text={title}
            />
            <Body
                color="light"
                text={text}
            />
          </>
        }
      </SelectableCard>
    </div>
  )
}

export default SelectableCardIcon
