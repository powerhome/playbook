/* @flow */

import React from 'react'
import { Caption, Icon, Title } from '../'

type SelectableCardIconProps = {
  className?: String,
}

const SelectableCardIcon = ({
  className,
}: SelectableCardIconProps) => (
  <div>
    {className}
    <Icon
        icon="user"
        size="lg"
    />
    <Title
        size={4}
        tag="h4"
        text="Title"
    />
    <Caption
        size="xs"
        text="Some text that might explain"
    />
  </div>
)

export default SelectableCardIcon
