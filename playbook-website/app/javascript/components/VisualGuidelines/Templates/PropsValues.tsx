/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

// This template has sections Props, Values, and Example In Use space.
// This template does not have a Visual Guide section.

import React from 'react'
import { Caption, Card, Flex, FlexItem, Pill, SectionSeparator } from 'playbook-ui'

// type Props = {[key: string]: string | number}

const PropsValues = (props: {[key: string]: string[] | number[]}): React.ReactElement => (
  <Flex
      inline="flex-container"
      justifyContent="spaceBetween"
      orientation="row"
      vertical="stretch"
  >
    <React.Fragment>
      <FlexItem flex={1}>
        <Card.Body>
          <Caption
              marginBottom="sm"
              text="Props"
          />
          <Flex
              gap="xs"
              wrap
          >
            { Object.keys(props).map((propKey: string) => (
              <Pill
                  key={propKey}
                  text={propKey}
                  textTransform="none"
              />
            ))}
          </Flex>
        </Card.Body>
      </FlexItem>
      <SectionSeparator
          marginBottom="md"
          marginTop="md"
          orientation="vertical"
          variant="card"
      />
      <FlexItem flex={1}>
        <Card.Body>
          <Caption
              marginBottom="sm"
              text="Values"
          />
          <Flex gap="xs">
            {Object.values(props)[0].map((propValue) => (
              <Pill
                  key={`${propValue}`}
                  text={propValue}
                  textTransform="none"
                  variant="warning"
              />
            ))}
          </Flex>
        </Card.Body>
      </FlexItem>
    </React.Fragment>
  </Flex>
)

export default PropsValues
