import React from 'react'
import { Card, SkeletonLoading } from "playbook-ui"


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
          color="light" 
          {...props} 
      />
    </Card>
  </div>
)

export default SkeletonLoadingColor
