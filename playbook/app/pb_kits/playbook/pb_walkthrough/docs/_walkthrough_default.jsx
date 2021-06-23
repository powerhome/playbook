import React, { useState } from 'react'
import { Button, Walkthrough } from '../../'

const WalkthroughDefault = (props) => {
  const [run, setRun] = useState(false)
  const steps = [
    {
      title: 'Example title',
      content:
        'This was an example of a Beacon in the Walkthrough Kit it is used as a simple indicator to inform users about a particular thing',
      target: '.example',
    },
    {
      title: 'Toggle Title 2',
      content:
        'By default the walkthrough kit will cycle through each step provided.',
      target: '.pb_toggle_control',
    },
  ]
  return (
    <div>
      <div
          className="example"
          style={{ 'display': 'inline' }}
      >
        {'Click this Beacon to demo the default behavior of the Walkthrough Kit'}
      </div>
      <br />
      <Button
          onClick={() => {
            setRun(true)
          }}
      >
        {'Start Tour'}
      </Button>

      <Walkthrough
          run={run}
          steps={steps}
          {...props}
      />
    </div>
  )
}

export default WalkthroughDefault
