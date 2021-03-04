import React from 'react'
import { Card } from '../../'

const CardTag = (props) => {
  return (
    <div>
      <Card
          tag="section"
          {...props}
      >
        {'section'}
      </Card>
      <br />
      <Card
          tag="footer"
          {...props}
      >
        {'footer'}
      </Card>
      <br />
      <Card
          tag="header"
          {...props}
      >
        {'header'}
      </Card>
      <br />
      <Card
          tag="article"
          {...props}
      >
        {'article'}
      </Card>
      <br />
      <Card
          tag="aside"
          {...props}
      >
        {'aside'}
      </Card>
      <br />
      <Card
          tag="main"
          {...props}
      >
        {'main'}
      </Card>
      <br />
      <Card
          tag="nav"
          {...props}
      >
        {'nav'}
      </Card>
    </div>
  )
}

export default CardTag
