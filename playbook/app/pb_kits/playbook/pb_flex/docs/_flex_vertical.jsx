import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexVertical = () => {
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
            text="Top"
        />
        <br />
        <Flex
            className="bg_light tall"
            vertical="top"
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
            className="bg_light tall"
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
            text="Bottom"
        />
        <br />
        <Flex
            className="bg_light tall"
            vertical="bottom"
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
            className="bg_light tall"
            horizontal="stretch"
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
            text="Top"
        />
        <br />
        <Flex
            className="bg_light tall"
            horizontal="left"
            orientation="column"
            vertical="top"

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
            className="bg_light tall"
            horizontal="center"
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
            text="Bottom"
        />
        <br />
        <Flex
            className="bg_light tall"
            horizontal="bottom"
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
      </div>
    </>
  )
}

export default FlexVertical
