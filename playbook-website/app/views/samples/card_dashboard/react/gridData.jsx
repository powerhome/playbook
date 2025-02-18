import React from "react"
import {
  Body,
  Card,
  Flex,
  FlexItem,
  Layout,
  Title,
} from 'playbook-ui'

const GridData = () => {
  const clientData = [
      { title: 'New Clients', value: 35, percent: 11.0, status: 'negative' },
      { title: 'Returning Clients', value: 8, percent: 5.0, status: 'positive' },
      { title: 'VIP Clients', value: 1, percent: 11.0, status: 'negative' },
      { title: 'Orders on Clients', value: 1.44, percent: 5.0, status: 'positive' },
      { title: 'Bounce on Clients', value: 30.77, unit: '%', percent: 5.0, status: 'positive' },
      { title: 'Days Between Orders', value: 3, percent: 0.0, unit: 'days' },
      { title: 'New Orders', value: 26, percent: 11.0, status: 'negative' },
      { title: 'Confirmed Orders', value: 15, percent: 11.0, status: 'negative' },
    ]

  return (
      <Card
          borderNone
          margin="sm"
          shadow="deeper"
      >
        <Layout layout="collection">
          <Layout.Body>
            {
            clientData.map((block, i) => (
              <Flex
                key={i}
                orientation="column"
                wrap
              >
                <FlexItem
                    marginY="md"
                >
                  <FlexItem>
                    <Body
                        color="light"
                        text={block.title}
                    />
                  </FlexItem>
                  <FlexItem>
                    <Flex>
                      <FlexItem>
                        <Title
                            size="3"
                            tag="h3"
                            text={`${block.value}`}
                        />
                      </FlexItem>
                      <FlexItem>
                        <Body
                            marginLeft="xs"
                            text={`${status}${block.percent}%`}
                            value={block.percent}
                        />
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </FlexItem>
              </Flex>
            )
            )
          }
          </Layout.Body>
        </Layout>
      </Card>
    )
}

export default GridData
