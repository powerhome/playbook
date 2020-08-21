import React from 'react'
import { TitleCount } from '../../'

const TitleCountDark = () => {
  return (
    <>
      <TitleCount
          count={35.78}
          dark
          title="Appointments"
      />

      <br />

      <TitleCount
          count={7399}
          dark
          size="lg"
          title="Appointments"
      />

      <br />

      <TitleCount
          count={-379503.372}
          dark
          size="lg"
          title="Appointments"
      />
    </>
  )
}

export default TitleCountDark
