import React from 'react'
import { DateTimeStacked } from '../../'

const DateTimeStackedDefault = () => (
  <div>
    <DateTimeStacked date={new Date()} />
    <br />
    <DateTimeStacked date={new Date('20 Mar 2018')} />
  </div>
)

export default DateTimeStackedDefault

// *Development Note* -  We are reviewing this kit for a potential name change due to naming collisions when `new Date()` is used.
// To avoid this bug, please use name spacing as shown in the code examples. ie `import { Date as AliasedComponentName } from '../../'
