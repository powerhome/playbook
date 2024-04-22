import React from "react"
import Example from "../Templates/Example"
import SpacingProps from "../Templates/SpacingProps"
import { Flex, Avatar, Card, Badge } from "playbook-ui"

const POSITION = ["relative", "absolute", "fixed", "sticky", "static"]
const TOKENS = {
  $relative: "relative",
  $absolute: "absolute",
  $fixed: "fixed",
  $sticky: "sticky",
  $static: "static",
}

const PROPVALUES = [
  "0",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "auto",
  "initial",
  "inherit",
]

const globalPositionExample = `
<Flex justify='center' position='relative'>
  <Avatar
    imageAlt='Terry Johnson Standing'
    imageUrl='https://randomuser.me/api/portraits/men/44.jpg'
    name='Terry Johnson'
    size='lg'
  />
  <Card
    borderNone
    borderRadius='rounded'
    padding='none'

    // ✨ global positioning ✨
    position='absolute'
    bottom="0"
  >
    <Badge rounded text='On Roadtrip' variant='neutral' />
  </Card>
</Flex>
`


const PROPNAMES = ["top", "left", "right", "bottom"]

const Position = ({
  example,
  tokensExample,
  secondExample
}: {
  example: string,
  tokensExample?: string,
  secondExample?: string
}) => (
  <React.Fragment>
    <Example
      description='Specifying position can be useful for customizing page elements and layouts. The examples below demonstrate how you can apply (or override) position:'
      example={example}
      globalProps={{
        position: POSITION,
      }}
      title='Position'
    />
    <Example example={tokensExample} tokens={TOKENS} />
    <Example captionTitle='Avatar with a Card (with a Badge)' example={secondExample}>
      <Flex marginBottom='lg' orientation='column'>
        <Flex justify='center' position='relative'>
          <Avatar
            imageAlt='Terry Johnson Standing'
            imageUrl='https://randomuser.me/api/portraits/men/44.jpg'
            name='Terry Johnson'
            size='lg'
          />
          <Card
            borderNone
            borderRadius='rounded'
            padding='none'
            // ✨ global positioning ✨
            position='absolute'
            bottom='0'
          >
            <Badge rounded text='On Roadtrip' variant='neutral' />
          </Card>
        </Flex>
      </Flex>
      <SpacingProps propValues={PROPVALUES} propNames={PROPNAMES} />
    </Example>

    {/* </Example> */}
  </React.Fragment>
)

export default Position
