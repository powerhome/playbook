import React from 'react'
import { SkeletonLoading } from "playbook-ui"


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
