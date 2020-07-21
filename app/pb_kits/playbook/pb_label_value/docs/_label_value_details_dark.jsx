import React from 'react'
import { LabelValue } from '../../'

const LabelValueDetailsDark = () => {
  return (
    <div>
      <LabelValue
          dark
          description="33-12345"
          icon="home"
          label="Project"
          title="Jefferson-Smith"
          variant="details"
      />

      <br />

      <LabelValue
          dark
          description="33-12345"
          icon="home"
          label="Project"
          link="#"
          title="Jefferson-Smith"
          variant="details"
      />

      <br />

      <LabelValue
          dark
          date={new Date('18 Nov 2019')}
          description="33-12345"
          icon="home"
          label="Project"
          title="Jefferson-Smith"
          variant="details"
      />

      <br />

      <LabelValue
          dark
          date={new Date('18 Nov 2019')}
          description="33-12345"
          icon="home"
          label="Project"
          link="#"
          title="Jefferson-Smith"
          variant="details"
      />

      <br />
      <br />
      <br />

      <LabelValue
          dark
          icon="truck"
          label="Installer"
          title="JD Installations LLC"
          variant="details"
      />

      <br />

      <LabelValue
          dark
          icon="truck"
          label="Installer"
          link="#"
          title="JD Installations LLC"
          variant="details"
      />
    </div>
  )
}

export default LabelValueDetailsDark
