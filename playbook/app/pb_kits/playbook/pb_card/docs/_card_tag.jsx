import React from 'react'
import { Card, Flex } from '../../'

const CardTag = (props) => {
  return (
    <div>
      <Flex
          justify="between"
          {...props}
      >
        <Card
            {...props}
        >
          {'div by default'}
        </Card>

        <Card
            htmlTag="section"
            {...props}
        >
          {'section'}
        </Card>

        <Card
            htmlTag="footer"
            {...props}
        >
          {'footer'}
        </Card>

        <Card
            htmlTag="header"
            {...props}
        >
          {'header'}
        </Card>
      </Flex>

      <Flex
          justify="between"
          {...props}
      >
        <Card
            htmlTag="article"
            {...props}
        >
          {'article'}
        </Card>

        <Card
            htmlTag="aside"
            {...props}
        >
          {'aside'}
        </Card>

        <Card
            htmlTag="main"
            {...props}
        >
          {'main'}
        </Card>

        <Card
            htmlTag="nav"
            {...props}
        >
          {'nav'}
        </Card>
      </Flex>
    </div>
  )
}

export default CardTag
