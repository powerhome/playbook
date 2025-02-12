import React from 'react'
import { Icon, SectionSeparator, Button, Flex, FlexItem } from 'playbook-ui'

const PlaygroundHeader = () => {
  return (
    <>
      <Flex orientation="row" justify="between">
        <Flex orientation="row">
        <FlexItem>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Go Back"
            >
              <Icon color="primary" fixedWidth icon="chevron-left" size="2x"  marginTop='xxs'/>
            </button>

         </FlexItem>

    </Flex>
        <FlexItem justify="end">
          <Button text="Share" />
        </FlexItem>
    </Flex>

      <SectionSeparator />
    </>
  );
}

export default PlaygroundHeader;
