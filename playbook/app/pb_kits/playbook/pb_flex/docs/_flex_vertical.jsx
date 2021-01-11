import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexVertical = (props) => {
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
            text="Top"
            {...props}
        />
        <br />
        <Flex
            className="bg_light tall"
            vertical="top"
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
            className="bg_light tall"
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
            text="Bottom"
            {...props}
        />
        <br />
        <Flex
            className="bg_light tall"
            vertical="bottom"
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
            className="bg_light tall"
            horizontal="stretch"
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
            text="Top"
            {...props}
        />
        <br />
        <Flex
            className="bg_light tall"
            horizontal="left"
            orientation="column"
            vertical="top"
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
            className="bg_light tall"
            horizontal="center"
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
            text="Bottom"
            {...props}
        />
        <br />
        <Flex
            className="bg_light tall"
            horizontal="bottom"
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
      </div>
    </>
  )
}

export default FlexVertical
