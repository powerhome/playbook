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
          value={new Date('03 Aug 2012')}
          {...props}
      />

      <br />

      <FormattedDate
          showDayOfWeek
          size="sm"
          value={new Date('03 Dec 2017')}
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
          value={new Date('03 Aug 2012')}
          {...props}
      />

      <br />

      <FormattedDate
          showDayOfWeek
          value={new Date('03 Dec 2017')}
          {...props}
      />
    </>
  )
}

export default DateDefault

// *Development Note* -  We are reviewing this kit for a potential name change due to naming collisions when `new Date()` is used.
// To avoid this bug, please use name spacing as shown in the code examples. ie `import { Date as AliasedComponentName } from '../../'
