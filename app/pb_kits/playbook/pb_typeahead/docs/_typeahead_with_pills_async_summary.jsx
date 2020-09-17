/* @flow */

import React from 'react'
import { Body, Flex, FlexItem, Icon } from '../..'

const TypeaheadWithPillsAsyncSummary = () => {
  return (
    <>
      <Flex
          marginBottom="lg"
          vertical="center"
      >
        <FlexItem>
          <Body
              color="light"
          >
            <Icon
                icon="info-circle"
                marginRight="xs"
            />
          </Body>
        </FlexItem>
        <FlexItem>
          <Body
              color="light"
          >
            {'If the data field '}
            <code>{'imageUrl'}</code>
            {' is present, '}
            <code>{'FormPill'}</code>
            {' will receive that field as a prop and display the image. '}
            <br />
            {'Additionally, you can also leverage the callback prop: '}
            <code>{'onMultiValueClick'}</code>
            {' to perform custom work when a '}
            <code>{'MultiValue'}</code>
            {' item is clicked.'}
          </Body>
        </FlexItem>
      </Flex>
    </>
  )
}

export default TypeaheadWithPillsAsyncSummary
