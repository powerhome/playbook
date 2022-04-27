/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!
// This template has Visual Guide, Props, Values, and Example space

import React from 'react'
import { Background, Body, Caption, Card, Flex, FlexItem, Title } from 'playbook-ui'
import { Template as TemplateType } from '../types'

const TokensTemplate = ({

  }: TemplateType): React.ReactElement => (
    <div>
        <Title
            marginTop="xl"
            marginBottom="md"
            size={4}
            tag="h4"
            text="Tokens"
        />
            <Body marginBottom="lg">
                {"Make your own styles using Playbook tokens to keep your site consistent"}
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
                    </Card.Body>
                </FlexItem>
            </Flex>
            <Card
                className={`border_radius_flat`}
                background="dark"
                dark
            >
                <Caption
                    marginX="xl"
                    paddingBottom="lg"
                    paddingTop="lg"
                    text="EXAMPLE IN USE"
                />
            </Card>
        </Card>
    </div>
)

export default TokensTemplate
