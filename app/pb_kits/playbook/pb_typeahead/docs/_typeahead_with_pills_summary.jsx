// @flow

import React from 'react'
import { Body, Icon } from '../..'

const TypeaheadWithPillsSummary = () => {
  return (
    <>
      <Body
          color="light"
          marginBottom="lg"
      >
        <Icon
            icon="info-circle"
            marginRight="xs"
        />
        {'Typeahead kit is data-driven. The minimum default fields are '}
        <code>{'label'}</code>
        {' and '}
        <code>{'value'}</code>
        {'.'}
      </Body>
    </>
  )
}

export default TypeaheadWithPillsSummary
