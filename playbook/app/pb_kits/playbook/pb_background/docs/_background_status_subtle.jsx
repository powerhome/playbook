import React from 'react'
import { Background } from 'playbook-ui'
import { Flex } from 'playbook-ui'

const BackgroundStatusSubtle = (props) => (
<Flex
    gap="md"
    justify="center"
    wrap
>
    <Background
        backgroundColor="success_subtle"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="warning_subtle"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="error_subtle"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="info_subtle"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="neutral_subtle"
        padding="xl"
        {...props}
    />
    <br />
  </Flex>
)

export default BackgroundStatusSubtle
