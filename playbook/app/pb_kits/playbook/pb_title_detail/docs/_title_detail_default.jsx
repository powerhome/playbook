import React from 'react'

import TitleDetail from '../_title_detail'

const TitleDetailDefault = (props) => (
  <div>
    <TitleDetail
        detail="Commits data and history"
        title="Email Notifications"
        {...props}
    />

    <TitleDetail
        align="center"
        detail="Commits data and history"
        title="Email Notifications"
        {...props}
    />

    <TitleDetail
        align="right"
        detail="Commits data and history"
        title="Email Notifications"
        {...props}
    />

  </div>
)

export default TitleDetailDefault
