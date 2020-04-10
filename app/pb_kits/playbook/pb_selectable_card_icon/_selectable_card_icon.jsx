/* @flow */

import React from 'react'
import { Body, Icon, SelectableCard, Title } from '../'

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
  return (
    <div className={className}>
      <SelectableCard
          checked={checked}
          icon={false}
          inputId="selectedWithoutIcon"
          name="selectedWithoutIcon"
          onChange={onChange}
          value="selectedWithoutIcon"
      >
        {
          <>
            <Icon
                icon={icon}
                size="2x"
            />
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
