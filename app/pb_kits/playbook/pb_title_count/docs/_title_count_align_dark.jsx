import React from 'react'
import { TitleCount } from '../../'

const TitleCountAlignDark = () => {
  return (
    <>
      <TitleCount
          count={527}
          dark
          title="Remodeling Consultants"
      />

      <br />

      <TitleCount
          align="center"
          count={527}
          dark
          title="Remodeling Consultants"
      />

      <br />

      <TitleCount
          align="right"
          count={527}
          dark
          title="Remodeling Consultants"
      />
    </>
  )
}

export default TitleCountAlignDark
