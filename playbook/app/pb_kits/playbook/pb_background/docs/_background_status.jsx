import React from 'react'
import { Background } from '../..'

const BackgroundStatus = (props) => (
  <div className="pb--doc-demo-row">
    <Background
        backgroundColor="success"
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
        backgroundColor="error"
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
        backgroundColor="neutral"
        padding="xl"
        {...props}
    />
    <br />
    <Background
        backgroundColor="primary"
        padding="xl"
        {...props}
    />
  </div>
)

export default BackgroundStatus
