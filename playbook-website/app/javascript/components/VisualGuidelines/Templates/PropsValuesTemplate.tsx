/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!
// This template has Visual Guide, Props, Values, and Example space

import React from 'react'
import { Background, Caption, Card, Flex, FlexItem, Pill, SectionSeparator } from 'playbook-ui'
import { Template as TemplateType } from '../types'

const PropsValuesTemplate = ({

  }: TemplateType): React.ReactElement => (
    <div>
        <Card
            marginY="sm"
            shadow="deeper"
            padding="none"
        >
            <Flex
                orientation="row"
                inline="flex-container"
                justifyContent="spaceBetween"
                vertical="stretch"
            >
                <FlexItem flex={1}>
                    <Card.Body>
                        <Caption
                            marginBottom="sm"
                            text="Props"
                        />
                        <Pill
                            text="propExample"
                        />
                    </Card.Body>
                </FlexItem>
                    <SectionSeparator
                        marginTop="md"
                        marginBottom="md"
                        orientation="vertical"
                        variant="card"
                    />
                <FlexItem flex={1}>
                    <Card.Body>
                        <Caption
                            marginBottom="sm"
                            text="Values"
                        />
                        <Pill
                            text="valueExample"
                            variant="warning"
                        />
                    </Card.Body>
                </FlexItem>
            </Flex>
            <FlexItem>
                <Background backgroundColor="category_21">
                    <Caption
                        marginX="xl"
                        paddingBottom="lg"
                        paddingTop="lg"
                        text="EXAMPLE IN USE"
                    />
                </Background>
            </FlexItem>
        </Card>
    </div>
)

export default PropsValuesTemplate
