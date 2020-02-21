import React from 'react'
import { TitleCount } from '../../'

const TitleCountDefault = () => {
  return (
    <>
      <TitleCount
          count={35}
          title="Appointments"
      />
      <TitleCount
          count={35}
          size="lg"
          title="Appointments"
      />
    </>
  )
}

export default TitleCountDefault
