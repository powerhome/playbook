/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

// This template has sections Props, Values, and Example In Use space.
// This template does not have a Visual Guide section.

import React from 'react'
import { Caption, Card, Flex, FlexItem, Pill, SectionSeparator } from 'playbook-ui'

// type Props = {[key: string]: string | number}


type Props = {
  globalProps: {[key: string]: string[] | number[]} ,
  screenSizes?: {[key: string]: string[] | number[]}
}

const PropsValues = (props: Props): React.ReactElement => {
  return (
  <Flex
      inline="flex-container"
      justifyContent="spaceBetween"
      orientation="row"
      vertical="stretch"
  >
    { Object.keys(props.globalProps).map((propKey: string) => (
      <React.Fragment key={propKey}>
        <FlexItem flex={1}>
          <Card.Body>
            <Caption
                marginBottom="sm"
                text="Props"
            />
            <Pill
                text={propKey}
                textTransform="none"
            />
          </Card.Body>
        </FlexItem>
        <SectionSeparator
            marginBottom="md"
            marginTop="md"
            orientation="vertical"
            variant="card"
        />
        {props.screenSizes && (
          <>
            <FlexItem flex={1}>
              <Card.Body>
                <Caption
                    marginBottom="sm"
                    text="Screen Size"
                />
                {Object.values(props.screenSizes)[0].map((propValue) => (
                  <Pill
                      key={`${propKey}-${propValue}`}
                      text={propValue}
                      textTransform="none"
                      variant="warning"
                  />
                ))}
              </Card.Body>
            </FlexItem>
            <SectionSeparator
                marginBottom="md"
                marginTop="md"
                orientation="vertical"
                variant="card"
            />
          </>
        )}
        <FlexItem flex={1}>
          <Card.Body>
            <Caption
                marginBottom="sm"
                text="Values"
            />
            {Object.values(props.globalProps)[0].map((propValue) => (
              <Pill
                  key={`${propKey}-${propValue}`}
                  text={propValue}
                  textTransform="none"
                  variant="warning"
              />
            ))}
          </Card.Body>
        </FlexItem>
      </React.Fragment>
    ))}
  </Flex>
  )
}


export default PropsValues
