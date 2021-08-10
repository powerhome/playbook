import React, { useState } from 'react'
import { Button, Walkthrough } from '../../'

const WalkthroughDefault = (props) => {
  const [state, setState] = useState({
    run: false,
    steps: [
      {
        title: 'Example title',
        content:
      'This was an example of a Beacon in the Walkthrough Kit it is used as a simple indicator to inform users about a particular thing',
        target: '.example',
      },
      {
        title: 'Toggle',
        content:
        'By default the walkthrough kit will cycle through each step provided.',
        target: '.pb_toggle_control',
      },
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
          className="example"
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
      />
    </div>
  )
}

export default WalkthroughDefault
