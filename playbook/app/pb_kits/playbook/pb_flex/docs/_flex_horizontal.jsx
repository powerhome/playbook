import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexHorizontal = (props) => {
  return (
    <>
      <div className="flex-doc-example">
        <Title
            size={3}
            text="Row"
            {...props}
        />
        <br />
        <Title
            size={4}
            text="Left"
            {...props}
        />
        <br />
        <Flex
            horizontal="left"
            orientation="row"
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
            text="Center"
            {...props}
        />
        <br />
        <Flex
            horizontal="center"
            orientation="row"
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
            text="Right"
            {...props}
        />
        <br />
        <Flex
            horizontal="right"
            orientation="row"
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
            size={3}
            text="Column"
            {...props}
        />
        <br />
        <Title
            size={4}
            text="Left"
            {...props}
        />
        <br />
        <Flex
            orientation="column"
            vertical="left"
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
            text="Center"
            {...props}
        />
        <br />
        <Flex
            orientation="column"
            vertical="center"
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
            text="Right"
            {...props}
        />
        <br />
        <Flex
            orientation="column"
            vertical="right"
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
            text="Stretch"
            {...props}
        />
        <br />
        <Flex
            orientation="column"
            vertical="stretch"
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

export default FlexHorizontal
