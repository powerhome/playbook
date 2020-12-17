import React from 'react'
import { Flex, FlexItem, Gauge } from '../../'

const GaugeSizing = () => (
  <div>
    <Flex
        wrap
    >
      <FlexItem fixedSize="400px">
        <Gauge
            chartData={[ { name: 'Point 1', value: 100 } ]}
            id="gauge-sizing4"
        />
      </FlexItem>
      <FlexItem fixedSize="300px">
        <Gauge
            chartData={[ { name: 'Point 2', value: 75 } ]}
            id="gauge-sizing3"
        />
      </FlexItem>
      <FlexItem fixedSize="200px">
        <Gauge
            chartData={[ { name: 'Point 3', value: 50 } ]}
            id="gauge-sizing2"
        />
      </FlexItem>
      <FlexItem fixedSize="125px">
        <Gauge
            chartData={[ { name: 'Point 4', value: 25 } ]}
            id="gauge-sizing1"
        />
      </FlexItem>
    </Flex>
  </div>
)

export default GaugeSizing
