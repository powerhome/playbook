import React from 'react'
import { Flex, Gauge } from '../../'

const GaugeSizing = (props) => (
  <div>
    <Flex
        wrap
        {...props}
    >
      <div style={{ overflow: 'hidden', flexBasis: '400px' }}>
        <Gauge
            chartData={[ { name: 'Point 1', value: 100 } ]}
            id="gauge-sizing4"
            {...props}
        />
      </div>
      <div
          style={{ overflow: 'hidden', flexBasis: '300px' }}
          {...props}
      >
        <Gauge
            chartData={[ { name: 'Point 2', value: 75 } ]}
            id="gauge-sizing3"
            {...props}
        />
      </div>
      <div
          style={{ overflow: 'hidden', flexBasis: '200px' }}
          {...props}
      >
        <Gauge
            chartData={[ { name: 'Point 3', value: 50 } ]}
            id="gauge-sizing2"
            {...props}
        />
      </div>
      <div
          style={{ overflow: 'hidden', flexBasis: '125px' }}
          {...props}
      >
        <Gauge
            chartData={[ { name: 'Point 4', value: 25 } ]}
            id="gauge-sizing1"
            {...props}
        />
      </div>
    </Flex>
  </div>
)

export default GaugeSizing
