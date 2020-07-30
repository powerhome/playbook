import React from 'react'
import { LabelValue } from '../../'

const LabelValueDetails = () => {
  return (
    <div>
      <LabelValue
          icon="truck"
          label="Installer"
          title="JD Installations LLC"
          variant="details"
      />

      <br />

      <LabelValue
          description="33-12345"
          icon="home"
          label="Project"
          title="Jefferson-Smith"
          variant="details"
      />

      <br />

      <LabelValue
          date={new Date('18 Nov 2019')}
          description="33-12345"
          icon="home"
          label="Project"
          title="Jefferson-Smith"
          variant="details"
      />

      <br />

      <LabelValue
          active
          date={new Date('18 Nov 2019')}
          description="33-12345"
          icon="home"
          label="Project"
          title="Jefferson-Smith"
          variant="details"
      />
    </div>
  )
}

export default LabelValueDetails
