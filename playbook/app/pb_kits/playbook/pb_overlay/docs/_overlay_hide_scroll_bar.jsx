import React from 'react'
import {
    Overlay,
    Card,
    Flex,
    FlexItem,
} from 'playbook-ui'

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

const OverlayHideScrollBar = () => (
    <>
        <Overlay
            color="card_light"
            layout={{"x": "xl"}}
            scrollBarNone
        >
            <InlineCardsExample />
        </Overlay>
    </>
)

export default OverlayHideScrollBar
