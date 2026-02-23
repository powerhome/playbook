import React from 'react'
import Caption from "../../pb_caption/_caption"

const CaptionColors = (props) => {
  return (
    <div>
      <Caption 
          text="Caption light"
          {...props}
      />
      <Caption
          color="default"
          text="Caption default"
          {...props}
      />
      <Caption
          color="lighter"
          text="Caption lighter"
          {...props}
      />
      <Caption
          color="success"
          text="Caption success"
          {...props}
      />
      <Caption
          color="error"
          text="Caption error"
          {...props}
      />
      <Caption
          color="link"
          text="Caption link"
          {...props}
      />
    </div>
  )
}

export default CaptionColors
