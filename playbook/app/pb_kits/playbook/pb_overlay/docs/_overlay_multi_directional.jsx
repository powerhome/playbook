import React, { forwardRef } from 'react'
import {
    Overlay,
    Card,
    Flex,
    FlexItem,
} from 'playbook-ui'

const InlineCardsExample = forwardRef(function InlineCardsExample(ref) {
    return (
        <Flex
            columnGap="lg"
            orientation="row"
            // overflowX="auto"
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


const OverlayMultiDirectional = () => (
    <>
        <Overlay
            color="card_light"
            layout={{"x": "xl"}}
        >
            <InlineCardsExample />
        </Overlay>
    </>
)

export default OverlayMultiDirectional
