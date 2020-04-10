import React from 'react'
import { Logistic } from '../../'

const LogisticDark = () => (
  <div>
    <Logistic
        dark
        date={new Date('18 Nov 2019')}
        link="#"
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
    <br />
    <br />
    <Logistic
        dark
        date={new Date('18 Nov 2019')}
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
    <br />
    <br />
    <Logistic
        dark
        link="#"
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
    <br />
    <br />
    <Logistic
        dark
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
  </div>
)

export default LogisticDark
