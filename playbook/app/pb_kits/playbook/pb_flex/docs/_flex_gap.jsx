import React from 'react'
import { Flex, FlexItem } from 'playbook-ui'

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
    </>
  )
}

export default FlexGap
