import React from 'react'

import {
  Background,
  Body,
  Caption,
  Flex,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const TOKENS = {
  'Rounded': '$border_radius_rounded',
  'Extra Large': '$border_radius_xl',
  'Large': '$border_radius_lg',
  'Medium': '$border_radius_md',
  'Small': '$border_radius_sm',
  'Extra Small': '$border_radius_xs',
  'None': '$border_radius_none',
}

const DATASET = [
  { name: 'Rounded', class: 'border_radius_rounded' },
  { name: 'Extra Large', class: 'border_radius_xl' },
  { name: 'Large', class: 'border_radius_lg' },
  { name: 'Medium', class: 'border_radius_md' },
  { name: 'Small', class: 'border_radius_sm' },
  { name: 'Extra Small', class: 'border_radius_xs' },
  { name: 'None', class: 'border_radius_none' },
]

const BorderRadius = ({ tokensExample }: { tokensExample: string }) => (
  <React.Fragment>
    <Background
      className="token-wrapper"
      paddingRight="xl"
      paddingLeft="xl"
      paddingTop="xl"
    >
      <Title
        size={1}
        text='Border Radius'
      />
      <Body
        marginBottom='lg'
        marginTop='xs'
        text='We have very specific settings for border radius to keep the interface looking consistent and clean. If you ever need to access these to build new things here are examples for how to do that.'
      />
    </Background>
    <Example
      example={tokensExample}
      tokens={TOKENS}
    >
      <Flex
        align='center'
        flexWrap='wrap'
        justifyContent='center'
        orientation='row'
      >
        {DATASET.map((data: { [key: string]: string }) => (
          <div className='border_radius_container'>
            <div className={data.class} />
            <Title
              marginTop="xs"
              size={4}
              tag="h4"
              text={data.name}
            />
            <Caption
              size="xs"
              text={`$${data.class}`}
            />
          </div>
        ))}
      </Flex>
    </Example>
  </React.Fragment>
)

export default BorderRadius
