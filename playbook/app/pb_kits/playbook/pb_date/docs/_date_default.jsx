import React from 'react'
import { Date as FormattedDate } from '../../'

const DateDefault = (props) => {
  return (
    <>
      <FormattedDate
          size="sm"
          value={new Date()}
          {...props}
      />

      <br />

      <FormattedDate
          size="sm"
          value="2012-08-03"
          {...props}
      />

      <br />

      <FormattedDate
          showDayOfWeek
          size="sm"
          value="2017-12-03"
          {...props}
      />

      <br />
      <br />

      <FormattedDate
          value={new Date()}
          {...props}
      />

      <br />

      <FormattedDate
          value="2012-08-03"
          {...props}
      />

      <br />

      <FormattedDate
          showDayOfWeek
          value="2017-12-03"
          {...props}
      />
    </>
  )
}

export default DateDefault

// *Development Note* -  We are reviewing this kit for a potential name change due to naming collisions when `new Date()` is used.
// To avoid this bug, please use name spacing as shown in the code examples. ie `import { Date as AliasedComponentName } from '../../'
