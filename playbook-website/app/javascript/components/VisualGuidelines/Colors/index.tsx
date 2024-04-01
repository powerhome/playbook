/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from 'react'

import { Background, Title } from 'playbook-ui'
import Example from './Example'
import StatusExample from './StatusExample'

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
  STATUS_SUBTLE,
  TEXT_COLORS,
} from './variables'

const Colors = (): React.ReactElement => (
  <React.Fragment>
    <Background
        className="token-wrapper"
        padding="xl"
    >
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
      <StatusExample
          statusColors={STATUS}
          subtleColors={STATUS_SUBTLE}
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
    </Background>
  </React.Fragment>
)

export default Colors
