import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexHorizontal = () => {
  return (
    <>
      <div className="flex-doc-example">
        <Title
            size={3}
            text="Row"
        />
        <br />
        <Title
            size={4}
            text="Left"
        />
        <br />
        <Flex
            horizontal="left"
            orientation="row"
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
            text="Center"
        />
        <br />
        <Flex
            horizontal="center"
            orientation="row"
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
            text="Right"
        />
        <br />
        <Flex
            horizontal="right"
            orientation="row"
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
            size={3}
            text="Column"
        />
        <br />
        <Title
            size={4}
            text="Left"
        />
        <br />
        <Flex
            orientation="column"
            vertical="left"
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
            text="Center"
        />
        <br />
        <Flex
            orientation="column"
            vertical="center"
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
            text="Right"
        />
        <br />
        <Flex
            orientation="column"
            vertical="right"
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
            text="Stretch"
        />
        <br />
        <Flex
            orientation="column"
            vertical="stretch"
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

export default FlexHorizontal
