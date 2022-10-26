import React from 'react'
import { Flex, FlexItem, Gauge } from '../../'

const GaugeSizing = (props) => (
  <div>
    <Flex
        align="center"
        wrap
        {...props}
    >
      <FlexItem
          fixedSize="400px"
          overflow="hidden"
          shrink
          {...props}
      >
        <Gauge
            chartData={[ { name: 'Point 1', value: 100 } ]}
            id="gauge-sizing4"
            {...props}
        />
      </FlexItem>
      <FlexItem
          fixedSize="300px"
          overflow="hidden"
          shrink
          {...props}
      >
        <Gauge
            chartData={[ { name: 'Point 2', value: 75 } ]}
            id="gauge-sizing3"
            {...props}
        />
      </FlexItem>
      <FlexItem
          fixedSize="200px"
          overflow="hidden"
          shrink
          {...props}
      >
        <Gauge
            chartData={[ { name: 'Point 3', value: 50 } ]}
            id="gauge-sizing2"
            {...props}
        />
      </FlexItem>
      <FlexItem
          fixedSize="125px"
          overflow="hidden"
          shrink
          {...props}
      >
        <Gauge
            chartData={[ { name: 'Point 4', value: 25 } ]}
            height="100%"
            id="gauge-sizing1"
            {...props}
        />
      </FlexItem>
    </Flex>
  </div>
)

export default GaugeSizing
