import React from 'react'
import { Date as FormattedDate, Caption, Title } from 'playbook-ui'

const DateDefault = (props) => {
  return (
    <>
      <FormattedDate
          size="sm"
          value={new Date()}
          {...props}
      />

      <br />

      <div style={{display: "flex", columnGap: 4}}>
        <FormattedDate
            size="sm"
            value={"2012-08-03"}
            {...props}
        />
        <Caption {...props}>{"(Hyphenated Date)"}</Caption>
      </div>

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

      <div style={{display: "flex", columnGap: 4}}>
        <FormattedDate
            value={"2012-08-03"}
            {...props}
        />
        <Title
            size={4}
            text={"(Hyphenated Date)"}
            {...props}
        />
      </div>

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
// To avoid this bug, please use name spacing as shown in the code examples. ie `import { Date as AliasedComponentName } from 'playbook-ui'
