import React from 'react'
import Example from '../Templates/Example'
import SpacingProps from '../Templates/SpacingProps'
import {
  Body,
  Caption,
  Flex,
  Card,
  Background
} from 'playbook-ui'

const truncate_values = ["none", "1", "2", "3", "4", "5"]
const PROPNAMES = ['truncate']
const TOKENS = {
'$visible': 'visible',
'$hidden': 'hidden',
'$scroll': 'scroll',
'$auto': 'auto'
}
const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minus. Nisi beatae voluptatum labore sequi. Nemo accusantium corrupti, reiciendis magnam tenetur perferendis esse pariatur voluptas eaque hic vel rem nihil quidem dolorum ex dolor, libero ullam placeat, sapiente eos. Cumque obcaecati dignissimos molestiae, minima quibusdam sint maxime libero accusantium animi quis quia maiores enim ipsum, esse, modi laudantium illum error!"
const TruncateDescription = () => (
  <>
    The Truncate prop truncates overflowing text up to a maximum of five rows and adds an ellipsis at the end. This prop only works for the <a href="https://playbook.powerapp.cloud/kit_category/typography?type=react" target="_blank">Typography</a> kits (Title, Body, Caption, Detail).

    For our Rails kits, the Truncate prop will only accept string values, while React kits can accept either string or integer values for the prop.
  </>
)

const Truncate  = ({ example, tokensExample }: { lorem: lorem, example: string, tokensExample?: string }) => (
  <React.Fragment>
    <Example
      description={<TruncateDescription />}
      example={example}
      title="Truncate"
    >
    <SpacingProps propValues={truncate_values} propNames={PROPNAMES} />
    </Example>
        <Background
        className="token-wrapper"
        padding="xl"
    >
    <Card>
      <Flex
            maxWidth="md"
            orientation="column"
      >
        <Caption
            text="After first row"
        />
        <Body
            marginBottom="md"
            text={lorem}
            truncate="1"
        />

        <Caption
            text="After second row"
        />
        <Body
            marginBottom="md"
            text={lorem}
            truncate="2"
        />

        <Caption
            text="After third row"
        />
        <Body
            text={lorem}
            truncate="3"
        />
      </Flex>
    </Card>
    </Background>
  </React.Fragment>
)

export default Truncate
