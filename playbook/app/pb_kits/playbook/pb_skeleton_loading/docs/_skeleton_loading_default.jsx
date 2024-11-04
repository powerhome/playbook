import React from 'react'
import { SkeletonLoading } from "playbook-ui"


const SkeletonLoadingDefault = (props) => (
  <div>
    {/* {"default doc ex"} */}
    <SkeletonLoading {...props} />
    <br />
    <SkeletonLoading
        borderRadius="rounded"
        gap="xl"
        height="100px"
        stack="2"
        width="50%"
        {...props}
    />
    <br />
    <SkeletonLoading
        borderRadius="none"
        color="light"
        gap="md"
        height="10px"
        stack="3"
        width="20%"
        {...props}
    />
    <br />
    <SkeletonLoading
        borderRadius="md"
        color="light"
        gap="xl"
        height="50px"
        width="30%"
        {...props}
    />

  </div>
)

export default SkeletonLoadingDefault
