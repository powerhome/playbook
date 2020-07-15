import React from 'react'
import { Flex, FlexItem, Gauge, Title } from '../../'

const GaugeSizing = () => (
  <div>
    <Title
        size={3}
        tag="h3"
        text="Gauge resizes dynamically to fit whatever element it's placed within."
    />
    <Flex
        wrap
    >
      <FlexItem fixedSize="400px">
        <Gauge
            chartData={[ { name: 'Point1', value: 100 } ]}
            id="gauge-sizing4"
        />
      </FlexItem>
      <FlexItem fixedSize="300px">
        <Gauge
            chartData={[ { name: 'Point1', value: 75 } ]}
            id="gauge-sizing3"
        />
      </FlexItem>
      <FlexItem fixedSize="200px">
        <Gauge
            chartData={[ { name: 'Point1', value: 50 } ]}
            id="gauge-sizing2"
        />
      </FlexItem>
      <FlexItem fixedSize="125px">
        <Gauge
            chartData={[ { name: 'Point1', value: 25 } ]}
            id="gauge-sizing1"
        />
      </FlexItem>
    </Flex>
  </div>
)

export default GaugeSizing
