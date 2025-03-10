import React from 'react'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Title from '../../pb_title/_title'

const FlexReverse = (props) => {
  return (
    <>
      <div className="flex-doc-example">
        <Title
            size={4}
            text="Row"
            {...props}
        />
        <br />
        <Flex
            className="bg_light"
            justify="start"
            orientation="row"
            reverse
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
            text="Column"
            {...props}
        />
        <br />
        <Flex
            align="start"
            className="bg_light"
            orientation="column"
            reverse
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

export default FlexReverse
