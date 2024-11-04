import React from 'react'
import { Card, SkeletonLoading } from "playbook-ui"


const SkeletonLoadingSquare = (props) => (
  <div>
    <SkeletonLoading 
        square="150px" 
        {...props}
    />
    <Card htmlOptions={{ style: { height: '200px', width: '200px' }}} 
        marginY="md" 
        padding="none" 
    >
      <SkeletonLoading 
          square="50%" 
          {...props}
      />
    </Card>
    <Card htmlOptions={{ style: { height: '200px', width: '100%' }}} 
        padding="none"
    >
      <SkeletonLoading 
          square="50%" 
          {...props}
      />
    </Card>
  </div>
)

export default SkeletonLoadingSquare
