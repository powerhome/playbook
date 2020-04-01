import React from 'react'
import { LabelValue } from '../../'

const LabelValueDark = () => {
  return (
    <div>
      <LabelValue
          dark
          label="Role"
          value="Administrator, Moderator"
      />

      <br />

      <LabelValue
          dark
          label="Email"
          value="anna.black@powerhrg.com"
      />

      <br />

      <LabelValue
          dark
          label="Bio"
          value="Proin pulvinar feugiat massa in luctus. Donec urna nulla,
            elementum sit amet tincidunt nec, mattis nec urna. Cras viverra
            lorem odio, id pretium dui interdum ut. Nullam dignissim nisl vitae
            orci vehicula condimentum"
      />
    </div>
  )
}

export default LabelValueDark
