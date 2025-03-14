import React, { useState } from 'react'
import Button from '../../pb_button/_button'
import Walkthrough from '../../pb_walkthrough/_walkthrough'

const WalkthroughNoOverlay = (props) => {
  const [noOverlay, setNoOverlayState] = useState({
    callback: (data) => {
      if (data.action === 'close' && data.type === 'step:after') {
        // This explicitly stops the tour (otherwise it displays a "beacon" to resume the tour)
        setNoOverlayState({ ...noOverlay, run: false })
      }
    },
    disableOverlay: true,
    run: false,
    steps: [
      {
        title: 'Example Title',
        content: 'Setting the prop - continuous allows the next button to appear and lets the user move to the next step by pressing the next button instead of the beacon',
        target: '.exampleNoOverlay',
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
          className="exampleNoOverlay"
          style={{ 'display': 'inline' }}
      >
        {'Start the Tour. Then click the Beacon to demo the default behavior of the Walkthrough Kit'}
      </div>
      <br />
      <br />
      <Button
          onClick={() => {
            setNoOverlayState({ ...noOverlay,
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
          setNoOverlayState({
            ...noOverlay,
            run: false,
          })
        }}
      >
        {'Reset/Stop Tour'}
      </Button>

      <Walkthrough
          disableOverlay
          run={noOverlay.run}
          steps={noOverlay.steps}
          {...props}
      />
    </div>
  )
}

export default WalkthroughNoOverlay
