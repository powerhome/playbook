/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!
// This template has Visual Guide, Props, Values, and Example space

import React from 'react'
import { Background, Caption, Card, Flex, FlexItem, Pill, SectionSeparator } from 'playbook-ui'
import { Template as TemplateType } from '../types'

const ExampleFullTemplate = ({

  }: TemplateType): React.ReactElement => (
    <div>
        <Card
            marginY="sm"
            shadow="deeper"
            padding="none"
        >
            <FlexItem>
                <Card.Body>
                    <Caption
                        text="Visual Guide"
                        marginBottom="xs"
                    />
                </Card.Body>
            <SectionSeparator
                alignItems="center"
                variant="card"
            />
            </FlexItem>
            <Flex
                orientation="row"
                inline="flex-container"
                vertical="stretch"
            >
                <Card.Body>
                    <FlexItem>
                        <Caption
                            align="left"
                            marginBottom="sm"
                            text="Props"
                        />
                        <Pill
                            text="propExample"
                        />
                    </FlexItem>
                </Card.Body>
                    <SectionSeparator
                        marginTop="md"
                        marginBottom="md"
                        orientation="vertical"
                        variant="card"
                    />
                <Card.Body>
                    <FlexItem>
                        <Caption
                            align="left"
                            marginBottom="sm"
                            text="Values"
                        />
                        <Pill
                            text="propExample"
                            variant="warning"
                        />
                    </FlexItem>
                </Card.Body>
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

export default ExampleFullTemplate
