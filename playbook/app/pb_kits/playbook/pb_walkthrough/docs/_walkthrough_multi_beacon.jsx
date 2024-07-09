import React, { useState } from 'react'
import { Button, Walkthrough } from 'playbook-ui'

const WalkthroughMultiBeacon = (props) => {
  const [stateA, setStateA] = useState({
    run: false,
    steps: [
      {
        title: 'Example title',
        content:
          'This was an example of a Beacon in the Walkthrough Kit it is used as a simple indicator to inform users about a particular thing',
        target: '.exampleMulti',
      },
    ],
  })

  const [stateB, setStateB] = useState({
    run: false,
    steps: [
      {
        title: 'Toggle',
        content:
          'By default the walkthrough kit will cycle through each step provided.',
        target: '.pb_toggle_control',
      },
    ],
  })

  const [stateC, setStateC] = useState({
    run: false,
    steps: [
      {
        title: 'Top Nav',
        content:
          'By default the walkthrough kit will cycle through each step provided.',
        target: '.pb--page--topNav',
      },
    ],
  })

  return (
    <div>
      <div
          className="exampleMulti"
          style={{ 'display': 'inline' }}
      >
        {'Start the Tour. Then click the Beacon to demo the default behavior of the Walkthrough Kit'}
      </div>
      <br />
      <br />
      <Button
          onClick={() => {
          setStateA({
            ...stateA,
            run: true,
          })
          setStateB({
            ...stateB,
            run: true,
          })
          setStateC({
            ...stateC,
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
          setStateA({
            ...stateA,
            run: false,
          })
          setStateB({
            ...stateB,
            run: false,
          })
          setStateC({
            ...stateC,
            run: false,
          })
        }}
      >
        {'Reset/Stop Tour'}
      </Button>

      <Walkthrough
          run={stateA.run}
          steps={stateA.steps}
          {...props}
      />
      <Walkthrough
          run={stateB.run}
          steps={stateB.steps}
          {...props}
      />
      <Walkthrough
          run={stateC.run}
          steps={stateC.steps}
          {...props}
      />
    </div>
  )
}

export default WalkthroughMultiBeacon
