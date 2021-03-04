import React from 'react'
import { Card } from '../../'

const CardTag = (props) => {
  return (
    <div>
      <Card
          htmlTag="section"
          {...props}
      >
        {'section'}
      </Card>
      <br />
      <Card
          htmlTag="footer"
          {...props}
      >
        {'footer'}
      </Card>
      <br />
      <Card
          htmlTag="header"
          {...props}
      >
        {'header'}
      </Card>
      <br />
      <Card
          htmlTag="article"
          {...props}
      >
        {'article'}
      </Card>
      <br />
      <Card
          htmlTag="aside"
          {...props}
      >
        {'aside'}
      </Card>
      <br />
      <Card
          htmlTag="main"
          {...props}
      >
        {'main'}
      </Card>
      <br />
      <Card
          htmlTag="nav"
          {...props}
      >
        {'nav'}
      </Card>
    </div>
  )
}

export default CardTag
