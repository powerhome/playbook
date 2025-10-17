/* eslint-disable react/no-danger */
/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Background,
  Body,
  Caption,
  Card,
  CircleIconButton,
  Flex,
  FlexItem,
  SectionSeparator,
  Title,
  Tooltip
} from 'playbook-ui'

import PropsValues from './PropsValues'

type ExampleType = {
  backgroundClass?: string,
  children?: React.ReactChild[] | React.ReactChild,
  captionTitle?: string,
  customChildren?: boolean,
  description?: React.ReactChild[] | React.ReactChild | string | (() => JSX.Element),
  example?: string,
  globalProps?: { [key: string]: string[] | number[] | any[] },
  globalPropsDescription?: React.ReactElement | React.ReactElement[] | string,
  screenSizes?: { [key: string]: string[] | number[] },
  secondExample?: string,
  title?: string,
  tokens?: { [key: string]: string | number },
  tokensDescription?: React.ReactElement | React.ReactElement[] | string,
}

const Example = ({
  backgroundClass= '',
  captionTitle="Visual Guide",
  children,
  customChildren,
  description,
  example = '',
  secondExample ='', 
  globalProps,
  globalPropsDescription = '',
  screenSizes,
  title,
  tokens,
  tokensDescription = '',
}: ExampleType): React.ReactElement => {
  const parser = new DOMParser(),
    parsedExample = parser.parseFromString(example, 'text/html'),
    exampleHtml = parsedExample.body.innerHTML,
    defaultGlobalPropsDescription = screenSizes ? 'Available in every kit. These are added globally as they are most flexible when developing. *Screen sizes are optional.' : 'Available in every kit. These are added globally as they are most flexible when developing.',
    defaultTokensDescription = 'Make your own styles using Playbook tokens to keep your site consistent.'

  return (
    <Background
      backgroundColor="light"
      className={`${backgroundClass} token-wrapper`}
      padding="xl"
    >
    <div id={title?.replace(/\s+/g, '')}>
      {title && (
        <Title
            marginBottom="xs"
            size={1}
            tag="h1"
            text={title}
        />
      )}
      {description && (
        <Body marginBottom="lg">
          {description}
        </Body>
      )}
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
            {globalPropsDescription && globalPropsDescription}
            {!globalPropsDescription && defaultGlobalPropsDescription}
          </Body>
        </React.Fragment>
      )}
      { tokens && (
        <React.Fragment>
          <Title
              marginBottom="xs"
              marginTop="lg"
              size={4}
              tag="h4"
              text="Tokens"
          />
          <Body marginBottom="lg">
            {tokensDescription && tokensDescription}
            {!tokensDescription && defaultTokensDescription}
          </Body>
        </React.Fragment>
      )}
      <Card
          padding="none"
          rounded
          shadow="deeper"
      >
        {children && !customChildren && (
          <FlexItem>
            <Card.Body>
              <Caption
                  marginBottom="xs"
                  text={captionTitle}
              />
              { children }
            </Card.Body>
            <SectionSeparator
                alignItems="center"
                variant="card"
            />
          </FlexItem>
        )}
        {children && customChildren && (children)}
        {globalProps && (
          <PropsValues
              globalProps={globalProps}
              screenSizes={screenSizes}
          />
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
                className="highlight pt_sm codeSnippetGuidelines"
                style={{ margin: '0px' }}
            >
              <span dangerouslySetInnerHTML={{ __html: exampleHtml }} />
            </pre>
          </div>
        </Card>
      </Card>
    </div>
    </Background>
  )
}

export default Example
