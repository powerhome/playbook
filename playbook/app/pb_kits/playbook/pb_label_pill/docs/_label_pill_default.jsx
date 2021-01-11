import React from 'react'
import { LabelPill } from '../../'

const LabelPillDefault = (props) => (

  <>
    <LabelPill
        label="Service Needed"
        pillValue="76"
        {...props}
    />

    <LabelPill
        label="Waiting"
        pillValue="69"
        variant="success"
        {...props}
    />

    <LabelPill
        label="In Service"
        pillValue="28"
        variant="error"
        {...props}
    />

    <LabelPill
        label="Fully Serviced"
        pillValue="101"
        variant="warning"
        {...props}
    />

    <LabelPill
        label="Inbox"
        pillValue="197"
        variant="info"
        {...props}
    />

    <LabelPill
        label="Outbox"
        pillValue="13"
        variant="neutral"
        {...props}
    />

    <LabelPill
        label="Inbox"
        pillValue="218"
        variant="primary"
        {...props}
    />
  </>
)

export default LabelPillDefault
