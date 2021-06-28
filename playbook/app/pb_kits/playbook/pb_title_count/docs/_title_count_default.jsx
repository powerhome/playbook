import React from 'react'

import TitleCount from '../_title_count'

const TitleCountDefault = (props) => {
  return (
    <>
      <TitleCount
          count={35.78}
          title="Appointments"
          {...props}
      />

      <br />

      <TitleCount
          count={7399}
          size="lg"
          title="Appointments"
          {...props}
      />

      <br />

      <TitleCount
          count={-379503.372}
          size="lg"
          title="Appointments"
          {...props}
      />
    </>
  )
}

export default TitleCountDefault
