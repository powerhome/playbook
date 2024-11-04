import React from 'react'
import { SkeletonLoading } from "playbook-ui"


const SkeletonLoadingDefault = (props) => (
  <div>
    <SkeletonLoading {...props} />
    {/* <br />
    <SkeletonLoading
        borderRadius="rounded"
        gap="xl"
        height="100px"
        stack="2"
        width="50%"
        {...props}
    />
    <br />
    <Card background="light">
    <SkeletonLoading
        borderRadius="none"
        color="light"
        gap="md"
        height="10px"
        stack="3"
        width="20%"
        {...props}
    />
    </Card>
    <br />
    <div style={{ height: '200px', width: '100%', border: '1px solid black' }}>
      <SkeletonLoading
          borderRadius="md"
          gap="xl"
          height="50%"
          width="30px"
          {...props}
      />
    </div>
    <div style={{ height: '200px', width: '100%', border: '1px solid black' }}>
      <SkeletonLoading
          borderRadius="md"
          gap="xl"
          height="50%"
          width="30%"
          {...props}
      />
    </div>
    <SkeletonLoading
        borderRadius="rounded"
        gap="xs"
        square="50px"
        stack="2"
        {...props}
    />
    <SkeletonLoading
        square="150px"
        {...props}
    />
    <div style={{ height: '200px', width: '200px', border: '1px solid black' }}>
      <SkeletonLoading
          borderRadius="md"
          gap="xl"
          square="50%"
          {...props}
      />
    </div> */}
  </div>
)

export default SkeletonLoadingDefault
