import React from 'react'
import { Card, SkeletonLoading } from "playbook-ui"


const SkeletonLoadingSquare = (props) => (
  <div>
    <SkeletonLoading 
        height="150px"
        width="150px"
        {...props}
    />
    <Card htmlOptions={{ style: { height: '200px', width: '200px' }}} 
        marginTop="md"
        padding="none"
    >
      <SkeletonLoading 
          height="50%" 
          width="50%"
          {...props}
      />
    </Card>
  </div>
)

export default SkeletonLoadingSquare
