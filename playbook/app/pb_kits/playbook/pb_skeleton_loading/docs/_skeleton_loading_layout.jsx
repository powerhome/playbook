import React from 'react'
import SkeletonLoading from '../../pb_skeleton_loading/_skeleton_loading'

const SkeletonLoadingLayout = (props) => (
  <div>
    <SkeletonLoading
        stack="5"
        {...props}
    />
    <SkeletonLoading
        gap="md"
        paddingTop="xl"
        stack="3"
        {...props}
    />
  </div>
)

export default SkeletonLoadingLayout
