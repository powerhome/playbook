import React from 'react'
import { Date as FormattedDate } from '../../'

const DateDefault = () => {
  return (
    <div>
      <FormattedDate
          value={new Date()}
      />

      <br />

      <FormattedDate
          value="2012-08-03"
      />

      <br />

      <FormattedDate
          showDayOfWeek
          value="2017-12-03"
      />
    </div>
  )
}

export default DateDefault

// *Development Note* -  We are reviewing this kit for a potential name change due to naming collisions when `new Date()` is used.
// To avoid this bug, please use name spacing as shown in the code examples. ie `import { Date as AliasedComponentName } from '../../'
