import React from 'react'
import { BarGraph, Body, Button, Caption, Card, Checkbox, Flex, Layout, LineGraph, SectionSeparator, Table, Title } from '../../../../pb_kits/playbook'
import FlexItem from '../../../../pb_kits/playbook/pb_flex/_flex_item.jsx'

const data = [{
  name: '2020 | SF',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}, {
  name: '2020 | TOR',
  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
}, {
  name: '2019 | AMS',
  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
}, {
  name: '2018 | SF',
  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
}, {
  name: '2017 | LA',
  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
}]

const totalRegistered = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900],
}]
const newAttendees = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900],
}]
const repeatingAttendees = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900],
}]
const graphicDesigners = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900],
}]
const uxUi = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900],
}]
const productDesigners = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900],
}]

const Registration = () => (
  <div>
    <Layout
        collapse="xs"
        position="left"
        size="lg"
    >
      <Layout.Side>
        <Flex
            orientation="column"
            padding="md"
            vertical="center"
        >
          <FlexItem>
            <Title
                size={3}
                tag="h3"
                text="Design Expo"
            />
          </FlexItem>
          <FlexItem>
            <Body
                color="light"
                text="Annual Conference*"
            />
          </FlexItem>
        </Flex>
        <SectionSeparator />
        <Flex
            orientation="column"
            padding="md"
        >
          <FlexItem>
            <Title
                paddingBottom="sm"
                size={4}
                tag="h4"
                text="Regions"
            />
          </FlexItem>
          <Flex
              inline
              orientation="column"
          >
            <Checkbox
                checked
                name="NorthAmerica"
                paddingBottom="sm"
                paddingLeft="sm"
                text="North America"
                value="NorthAmerica"
            />
            <Checkbox
                checked
                name="Europe"
                paddingBottom="sm"
                paddingLeft="sm"
                text="Europe"
                value="Europe"
            />
          </Flex>
          <Title
              paddingY="sm"
              size={4}
              tag="h4"
              text="Total Registered"
          />
          <Table
              paddingBottom="xs"
              size="sm"
          >
            <thead>
              <tr>
                <th>{'Conference'}</th>
                <th>{'Total #'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{'2020 | SF'}</td>
                <td>{'2,391'}</td>
              </tr>
              <tr>
                <td>{'2020 | TOR'}</td>
                <td>{'3,829'}</td>
              </tr>
              <tr>
                <td>{'2019 | AMS'}</td>
                <td>{'2,047'}</td>
              </tr>
              <tr>
                <td>{'2018 | SF'}</td>
                <td>{'1,824'}</td>
              </tr>
              <tr>
                <td>{'2017 | LA'}</td>
                <td>{'719'}</td>
              </tr>
              <tr>
                <td>{'2017 | LDN'}</td>
                <td>{'491'}</td>
              </tr>
            </tbody>
          </Table>
          <Caption
              size="xs"
              text="*This dashboard includes the last six conferences"
          />
        </Flex>
      </Layout.Side>

      <Layout.Body
          padding="xl"
      >
        <Title
            paddingBottom="lg"
            size={3}
            tag="h3"
            text="Registration Dashboard"
        />
        <Flex
            className="bg_light"
            wrap
        >
          <FlexItem
              fixedSize="60%"
              paddingRight="lg"
          >
            <Card>

              <Flex
                  paddingBottom="md"
                  spacing="around"
                  vertical="bottom"
              >
                {/****** first number ******/}
                <FlexItem>
                  <Flex
                      orientation="column"
                      vertical="center"
                  >
                    <FlexItem>
                      <Caption
                          size="xs"
                          text="2020 | SF"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Caption
                          text="Total Registered"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                          size={2}
                          tag="h2"
                          text="2,391"
                      />
                    </FlexItem>
                  </Flex>
                </FlexItem>

                <SectionSeparator orientation="vertical" />

                {/****** second number ******/}

                <FlexItem>
                  <Flex
                      orientation="column"
                      paddingTop="sm"
                      vertical="center"
                  >
                    <FlexItem>
                      <Caption
                          text="Graphic"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                          size={3}
                          tag="h3"
                          text="353"
                      />
                    </FlexItem>
                  </Flex>
                </FlexItem>

                {/****** third number ******/}

                <FlexItem>
                  <Flex
                      orientation="column"
                      vertical="center"
                  >
                    <FlexItem>
                      <Caption
                          text="UX/UI"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                          size={3}
                          tag="h3"
                          text="254"
                      />
                    </FlexItem>
                  </Flex>
                </FlexItem>

                {/****** fourth number ******/}

                <FlexItem>
                  <Flex
                      orientation="column"
                      vertical="center"
                  >
                    <FlexItem>
                      <Caption
                          text="Product"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                          size={3}
                          tag="h3"
                          text="194"
                      />
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>

              <SectionSeparator />

              <Flex
                  paddingTop="sm"
                  spacing="around"
                  vertical="bottom"
              >
                {/****** first number ******/}
                <FlexItem>
                  <Flex
                      orientation="column"
                      vertical="center"
                  >
                    <FlexItem>
                      <Caption
                          size="xs"
                          text="2020 | TOR"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Caption
                          text="Total Registered"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                          size={2}
                          tag="h2"
                          text="3,829"
                      />
                    </FlexItem>
                  </Flex>
                </FlexItem>

                <SectionSeparator orientation="vertical" />

                {/****** second number ******/}

                <FlexItem>
                  <Flex
                      orientation="column"
                      vertical="center"
                  >
                    <FlexItem>
                      <Caption
                          text="Graphic"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                          size={3}
                          tag="h3"
                          text="937"
                      />
                    </FlexItem>
                  </Flex>
                </FlexItem>

                {/****** third number ******/}

                <FlexItem>
                  <Flex
                      orientation="column"
                      vertical="center"
                  >
                    <FlexItem>
                      <Caption
                          text="UX/UI"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                          size={3}
                          tag="h3"
                          text="721"
                      />
                    </FlexItem>
                  </Flex>
                </FlexItem>

                {/****** fourth number ******/}

                <FlexItem>
                  <Flex
                      orientation="column"
                      vertical="center"
                  >
                    <FlexItem>
                      <Caption
                          text="Product"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                          size={3}
                          tag="h3"
                          text="628"
                      />
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>
            </Card>

            <Flex
                orientation="column"
                paddingBottom="md"
                vertical="right"
            >
              <FlexItem>
                <Button
                    onClick={() => alert('button clicked!')}
                    text="View full breakdown"
                    variant="link"
                />
              </FlexItem>
            </Flex>

            <Card>
              <LineGraph
                  axisTitle="Total Registration"
                  chartData={data}
                  height="80%"
                  id="line-registration"
                  legend
                  title="Running Total"
                  xAxisCategories={['7 wks away', '6 wks away', '5 wks away', '4 wks away', '3 wks away', '2 wks away', '1 wk away', 'Start of Event']}
                  yAxisMin={0}
              />
            </Card>
          </FlexItem>
          <FlexItem fixedSize="40%">
            <Card>
              <BarGraph
                  axisTitle="Total Registered"
                  chartData={totalRegistered}
                  height="30%"
                  id="total-attendees"
                  xAxisCategories={['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF']}
                  yAxisMin={0}
              />
              <BarGraph
                  axisTitle="New Attendees"
                  chartData={newAttendees}
                  height="30%"
                  id="new-attendees"
                  xAxisCategories={['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF']}
                  yAxisMin={0}
              />
              <BarGraph
                  axisTitle="New Attendees"
                  chartData={newAttendees}
                  height="30%"
                  id="new-attendees"
                  xAxisCategories={['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF']}
                  yAxisMin={0}
              />
              <BarGraph
                  axisTitle="Repeating Attendees"
                  chartData={repeatingAttendees}
                  height="30%"
                  id="repeating-attendees"
                  xAxisCategories={['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF']}
                  yAxisMin={0}
              />
              <BarGraph
                  axisTitle="Graphic Designers"
                  chartData={graphicDesigners}
                  height="30%"
                  id="graphic-designers"
                  xAxisCategories={['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF']}
                  yAxisMin={0}
              />
              <BarGraph
                  axisTitle="UX/UI"
                  chartData={uxUi}
                  height="30%"
                  id="ux-ui"
                  xAxisCategories={['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF']}
                  yAxisMin={0}
              />
              <BarGraph
                  axisTitle="Product Designers"
                  chartData={productDesigners}
                  height="30%"
                  id="product-designers"
                  xAxisCategories={['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF']}
                  yAxisMin={0}
              />
            </Card>
          </FlexItem>
        </Flex>
      </Layout.Body>
    </Layout>
  </div>
)

export default Registration
