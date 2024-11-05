import React from 'react'
import { Card, SkeletonLoading } from "playbook-ui"


const SkeletonLoadingHeightWidth = (props) => (
  <div>
    <SkeletonLoading
        height="100px"
        width="50%"
        {...props}
    />
    <br />
    <SkeletonLoading
        gap="md"
        height="10px"
        stack="3"
        width="20px"
        {...props}
    />
    <br />
    <Card htmlOptions={{ style: { height: '200px', width: '100%' }}} 
        marginBottom="md"
        padding="none" 
    >
      <SkeletonLoading
          borderRadius="md"
          gap="xl"
          height="50%"
          width="30px"
          {...props}
      />
    </Card>
    <Card htmlOptions={{ style: { height: '200px', width: '100%' }}} 
        padding="none"
    >
      <SkeletonLoading
          borderRadius="md"
          gap="xl"
          height="30%"
          stack="2"
          width="70%"
          {...props}
      />
    </Card>
  </div>
)

export default SkeletonLoadingHeightWidth
