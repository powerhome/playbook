import React from 'react'
import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

const childrenHorizontal = (
    <Card
        borderRadius="rounded"
        justifyContent="center"
        padding="none"
    >
        <Caption
            paddingLeft="xs"
            paddingRight="xs"
            size="xs"
            text="TODAY"
        />
    </Card>
)

const childrenVertical = (
    <Card
        borderRadius="rounded"
        justifyContent="center"
        padding="none"
    >
        <Caption
            paddingLeft="xs"
            paddingRight="xs"
            size="xs"
            text="TODAY"
        />
    </Card>
)

const SectionSeparatorChildren = (props) => {
    return (
        <>
            <SectionSeparator
                {...props}
                lineStyle='dashed'
            >
                {childrenHorizontal}
            </SectionSeparator>
            <Flex
                inline="flex-container"
                marginTop="lg"
                vertical="stretch"
            >
                <FlexItem>
                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
                </FlexItem>
                    <SectionSeparator
                        orientation="vertical"
                        {...props}
                    >
                        {childrenVertical}
                    </SectionSeparator>
                <FlexItem>
                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
                </FlexItem>
            </Flex>
        </>
        
    )
}

export default SectionSeparatorChildren
