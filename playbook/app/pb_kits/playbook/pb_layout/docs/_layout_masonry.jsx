import React from 'react'

import Layout from '../_layout'

import Image from '../../pb_image/_image'

const LayoutMasonry = (props) => {
  return (
    <Layout
        layout="masonry"
        {...props}
    >
      <Layout.Body>
        <Layout.Item>
          <Image
              url="https://images.unsplash.com/photo-1611932084285-4fc50bfb7102?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
        </Layout.Item>
        <Layout.Item size="md">
          <Image
              url="https://images.unsplash.com/photo-1611934529218-748707e1d066?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2307&q=80"
          />
        </Layout.Item>
        <Layout.Item>
          <Image
              url="https://images.unsplash.com/photo-1611927263897-c2f1156bc760?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
        </Layout.Item>
        <Layout.Item size="lg">
          <Image
              url="https://images.unsplash.com/photo-1611927263897-c2f1156bc760?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
        </Layout.Item>
        <Layout.Item>
          <Image
              url="https://images.unsplash.com/photo-1606851685679-2a35cfdd62d6?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
        </Layout.Item>
        <Layout.Item size="md">
          <Image
              url="https://images.unsplash.com/photo-1612092172331-d788286028d5?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Mnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
        </Layout.Item>
        <Layout.Item>
          <Image
              url="https://images.unsplash.com/photo-1612123912968-5f6e964e8ea5?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0N3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
        </Layout.Item>
        <Layout.Item size="md">
          <Image
              url="https://images.unsplash.com/photo-1606851685679-2a35cfdd62d6?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
        </Layout.Item>
        <Layout.Item>
          <Image
              url="https://unsplash.it/500/400/?image=634"
          />
        </Layout.Item>
      </Layout.Body>
    </Layout>
  )
}

export default LayoutMasonry
