/* eslint-disable react/no-danger */
/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Background,
  Body,
  Caption,
  Card,
  FlexItem,
  SectionSeparator,
  Title,
} from 'playbook-ui'

import PropsValues from './PropsValues'

type ExampleType = {
  children?: React.ReactChild[],
  description: string,
  example?: string,
  globalProps?: { [key: string]: string[] | number[] },
  title: string,
}

const Example = ({
  children,
  description,
  example,
  globalProps,
  title,
}: ExampleType): React.ReactElement => {
  const parser = new DOMParser(),
    parsedExample = parser.parseFromString(example, 'text/html'),
    exampleHtml = parsedExample.body.innerHTML

  return (
    <div>
      <Title
          marginBottom="xs"
          marginTop="xl"
          paddingTop="xl"
          size={1}
          tag="h1"
          text={title}
      />
      <Body marginBottom="lg">
        {description}
      </Body>
      { globalProps && (
        <React.Fragment>
          <Title
              marginBottom="xs"
              marginTop="sm"
              size={4}
              tag="h4"
              text="Global Props"
          />
          <Body marginBottom="lg">
            {'Available in every kit. These are added globally as they are most flexible when developing.'}
          </Body>
        </React.Fragment>
      )}
      <Card
          padding="none"
          rounded
          shadow="deeper"
      >
        <FlexItem>
          <Card.Body>
            <Caption
                marginBottom="xs"
                text="Visual Guide"
            />
            { children }
          </Card.Body>
          <SectionSeparator
              alignItems="center"
              variant="card"
          />
        </FlexItem>
        {globalProps && (
          <PropsValues {...globalProps} />
        )}
        <Card
            background="dark"
            className="border_radius_flat"
            dark
            padding="none"
        >
          <Caption
              marginLeft="md"
              paddingBottom="none"
              paddingTop="md"
              text="EXAMPLE IN USE"
          />
          <div className="pb--codeCopy">
            <pre
                className="highlight pt_sm"
                style={{ margin: '0px' }}
            >
              <span dangerouslySetInnerHTML={{ __html: exampleHtml }} />
            </pre>
          </div>
        </Card>
      </Card>
    </div>
  )
}

export default Example
