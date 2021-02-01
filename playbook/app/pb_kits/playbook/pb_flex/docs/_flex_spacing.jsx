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
            justify="none"
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
            justify="around"
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
            justify="between"
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
            justify="evenly"
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
