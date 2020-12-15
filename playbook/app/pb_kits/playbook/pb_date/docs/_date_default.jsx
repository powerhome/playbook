import React from 'react'
import { Date as FormattedDate } from '../../'

const DateDefault = (props) => {
  return (
    <>
      <FormattedDate
          {...props}
          size="sm"
          value={new Date()}
      />

      <br />

      <FormattedDate
          {...props}
          size="sm"
          value="2012-08-03"
      />

      <br />

      <FormattedDate
          {...props}
          showDayOfWeek
          size="sm"
          value="2017-12-03"
      />

      <br />
      <br />

      <FormattedDate
          {...props}
          value={new Date()}
      />

      <br />

      <FormattedDate
          {...props}
          value="2012-08-03"
      />

      <br />

      <FormattedDate
          {...props}
          showDayOfWeek
          value="2017-12-03"
      />
    </>
  )
}

export default DateDefault

// *Development Note* -  We are reviewing this kit for a potential name change due to naming collisions when `new Date()` is used.
// To avoid this bug, please use name spacing as shown in the code examples. ie `import { Date as AliasedComponentName } from '../../'
