import React from 'react'
import { Card, SkeletonLoading } from "playbook-ui"


const SkeletonLoadingHeightWidth = (props) => (
  <div>
    <SkeletonLoading
        height="100px"
        width="50%"
        {...props}
    />
    <SkeletonLoading
        gap="md"
        height="20px"
        marginY="md"
        stack="3"
        width="50px"
        {...props}
    />
    <Card 
        height='200px' 
        marginBottom="md"
        padding="none" 
        width='100%'
        {...props}
    >
      <SkeletonLoading
          borderRadius="md"
          gap="xl"
          height="50%"
          width="300px"
          {...props}
      />
    </Card>
    <Card 
        height='200px'
        padding="none"
        width='100%'
        {...props}
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
    <SkeletonLoading 
        height="150px"
        marginY="md"
        width="150px"
        {...props}
    />
    <SkeletonLoading 
        borderRadius="rounded"
        height="150px"
        width="150px"
        {...props}
    />
  </div>
)

export default SkeletonLoadingHeightWidth
