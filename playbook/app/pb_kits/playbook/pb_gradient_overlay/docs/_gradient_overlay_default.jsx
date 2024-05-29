import React from 'react'
import {
    GradientOverlay,
    Card,
    Flex,
    FlexItem,
    Table,
    Title 
} from '../../'

const TableExample = () => {
    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th>{'Column 1'}</th>
                    <th>{'Column 2'}</th>
                    <th>{'Column 3'}</th>
                    <th>{'Column 4'}</th>
                    <th>{'Column 5'}</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 7 }, (_, index) => (
                    <tr key={index}>
                        {Array.from({ length: 5 }, (_, columnIndex) => (
                            <td key={columnIndex}>{`Value ${columnIndex + 1}`}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

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

const GradientOverlayDefault = () => (
    <>
        <Title
            marginBottom="md"
            size={4}
            text="Bottom"
        />
        <GradientOverlay
            direction="bottom"
            end="100%"
            gradientColors={["transparent", "white"]}
            start="50%"
        >
            <TableExample />
        </GradientOverlay>

        <Title
            marginBottom="md"
            marginTop="lg"
            size={4}
            text="Sides"
        />
        <GradientOverlay
            direction="sides"
            end="10%"
            gradientColors={["transparent", "white"]}
            start="0%"
        >
            <InlineCardsExample />
        </GradientOverlay>
    </>
)

export default GradientOverlayDefault
