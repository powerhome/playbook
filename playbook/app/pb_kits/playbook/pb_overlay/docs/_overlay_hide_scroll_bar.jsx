import React from 'react'

import Overlay from '../../pb_overlay/_overlay'
import Card from '../../pb_card/_card'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

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
