/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!
// This template has Visual Guide, Props, Values, and Example space

import React from 'react'
// import cn from 'classnames'
import { Background, Caption, Card, Flex, FlexItem, SectionSeparator } from 'playbook-ui'
import { Template as TemplateType } from '../types'

const ExampleFullTemplate = ({

  }: TemplateType): React.ReactElement => (
    <React.Fragment>
        <Flex
            paddingBottom="md"
            paddingTop="xs"
            paddingX="md"
        >
            <Card
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
                <SectionSeparator variant="card"/>
                </FlexItem>
                <Flex
                    orientation="row"
                    marginTop="md"
                    inline="flex-container"
                    vertical="stretch"
                >
                    <Card.Body>
                        <FlexItem>
                            <Caption
                                marginBottom="sm"
                                paddingLeft="sm"
                                text="Props"
                            />
                        </FlexItem>
                    </Card.Body>
                        <SectionSeparator
                            orientation="vertical"
                            variant="card"
                        />
                    <Card.Body>
                        <FlexItem>
                            <Caption
                                marginBottom="sm"
                                text="Values"
                            />
                        </FlexItem>
                    </Card.Body>
                </Flex>
                <FlexItem>
                    <Background backgroundColor="category_21">
                        <Caption
                            cn="dark"
                            marginX="xl"
                            paddingBottom="lg"
                            paddingTop="lg"
                            text="EXAMPLE IN USE"
                        />
                    </Background>
                </FlexItem>
            </Card>
        </Flex>
    </React.Fragment>
)

export default ExampleFullTemplate
