import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexSpacing = () => {
  return (
    <>
      <div className="flex-doc-example">
        <Title
            size={4}
            text="None"
        />
        <br />
        <Flex
            className="bg_light"
            spacing="none"
        >
          <FlexItem>
            {'1'}
          </FlexItem>
          <FlexItem>
            {'2'}
          </FlexItem>
          <FlexItem>
            {'3'}
          </FlexItem>
          <FlexItem>
            {'4'}
          </FlexItem>
        </Flex>

        <br />

        <Title
            size={4}
            text="Around"
        />
        <br />
        <Flex
            className="bg_light"
            spacing="around"
        >
          <FlexItem>
            {'1'}
          </FlexItem>
          <FlexItem>
            {'2'}
          </FlexItem>
          <FlexItem>
            {'3'}
          </FlexItem>
          <FlexItem>
            {'4'}
          </FlexItem>
        </Flex>

        <br />

        <Title
            size={4}
            text="Between"
        />
        <br />
        <Flex
            className="bg_light"
            spacing="between"
        >
          <FlexItem>
            {'1'}
          </FlexItem>
          <FlexItem>
            {'2'}
          </FlexItem>
          <FlexItem>
            {'3'}
          </FlexItem>
          <FlexItem>
            {'4'}
          </FlexItem>
        </Flex>

        <br />

        <Title
            size={4}
            text="Evenly"
        />
        <br />
        <Flex
            className="bg_light"
            spacing="evenly"
        >
          <FlexItem>
            {'1'}
          </FlexItem>
          <FlexItem>
            {'2'}
          </FlexItem>
          <FlexItem>
            {'3'}
          </FlexItem>
          <FlexItem>
            {'4'}
          </FlexItem>
        </Flex>
      </div>
    </>
  )
}

export default FlexSpacing
