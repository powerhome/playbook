import React from 'react'
import LabelValue from '../../pb_label_value/_label_value'

const LabelValueDefault = (props) => {
  return (
    <div>
      <LabelValue
          label="Role"
          value="Administrator, Moderator"
          {...props}
      />

      <br />

      <LabelValue
          label="Email"
          value="anna.black@powerhrg.com"
          {...props}
      />

      <br />

      <LabelValue
          label="Bio"
          value="Proin pulvinar feugiat massa in luctus. Donec urna nulla,
            elementum sit amet tincidunt nec, mattis nec urna. Cras viverra
            lorem odio, id pretium dui interdum ut. Nullam dignissim nisl vitae
            orci vehicula condimentum"
          {...props}
      />
    </div>
  )
}

export default LabelValueDefault
