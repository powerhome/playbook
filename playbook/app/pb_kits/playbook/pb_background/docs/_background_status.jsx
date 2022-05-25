import React from 'react'
import { Background } from '../..'
import { Flex } from '../..'

const BackgroundStatus = (props) => (
<Flex
    gap="md"
    justify="center"
    wrap
>
    <Background
        backgroundColor="success"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="success_secondary"
        padding="xl"
        {...props}
    />
     <br />
    <Background
        backgroundColor="warning"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="warning_secondary"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="error"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="error_secondary"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="info"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="info_secondary"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="neutral"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="neutral_secondary"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="primary"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="primary_secondary"
        padding="xl"
        {...props}
    />
  </Flex>
)

export default BackgroundStatus
