import React from 'react'
import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'
import SectionSeparator from '../../pb_section_separator/_section_separator'

const children = (
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
        <SectionSeparator
            {...props}
            lineStyle='dashed'
        >
            {children}
        </SectionSeparator>
    )
}

export default SectionSeparatorChildren
