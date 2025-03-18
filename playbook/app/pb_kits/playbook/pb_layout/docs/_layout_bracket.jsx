import React from 'react'

import Card from '../../pb_card/_card'
import Layout from '../../pb_layout/_layout'

const LayoutBracket = () => {
  return (
    <div>
      <Layout layout="bracket">
        <Layout.Round>
            <Layout.Item>
              <Card>Game 1</Card>
            </Layout.Item>
            <Layout.Item>
              <Card>Game 2</Card>
            </Layout.Item>
            <Layout.Item>
              <Card>Game 3</Card>
            </Layout.Item>
            <Layout.Item>
              <Card>Game 4</Card>
            </Layout.Item>
            <Layout.Item>
              <Card>Game 5</Card>
            </Layout.Item>
            <Layout.Item>
              <Card>Game 6</Card>
            </Layout.Item>
            <Layout.Item>
              <Card>Game 7</Card>
            </Layout.Item>
            <Layout.Item>
              <Card>Game 8</Card>
            </Layout.Item>
        </Layout.Round>
        <Layout.Round>
          <Layout.Item>
            <Card>Game 9</Card>
          </Layout.Item>
          <Layout.Item>
            <Card>Game 10</Card>
          </Layout.Item>
          <Layout.Item>
            <Card>Game 11</Card>
          </Layout.Item>
          <Layout.Item>
            <Card>Game 12</Card>
          </Layout.Item>
        </Layout.Round>
        <Layout.Round>
          <Layout.Item>
            <Card>Game 13</Card>
          </Layout.Item>
          <Layout.Item>
            <Card>Game 14</Card>
          </Layout.Item>
        </Layout.Round>
        <Layout.Round>
          <Layout.Item>
            <Card>Final Game</Card>
          </Layout.Item>
        </Layout.Round>
      </Layout>
    </div>
  )
}

export default LayoutBracket
