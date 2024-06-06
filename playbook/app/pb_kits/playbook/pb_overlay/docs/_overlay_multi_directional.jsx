import React from 'react'
import {
    Overlay,
    Card,
    Flex,
    FlexItem,
} from '../..'

const InlineCardsExample = () => {
    return (
        <Flex
            columnGap="lg"
            orientation="row"
            overflowX="auto"
        >
            {Array.from({ length: 15 }, (_, index) => (
                <FlexItem key={index}>
                    <Card>{"Card Content"}</Card>
                </FlexItem>
            ))}
        </Flex>
    )
}

const OverlayMultiDirectional = () => (
    <>
        <Overlay
            color="white"
            layout={{"left-right": "10%"}}
        >
            <InlineCardsExample />
        </Overlay>
    </>
)

export default OverlayMultiDirectional
