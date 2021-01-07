import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexSpacing = (props) => {
  return (
    <>
      <div className="flex-doc-example">
        <Title
            size={4}
            text="None"
            {...props}
        />
        <br />
        <Flex
            className="bg_light"
            spacing="none"
            {...props}
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
            {...props}
        />
        <br />
        <Flex
            className="bg_light"
            spacing="around"
            {...props}
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
            {...props}
        />
        <br />
        <Flex
            className="bg_light"
            spacing="between"
            {...props}
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
            {...props}
        />
        <br />
        <Flex
            className="bg_light"
            spacing="evenly"
            {...props}
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
