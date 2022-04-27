/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!
// This template has Props, Values, and Example space

import React from 'react'
import { Background, Body, Caption, Card, Flex, FlexItem, Pill, SectionSeparator, Title } from 'playbook-ui'
import { Template as TemplateType } from '../types'

const PropsValuesTemplate = ({

  }: TemplateType): React.ReactElement => (
    <div>
        <Title
            size={1}
            paddingTop="xl"
            marginBottom="sm"
            marginTop="xl"
            tag="h1"
            text="Title 1"
        />
            <Body marginBottom="lg">
                {"Example text to explain how this section works."}
            </Body>
        <Title
            marginTop="sm"
            marginBottom="xs"
            size={4}
            tag="h4"
            text="Global Props"
        />
            <Body marginBottom="lg">
                {"Available in every kit. These are added globally as they are most flexible when developing."}
            </Body>
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
            <Card
                className={`border_radius_flat`}
                background="dark"
                dark
            >
                <Caption
                    marginLeft="sm"
                    paddingBottom="sm"
                    paddingTop="xs"
                    text="EXAMPLE IN USE"
                />
            </Card>
        </Card>
    </div>
)

export default PropsValuesTemplate
