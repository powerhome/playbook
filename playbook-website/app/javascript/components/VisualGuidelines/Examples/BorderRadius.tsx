import React from 'react'

import {
  Background,
  Body,
  Button,
  Caption,
  Flex,
  Icon,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const BORDER_RADIUS_VALUES = [ "none", "extra small", "small", "medium", "large", "extra large", "rounded" ]
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

const BorderRadius = ({ example, tokensExample }: { example: string, tokensExample: string }) => (
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
        marginBottom='xxs'
        marginTop='xs'
        text='We have very specific settings for border radius to keep the interface looking consistent and clean. If you ever need to access these to build new things here are examples for how to do that.'
      />
      <Button
        link="https://playbook.powerapp.cloud/kits/card/react#border-radius"
        newWindow
        padding="none"
        tabIndex={0}
        variant="link"
      >
        <Body
          variant="link"
        >
          {'See this prop in action in our Card Kit'}
          <Icon
            fixedWidth
            icon="angle-right"
          />
        </Body>
      </Button>
    </Background>
    <Example
        example={example}
        globalProps={{
          borderRadius: BORDER_RADIUS_VALUES,
        }}
    />
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
