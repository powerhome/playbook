import React from 'react'
import { Caption, Card, SkeletonLoading } from "playbook-ui"


const SkeletonLoadingSquare = (props) => (
  <div>
    <Caption text="square from square prop" />
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
    <Caption text="square from height = width" />
    <SkeletonLoading 
        height="150px"
        width="150px"
        {...props}
    />
  </div>
)

export default SkeletonLoadingSquare
