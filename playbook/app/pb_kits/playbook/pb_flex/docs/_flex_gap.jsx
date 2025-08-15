import React from 'react'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Title from '../../pb_title/_title'

const FlexGap = (props) => {
  const count = () => {
    const array = []
    for (let i = 0; i < 40; i++) {
      array.push(i)
    }
    return array
  }

  return (
    <>
      <Title size={4}>Gap</Title>
      <br />
      <div className="flex-doc-example">
        <Flex
            gap="xxs"
            wrap
            {...props}
        >
          {count().map((v, key) => (
            <FlexItem key={key}>
              {v}
            </FlexItem>
            ))}
        </Flex>
      </div>

      <br /><br />

      <Title size={4}>Column Gap</Title>
      <br />
      <div className="flex-doc-example">
        <Flex
            columnGap="lg"
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
      <br /><br />

      <Title size={4}>Row Gap</Title>
      <br />
      <div className="flex-doc-example">
        <Flex
            orientation="column"
            rowGap="xl"
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

      <br /><br />
      <Title size={4}>Responsive</Title>
      <br />
      <div className="flex-doc-example">
        <Flex
            gap={{ xs: "none", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
            wrap
            {...props}
        >
          {count().map((v, key) => (
            <FlexItem key={key}>
              {v}
            </FlexItem>
            ))}
        </Flex>
      </div>
    </>
  )
}

export default FlexGap
