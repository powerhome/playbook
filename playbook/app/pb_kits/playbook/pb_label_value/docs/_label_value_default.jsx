import React from 'react'
import { LabelValue } from '../../'

const LabelValueDefault = () => {
  return (
    <div>
      <LabelValue
          label="Role"
          value="Administrator, Moderator"
      />

      <br />

      <LabelValue
          label="Email"
          value="anna.black@powerhrg.com"
      />

      <br />

      <LabelValue
          label="Bio"
          value="Proin pulvinar feugiat massa in luctus. Donec urna nulla,
            elementum sit amet tincidunt nec, mattis nec urna. Cras viverra
            lorem odio, id pretium dui interdum ut. Nullam dignissim nisl vitae
            orci vehicula condimentum"
      />
    </div>
  )
}

export default LabelValueDefault
