import React from 'react'

import Flex from '../../pb_flex/_flex'
import SkeletonLoading from '../../pb_skeleton_loading/_skeleton_loading'

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
