/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from 'react'

import { Title } from 'playbook-ui'
import Example from './Example'

import {
  TEXT_COLORS,
} from './variables'

const Colors = (): React.ReactElement => (
  <React.Fragment>
    <Title
        marginBottom="lg"
        size={1}
        tag="h1"
    >
      {'Colors'}
    </Title>
    <Example
        colors={TEXT_COLORS}
        title="Text Colors"
    />
  </React.Fragment>
)

export default Colors
