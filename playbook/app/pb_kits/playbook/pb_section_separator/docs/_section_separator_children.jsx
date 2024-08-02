import React from 'react'
import { SectionSeparator, Card, Caption } from 'playbook-ui'

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
