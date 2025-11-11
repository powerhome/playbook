import React from 'react'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Title from '../../pb_title/_title'

const FlexItemExample = (props) => {
  return (
    <>
      <Title
          size={4}
          text="Display Flex"
      />
      <br />
      <div className="flex-doc-example">
        <FlexItem
            displayFlex
            gap="xs"
            htmlOptions={{style: {padding:"2px"}}}
            {...props}
        >
          <FlexItem>
            {'We'}
          </FlexItem>
          <FlexItem>
            {'Are'}
          </FlexItem>
          <FlexItem>
            {'Being'}
          </FlexItem>
          <FlexItem>
            {'Flexed'}
          </FlexItem>
        </FlexItem>
      </div>

      <br />
      <Title
          size={4}
          text="Grow"
      />
      <br />
      <div className="flex-doc-example">
        <Flex
            gap="xs"
            {...props}
        >
          <FlexItem grow>
            {'I\'m growing'}
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

      <br />
      <Title
          size={4}
          text="Shrink"
      />
      <br />

      <div className="flex-doc-example">
        <Flex
            gap="xs"
            {...props}
        >
          <FlexItem>
            {'I\'m shrinking'}
          </FlexItem>
          <FlexItem flex={1}>
            {'2'}
          </FlexItem>
          <FlexItem flex={1}>
            {'3'}
          </FlexItem>
          <FlexItem flex={1}>
            {'4'}
          </FlexItem>
        </Flex>
      </div>
      <br />
      <Title
          size={4}
          text="Fixed Size"
      />
      <br />
      <div className="flex-doc-example">
        <Flex
            gap="xs"
            {...props}
        >
          <FlexItem fixedSize="250px">
            {'I\'m 250px'}
          </FlexItem>
          <FlexItem flex={1}>
            {'2'}
          </FlexItem>
          <FlexItem flex={1}>
            {'3'}
          </FlexItem>
          <FlexItem flex={1}>
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />
      <Title
          size={4}
          text="Flex"
      />
      <br />
      <div className="flex-doc-example">
        <Flex
            gap="xs"
            {...props}
        >
          <FlexItem flex={1}>
            {'1'}
          </FlexItem>
          <FlexItem flex={3}>
            {'2'}
          </FlexItem>
          <FlexItem flex={1}>
            {'3'}
          </FlexItem>
          <FlexItem flex={2}>
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />
      <Title
          size={4}
          text="Order"
      />
      <br />
      <div className="flex-doc-example">
        <Flex
            gap="xs"
            {...props}
        >
          <FlexItem order={4}>
            {'1'}
          </FlexItem>
          <FlexItem order={2}>
            {'2'}
          </FlexItem>
          <FlexItem order={1}>
            {'3'}
          </FlexItem>
          <FlexItem order={3}>
            {'4'}
          </FlexItem>
        </Flex>
      </div>
    </>
  )
}

export default FlexItemExample
