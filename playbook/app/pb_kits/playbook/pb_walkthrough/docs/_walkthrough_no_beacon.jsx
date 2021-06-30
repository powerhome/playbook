import React, { useState } from 'react'
import { Button, Walkthrough } from '../../'

const WalkthroughNoBeacon = (props) => {
  const [state, setState] = useState({
    callback: (data) => {
      if (data.action === 'close' && data.type === 'step:after') {
        // This explicitly stops the tour (otherwise it displays a "beacon" to resume the tour)
        setState({ ...state, run: false })
      }
    },
    run: false,
    steps: [
      {
        title: 'Example Title',
        content: 'Setting the prop - continuous allows the next button to appear and lets the user move to the next step by pressing the next button instead of the beacon',
        target: '.exampleNoBeacon',
        disableBeacon: true,
      },
      {
        title: 'Toggle',
        content: 'Setting the prop - continuous allows the next button to appear and lets the user move to the next step by pressing the next button instead of the beacon',
        target: '.pb_toggle_control',
      },
      {
        title: 'Top Nav',
        content: 'Setting the prop - continuous allows the next button to appear and lets the user move to the next step by pressing the next button instead of the beacon',
        target: '.pb--page--topNav',
      },
    ],
  })

  return (
    <div>
      <div
          className="exampleNoBeacon"
          style={{ 'display': 'inline' }}
      >
        {'Start the Tour. Then click the Beacon to demo the default behavior of the Walkthrough Kit'}
      </div>
      <br />
      <br />
      <Button
          onClick={() => {
            setState({ ...state,
              run: true,
            })
          }}
      >
        {'Start Tour'}
      </Button>
      <br />
      <br />
      <Button
          onClick={() => {
          setState({
            ...state,
            run: false,
          })
        }}
      >
        {'Reset/Stop Tour'}
      </Button>

      <Walkthrough
          run={state.run}
          steps={state.steps}
          {...props}
          continuous
      />
    </div>
  )
}

export default WalkthroughNoBeacon
