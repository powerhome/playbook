import React from 'react'

import Card from '../../pb_card/_card'
import SkeletonLoading from '../../pb_skeleton_loading/_skeleton_loading'

const SkeletonLoadingColor = (props) => (
  <div>
    <Card 
        borderNone 
        {...props}
    >
      <SkeletonLoading {...props}/>
    </Card>
    <Card 
        background="light" 
        borderNone 
        {...props}
    >
      <SkeletonLoading 
          color="white" 
          {...props} 
      />
    </Card>
  </div>
)

export default SkeletonLoadingColor
