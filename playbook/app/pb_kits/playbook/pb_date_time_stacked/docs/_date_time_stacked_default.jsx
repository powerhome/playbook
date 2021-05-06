import React from 'react'
import { DateTimeStacked } from '../../'

const DateTimeStackedDefault = (props) => (
  <div>
    <DateTimeStacked
        datetime={new Date()}
        {...props}
    />
    <br />
    <DateTimeStacked
        datetime={new Date()}
        timeZone="Asia/Tokyo"

        {...props}
    />
    <br />
    <DateTimeStacked
        datetime={new Date()}
        timeZone="America/Denver"

        {...props}
    />

  </div>
)

export default DateTimeStackedDefault

// *Development Note* -  We are reviewing this kit for a potential name change due to naming collisions when `new Date()` is used.
// To avoid this bug, please use name spacing as shown in the code examples. ie `import { Date as AliasedComponentName } from '../../'
