/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from 'react'

import { Title } from 'playbook-ui'
import Example from './Example'

import {
  ACTIONS,
  ACTIVE,
  BACKGROUND,
  BORDER,
  CARDS,
  CATEGORY,
  DATA,
  PRODUCTS,
  SHADOW,
  STATUS,
  TEXT_COLORS
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
    <Example
        colors={BACKGROUND}
        title="Backgrounds"
    />
    <Example
        colors={CARDS}
        title="Cards"
    />
    <Example
        colors={STATUS}
        title="Status"
    />
    <Example
        colors={DATA}
        title="Data"
    />
    <Example
        colors={ACTIONS}
        title="Actions"
    />
    <Example
        colors={ACTIVE}
        title="Active"
    />
    <Example
        colors={BORDER}
        title="Border"
    />
    <Example
        colors={SHADOW}
        title="Shadow"
    />
    <Example
        colors={PRODUCTS}
        title="Product Colors"
    />
    <Example
        colors={CATEGORY}
        title="Category Colors"
    />
  </React.Fragment>
)

export default Colors
