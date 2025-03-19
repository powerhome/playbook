import React from 'react'
import Background from '../../pb_background/_background'
import Flex from "../../pb_flex/_flex"

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
