import React from 'react'
import { Flex, SkeletonLoading } from "playbook-ui"


const SkeletonLoadingBorderRadius = (props) => (
  <Flex justify="evenly">
    <SkeletonLoading 
        borderRadius="rounded" 
        height="50px" 
        width="100px" 
        {...props}
    />
    <SkeletonLoading 
        borderRadius="xl" 
        height="50px" 
        width="100px" 
        {...props}
    />
    <SkeletonLoading 
        borderRadius="lg" 
        height="50px" 
        width="100px" 
        {...props}
    />
    <SkeletonLoading 
        borderRadius="md" 
        height="50px" 
        width="100px" 
        {...props}
    />
    <SkeletonLoading 
        height="50px" 
        width="100px" 
        {...props}
    />
    <SkeletonLoading 
        borderRadius="xs" 
        height="50px" 
        width="100px" 
        {...props}
    />
    <SkeletonLoading 
        borderRadius="none" 
        height="50px" 
        width="100px" 
        {...props}
    />
  </Flex>
)

export default SkeletonLoadingBorderRadius
