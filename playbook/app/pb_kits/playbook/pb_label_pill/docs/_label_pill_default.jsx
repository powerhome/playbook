import React from 'react'
import { LabelPill } from '../../'

const LabelPillDefault = () => (

  <>
    <LabelPill
        label="Service Needed"
        pillValue="76"
    />

    <LabelPill
        label="Waiting"
        pillValue="69"
        variant="success"
    />

    <LabelPill
        label="In Service"
        pillValue="28"
        variant="error"
    />

    <LabelPill
        label="Fully Serviced"
        pillValue="101"
        variant="warning"
    />

    <LabelPill
        label="Inbox"
        pillValue="197"
        variant="info"
    />

    <LabelPill
        label="Outbox"
        pillValue="13"
        variant="neutral"
    />

    <LabelPill
        label="Inbox"
        pillValue="218"
        variant="primary"
    />
  </>
)

export default LabelPillDefault
