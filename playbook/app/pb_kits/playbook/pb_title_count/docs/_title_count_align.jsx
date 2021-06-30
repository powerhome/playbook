import React from 'react'

import TitleCount from '../_title_count'

const TitleCountAlign = (props) => {
  return (
    <>
      <TitleCount
          count={527}
          title="Remodeling Consultants"
          {...props}
      />

      <br />

      <TitleCount
          align="center"
          count={527}
          title="Remodeling Consultants"
          {...props}
      />

      <br />

      <TitleCount
          align="right"
          count={527}
          title="Remodeling Consultants"
          {...props}
      />
    </>
  )
}

export default TitleCountAlign
