import React from 'react'

import {
  Background,
  Body,
  Caption,
  Card,
  Flex,
  Title,
  Table,
} from 'playbook-ui'

import Example from '../Templates/Example'

const ZINDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'max']
const TOKENS = {
  '$z_1': 100,
  '$z_2': 200,
  '$z_3': 300,
  '$z_4': 400,
  '$z_5': 500,
  '$z_6': 600,
  '$z_7': 700,
  '$z_8': 800,
  '$z_9': 900,
  '$z_10': 1000,
  '$z_max': 999999
}

const screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl']
}

const UTILITY_CLASSES = [
  { size: 'xs', media: '@media screen and (max-width: $screen-xs-min)', class: '.z_index_xs_{1-10}', properties: 'z_index: {100-1000} !important' },
  { size: 'sm', media: '@media screen and (max-width: $screen-sm-min)', class: '.z_index_sm_{1-10}', properties: 'z_index: {100-1000} !important' },
  { size: 'md', media: '@media screen and (max-width: $screen-md-min)', class: '.z_index_md_{1-10}', properties: 'z_index: {100-1000} !important' },
  { size: 'lg', media: '@media screen and (max-width: $screen-lg-min)', class: '.z_index_lg_{1-10}', properties: 'z_index: {100-1000} !important' },
  { size: 'xl', media: '@media screen and (max-width: $screen-xl-min)', class: '.z_index_xl_{1-10}', properties: 'z_index: {100-1000} !important' },
]

const globalPropsDescription = (
  <>
    {'Available in every kit. These are added globally as they are most flexible when developing. *Screen sizes are optional.'}
    <p>{'NOTE: For best results, specify a position using the "position" global prop in conjunction with any "zIndex" prop calls.'}</p>
  </>
)

const tokensDescription = (
  <>
    {'Make your own styles using Playbook tokens to keep your site consistent.'}
    <p>{'NOTE: For best results, specify a position value using "position" tokens in conjunction with any "zIndex" style calls.'}</p>
  </>
)

const ZIndex = ({ example, tokensExample }: { example: string, tokensExample?: string }) => (
  <React.Fragment>
    <Example
      description="If you're using Position, you might also find it useful to specify a z-index. We have multiple ways to use z-index, take a look at the examples below:"
      example={example}
      globalProps={{
        zIndex: ZINDEX,
      }}
      globalPropsDescription={globalPropsDescription}
      screenSizes={screenSizeProps}
      title="Z-Index"
    />
    <Background
      className="token-wrapper"
      padding="xl"
    >
      <Title
        marginTop='sm'
        size={4}
        text='Utility Classes'
      />
      <Body
        text='Just want the raw classes? We got you. All of our global props are simple CSS utilities available through classes.'
        marginBottom='sm'
      />
      <Caption
        text='Visual Guide'
        marginBottom='sm'
      />
      <Table
        shadow='deep'
        size='sm'
      >
        <thead>
          <tr>
            <th>{'Screen Size'}</th>
            <th>{'@Media Screen'}</th>
            <th>{'Class'}</th>
            <th>{'Properties'}</th>
          </tr>
        </thead>
        <tbody>
          {UTILITY_CLASSES.map((utilityClass: { [key: string]: string }) => (
            <tr>
              <td>
                {utilityClass.size}
              </td>
              <td>
                {utilityClass.media}
              </td>
              <td>
                {utilityClass.class}
              </td>
              <td>
                {utilityClass.properties}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Background>
    <Example
      example={tokensExample}
      tokens={TOKENS}
      tokensDescription={tokensDescription}
    >
      <div className="zindex-wrapper">
        {Object.keys(TOKENS).map((token) => (
          <Card
            className="zIndex"
            key={`token-example-${token}`}
            shadow="deeper"
            zIndex={token === '$z_max' ? 'max' : TOKENS[token] / 100}
          >
            <Body>{token}</Body>
            <Caption size="md">{`value: ${TOKENS[token]}`}</Caption>
          </Card>
        ))}
      </div>
    </Example>
  </React.Fragment>
)

export default ZIndex
