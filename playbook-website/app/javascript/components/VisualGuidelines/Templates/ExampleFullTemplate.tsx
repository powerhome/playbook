/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!
// This template has Visual Guide, Props, Values, and Example space

import React from 'react'
// import cn from 'classnames'
import { Background, Card, Flex, FlexItem, Caption, SectionSeparator } from 'playbook-ui'
import { Template as TemplateType } from '../types'

const ExampleFullTemplate = ({

  }: TemplateType): React.ReactElement => (
    <React.Fragment>
        <Flex
            paddingBottom="md"
            paddingTop="xs"
            paddingX="md"
        >
            <Card shadow="deep">
                <FlexItem>
                    <Card
                        paddingX="md"
                        paddingTop="md"
                        paddingBottom="xs"
                    >
                        <Caption
                            text="Visual Guide"
                            marginBottom="xs"
                        />
                    </Card>
                </FlexItem>
                <SectionSeparator padding="sm"/>
                <FlexItem flex={1}>
                    <Caption
                        marginBottom="sm"
                        text="Props"
                    />
                </FlexItem>
                <SectionSeparator
                    marginX="sm"
                    orientations="vertical"
                />
                <FlexItem flex={1}>
                    <Caption
                        marginBottom="sm"
                        text="Values"
                    />
                </FlexItem>
                <FlexItem>
                    <Background
                        cn="border-bottom"
                        backroundColor="dark"
                    >
                        <Caption
                            cn="dark"
                            marginX="xl"
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
