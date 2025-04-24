import React from 'react'

import CircleIconButton from '../_circle_icon_button'
import Flex from '../../pb_flex/_flex'

const CircleIconButtonSize = (props) => (
  <>
    <Flex gap="sm"
        orientation="column"
    >
        <CircleIconButton
            icon="plus"
            size="sm"
            variant="primary"
            {...props}
        />
        <CircleIconButton
            icon="pen"
            loading
            size="sm"
            variant="secondary"
            {...props}
        />
        <CircleIconButton
            disabled
            icon="times"
            size="sm"
            {...props}
        />
        <CircleIconButton
            icon="info"
            link="https://playbook.powerapp.cloud/"
            size="sm"
            target="child"
            variant="link"
            {...props}
        />
    </Flex>
  </>
)

export default CircleIconButtonSize
