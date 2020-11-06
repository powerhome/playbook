import React from 'react'
import { TitleCount } from '../../'

const TitleCountAlign = () => {
  return (
    <>
      <TitleCount
          count={527}
          title="Remodeling Consultants"
      />

      <br />

      <TitleCount
          align="center"
          count={527}
          title="Remodeling Consultants"
      />

      <br />

      <TitleCount
          align="right"
          count={527}
          title="Remodeling Consultants"
      />
    </>
  )
}

export default TitleCountAlign
