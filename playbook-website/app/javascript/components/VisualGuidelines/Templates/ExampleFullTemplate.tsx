/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

// This template can be used for examples on the Visual Guidelines page.
// It has sections for a Visual Guide, Props, Values, and Example In Use space.

import React from 'react'
import { Body, Caption, Card, Flex, FlexItem, Pill, SectionSeparator, Title } from 'playbook-ui'

const ExampleFullTemplate = (): React.ReactElement => (
    <div>
        <Title
            size={1}
            paddingTop="xl"
            marginBottom="xs"
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
            rounded
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
                justifyContent="spaceBetween"
                vertical="stretch"
            >
                <FlexItem flex={1}>
                    <Card.Body>
                        <Caption
                            justify="start"
                            marginBottom="sm"
                            text="Props"
                        />
                        <Pill
                            text="propExample"
                            textTransform="none"
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
                            align="left"
                            marginBottom="sm"
                            text="Values"
                        />
                        <Pill
                            text="valueExample"
                            textTransform="none"
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

export default ExampleFullTemplate
