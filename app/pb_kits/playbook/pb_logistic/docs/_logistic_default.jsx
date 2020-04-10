import React from 'react'
import { Logistic } from '../../'

const LogisticDefault = () => (
  <div>
    <Logistic
        date={new Date('18 Nov 2019')}
        link="#"
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
    <br />
    <br />
    <Logistic
        date={new Date('18 Nov 2019')}
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
    <br />
    <br />
    <Logistic
        link="#"
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
    <br />
    <br />
    <Logistic
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
  </div>
)

export default LogisticDefault
