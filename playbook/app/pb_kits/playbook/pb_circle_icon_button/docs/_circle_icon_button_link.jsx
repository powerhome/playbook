import React from 'react'

import CircleIconButton from '../_circle_icon_button'

const CircleIconButtonLink = (props) => (
  <div>
    <CircleIconButton
        icon="search"
        link="https://google.com"
        variant="primary"
        {...props}
    />

    <br />

    <CircleIconButton
        icon="window"
        link="https://google.com"
        newWindow
        variant="secondary"
        {...props}
    />

    <br/>

    <CircleIconButton
        aria={{ label: "Link to Playbook in new window" }}
        icon="info"
        link="https://playbook.powerapp.cloud/"
        target="child"
        variant="secondary"
    />
  </div>
)

export default CircleIconButtonLink
