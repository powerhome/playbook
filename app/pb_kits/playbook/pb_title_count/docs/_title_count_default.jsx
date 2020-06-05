import React from 'react'
import { TitleCount } from '../../'

const TitleCountDefault = () => {
  return (
    <>
      <TitleCount
          count={35.78}
          title="Appointments"
      />

      <br />

      <TitleCount
          count={7399}
          size="lg"
          title="Appointments"
      />

      <br />

      <TitleCount
          count={-379503.372}
          size="lg"
          title="Appointments"
      />
    </>
  )
}

export default TitleCountDefault
