import React, { forwardRef } from 'react'
import Overlay from '../../pb_overlay/_overlay'
import Card from '../../pb_card/_card'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

const InlineCardsExample = forwardRef(function InlineCardsExample(ref) {
    return (
        <Flex
            columnGap="lg"
            orientation="row"
            ref={ref}
        >
            {Array.from({ length: 15 }, (_, index) => (
                <FlexItem key={index}>
                    <Card>{"Card Content"}</Card>
                </FlexItem>
            ))}
        </Flex>
    )
})

const OverlayVerticalDynamicMultiDirectional = () => (
    <>
        <Overlay
            color="card_light"
            dynamic
            layout={{"x": "xl"}}
        >
            <InlineCardsExample />
        </Overlay>
    </>
)

export default OverlayVerticalDynamicMultiDirectional
