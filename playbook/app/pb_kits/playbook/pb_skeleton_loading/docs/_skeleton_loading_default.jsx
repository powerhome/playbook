import React from 'react'
import { SkeletonLoading } from "playbook-ui"


const SkeletonLoadingDefault = (props) => (
  <div>
    {"default doc ex"}
    <SkeletonLoading
        {...props}
    />

  </div>
)

export default SkeletonLoadingDefault
