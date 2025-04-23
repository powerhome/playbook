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
            size="small"
            variant="primary"
            {...props}
        />
        <CircleIconButton
            icon="pen"
            loading
            size="small"
            variant="secondary"
            {...props}
        />
        <CircleIconButton
            disabled
            icon="times"
            size="small"
            {...props}
        />
        <CircleIconButton
            icon="info"
            link="https://playbook.powerapp.cloud/"
            size="small"
            target="child"
            variant="link"
            {...props}
        />
    </Flex>
  </>
)

export default CircleIconButtonSize
