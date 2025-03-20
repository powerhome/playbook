import React from 'react'

import Layout from '../../pb_layout/_layout'
import Flex from '../../pb_flex/_flex'
import Body from '../../pb_body/_body'

const LayoutBracket = () => {
  return (
    <div>
      <Layout
          layout="bracket"
      >
        <Layout.Round>
          <Layout.Game>
            <Flex justify="between">
              <Body>Packers</Body>
              <Body>10</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Eagles</strong></Body>
              <Body>22</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body>Vikings</Body>
              <Body>9</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Rams</strong></Body>
              <Body>27</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body><strong>Lions</strong></Body>
            </Flex>
            <Flex justify="between">
              <Body>BYE</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body><strong>Commanders</strong></Body>
              <Body>23</Body>
            </Flex>
            <Flex justify="between">
              <Body>Buccaneers</Body>
              <Body>20</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body><strong>Chiefs</strong></Body>
            </Flex>
            <Flex justify="between">
              <Body>BYE</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body>Chargers</Body>
              <Body>12</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Texans</strong></Body>
              <Body>32</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body>Broncos</Body>
              <Body>7</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Bills</strong></Body>
              <Body>31</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body>Steelers</Body>
              <Body>14</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Ravens</strong></Body>
              <Body>28</Body>
            </Flex>
          </Layout.Game>
        </Layout.Round>
        <Layout.Round>
          <Layout.Game>
            <Flex justify="between">
              <Body>Rams</Body>
              <Body>22</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Eagles</strong></Body>
              <Body>28</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body><strong>Commanders</strong></Body>
              <Body>45</Body>
            </Flex>
            <Flex justify="between">
              <Body>Lions</Body>
              <Body>31</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body>Texans</Body>
              <Body>14</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Chiefs</strong></Body>
              <Body>23</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body>Ravens</Body>
              <Body>25</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Bills</strong></Body>
              <Body>27</Body>
            </Flex>
          </Layout.Game>
        </Layout.Round>
        <Layout.Round>
          <Layout.Game>
            <Flex justify="between">
              <Body>Commanders</Body>
              <Body>23</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Eagles</strong></Body>
              <Body>55</Body>
            </Flex>
          </Layout.Game>
          <Layout.Game>
            <Flex justify="between">
              <Body>Bills</Body>
              <Body>29</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Chiefs</strong></Body>
              <Body>32</Body>
            </Flex>
          </Layout.Game>
        </Layout.Round>
        <Layout.Round>
          <Layout.Game>
            <Flex justify="between">
              <Body>Chiefs</Body>
              <Body>22</Body>
            </Flex>
            <Flex justify="between">
              <Body><strong>Eagles</strong></Body>
              <Body>40</Body>
            </Flex>
          </Layout.Game>
        </Layout.Round>
      </Layout>
    </div>
  )
}

export default LayoutBracket
