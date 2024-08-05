import React from 'react'
import { LabelValue } from 'playbook-ui'

const LabelValueDetails = (props) => {
  return (
    <div>
      <LabelValue
          icon="truck"
          label="Installer"
          title="JD Installations LLC"
          variant="details"
          {...props}
      />

      <br />

      <LabelValue
          description="33-12345"
          icon="home"
          label="Project"
          title="Jefferson-Smith"
          variant="details"
          {...props}
      />

      <br />

      <LabelValue
          date={new Date('18 Nov 2019')}
          description="33-12345"
          icon="home"
          label="Project"
          title="Jefferson-Smith"
          variant="details"
          {...props}
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
          {...props}
      />
    </div>
  )
}

export default LabelValueDetails
