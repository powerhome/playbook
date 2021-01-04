/* eslint-disable no-prototype-builtins */
/* eslint react/prop-types: 0 */

import React from 'react'
import {
  BarGraph,
  Body,
  Button,
  Caption,
  Card,
  Currency,
  Flex,
  FlexItem,
  Gauge,
  Icon,
  IconStatValue,
  ProgressSimple,
  SectionSeparator,
  Table,
  Title,
} from '../../../../pb_kits/playbook'

////////////////////////////////////////////////////
//
// Props for the components
//
////////////////////////////////////////////////////

const pipelineData = {
  title: 'Pipeline Chart',
  chartData: [
    { label: 'Add to Cart', percent: 100.0, value: 2577 },
    { label: 'Shopping Cart', percent: 79.0, value: 2023 },
    { label: 'Payment Methods', percent: 59.0, value: 1567 },
    { label: 'Delivery Methods', percent: 56.0, value: 1252 },
    { label: 'Confirm', percent: 49.0, value: 1182 },
    { label: 'Delivery', percent: 46.0, value: 1098 },
  ],
}

const ticketData = {
  gridData: [
    { icon: 'ticket-alt', variant: 'green', size: 'lg', text: 'Tickets (YTD)', value: '1426.0' },
    { icon: 'times-square', variant: 'red', size: 'lg', text: 'Overdue', value: '25.0' },
    { icon: 'tasks', variant: 'teal', size: 'lg', text: 'Closed Without Action (YTD)', value: '97.0' },
    { icon: 'exclamation-triangle', variant: 'yellow', size: 'lg', text: 'Escalated (YTD)', value: '896.0' },
  ],
}

const totalRevenue = {
  title: 'Total Revenue',
  data: [{
    name: 'Total Sales',
    value: 80,
  }],
  legendData: [
    { value: '1000', label: 'Target' },
    { value: '224', label: 'Last Week' },
    { value: '965', label: 'Last Month' },
  ],
}

const salesReport =  {
  title: 'Total Revenue',
  legendData: [
    { value: '1000', label: 'Target' },
    { value: '543', label: 'Last Week' },
  ],
  data: [{
    name: 'Sales Report',
    data: [343, 135, 665, 903, 571, 191, 173, 520, 917],
  }],
}

const clientData = {
  title: 'Client Data',
  data: [
    { title: 'New Clients', value: 35, percent: 11.0, status: 'negative' },
    { title: 'Returning Clients', value: 8, percent: 5.0, status: 'positive' },
    { title: 'VIP Clients', value: 1, percent: 11.0, status: 'negative' },
    { title: 'Orders on Clients', value: 1.44, percent: 5.0, status: 'positive' },
    { title: 'Bounce on Clients', value: 30.77, unit: '%', percent: 5.0, status: 'positive' },
    { title: 'Days Between Orders', value: 3, percent: 0.0, unit: 'days' },
    { title: 'New Orders', value: 26, percent: 11.0, status: 'negative' },
    { title: 'Confirmed Orders', value: 15, percent: 11.0, status: 'negative' },
  ],
}

////////////////////////////////////////////////////
//
// Components
//
////////////////////////////////////////////////////

const FulfillmentChart = ({ chartData, title }) => (
  <Card
      borderNone
      padding="none"
      shadow="deeper"
  >
    <Title
        marginX="md"
        paddingBottom="none"
        paddingTop="lg"
        paddingX="md"
        size="4"
        text={title}
    />
    <Table
        container={false}
        size="md"
    >
      <thead>
        <tr>
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        { chartData.map((row, i) => (
          <tr key={`fulfillment-chart-row-${i}`}>
            <td style={{ textAlign: 'center' }}>
              <Caption
                  size="xs"
                  text={row.label}
              />
            </td>
            <td style={{ textAlign: 'center' }}>
              <ProgressSimple
                  percent={row.percent}
                  width="100px"
              />
            </td>
            <td style={{ textAlign: 'center' }}>
              <Caption
                  marginX="md"
                  size="xs"
                  text={`${row.percent}%`}
              />
            </td>
            <td style={{ textAlign: 'center' }}>
              <Body
                  text={`${row.value}`}
              />
            </td>
          </tr>
        )
        ) }
      </tbody>
    </Table>
  </Card>
)

const GridRowFill = ({ data }) => (
  <Card.Body padding="none">
    <Flex
        horizontal="center"
        spacing="evenly"
        wrap
    >
      {
      data.map((line, i) => (
        <FlexItem
            fixedSize="215px"
            key={`grid-row-item-${line.icon}-${i}`}
            margin="md"
        >
          <IconStatValue {...line} />
        </FlexItem>
      )
      )
    }
    </Flex>
  </Card.Body>
)

const IconGrid = ({ gridData }) => (
  <Card
      borderNone
      padding="none"
      shadow="deeper"
  >
    <GridRowFill data={gridData.slice(0, 2)} />
    <GridRowFill data={gridData.slice(2)} />
  </Card>
)

const Legend = ({ name, data }) => {
  name = name.toLowerCase().replace(/\s/g, '-')
  return (
    <Flex
        className="flex-container"
        horizontal="center"
        margin="xs"
        spacing="between"
        wrap
    >
      {
      data.map((point, i) => (
        <FlexItem
            key={`legend-${name}-${i}`}
            marginX="sm"
            marginY="sm"
        >
          <Currency
              amount={point.value}
              emphasized
              label={point.label}
              marginBottom="md"
              size="md"
              symbol="$"
              variant="light"
          />
        </FlexItem>
      )
      )
    }
    </Flex>
  )
}
const TitleBar = ({ title }) =>  (
  <Flex
      className="flex-container"
      spacing="between"
      wrap
  >
    <FlexItem>
      <Title
          marginLeft="none"
          marginTop="sm"
          padding="sm"
          size="4"
          text={title}
      />
    </FlexItem>
    <FlexItem
        className="hideButton"
        paddingRight="none"
    >
      <Button
          marginRight="none"
          paddingTop="md"
          variant="link"
      >
        <Icon
            fixedWidth
            icon="ellipsis-h"
            size="2x"
        />
      </Button>
    </FlexItem>
  </Flex>
)

const GaugeLegend = ({ title, data, legendData }) => (
  <Card
      borderNone

      padding="none"
      shadow="deeper"
  >
    <Card.Body>
      <TitleBar title="Total Revenue" />
    </Card.Body>
    <SectionSeparator />
    <Card.Body margin_top="sm">
      <Gauge
          chartData={data}
          fullCircle
          id="full-circle"
      />
      <Caption text="Total Sales made Today" />
    </Card.Body>
    <SectionSeparator marginY="md" />
    <Card.Body padding="none">
      <Legend
          data={legendData}
          name={title}
      />
    </Card.Body>
  </Card>
)

const BarGraphLegend = ({ title, data, legendData }) => (
  <Card
      borderNone
      margin="none"
      padding="none"
      shadow="deeper"
  >
    <Card.Body>
      <TitleBar title={title} />
    </Card.Body>
    <SectionSeparator />
    <Card.Body margin_top="sm">
      <BarGraph
          chartData={data}
          height="75%"
          id="bar-default"
          xAxisCategories={[]}
          yAxisCategories="0"
      />
    </Card.Body>
    <SectionSeparator marginY="md" />
    <Card.Body padding="none">
      <Legend
          data={legendData}
          name={title}
      />
    </Card.Body>
  </Card>
)

const GridBlock = ({ data }) => {
  const unit = data.hasOwnProperty('unit') ? `${data.unit}` : ''
  const status = data.hasOwnProperty('status') ? (data.status === 'positive' ? '+' : '-') : ''

  return (
    <Flex
        orientation="column"
        wrap
    >
      <FlexItem
          marginY="md"
      >
        <FlexItem>
          <Body
              color="light"
              text={data.title}
          />
        </FlexItem>
        <FlexItem>
          <Flex>
            <FlexItem>
              <Title
                  size="3"
                  tag="h3"
                  text={`${data.value} ${unit}`}
              />
            </FlexItem>
            <FlexItem>
              <Body
                  marginLeft="xs"
                  status={data.status}
                  text={`${status}${data.percent}%`}
                  value={data.percent}
              />
            </FlexItem>
          </Flex>
        </FlexItem>
      </FlexItem>
    </Flex>
  )
}

const NumberGrid = ({ title, data }) => {
  const keyName = title.toLowerCase().replace(/\s/g, '-')
  return (
    <Card
        borderNone
        shadow="deeper"
    >
      <Flex
          horizontal="center"
          wrap
      >
        {
          data.map((block, i) => (
            <FlexItem
                fixedSize="250px"
                key={`${keyName}-block-${i}`}
                marginY="none"
            >
              <GridBlock
                  data={block}
              />
            </FlexItem>
)
          )
        }
      </Flex>
    </Card>
  )
}

////////////////////////////////////////////////////
//
// Layout
//
////////////////////////////////////////////////////

// remove flex from here and use the stylesheet
const CardDashboard = () => {
  return (
    <div id="main-dashboard-content">
      <Title
          marginBottom="sm"
          padding="xl"
          size="1"
          text="Dashboard Cards"
      />
      <div className="wrapper">
        <div className="card">
          <FulfillmentChart {...pipelineData} />
        </div>
        <div className="card">
          <IconGrid {...ticketData} />
        </div>
        <div className="card">
          <BarGraphLegend {...salesReport} />
        </div>
        <div className="card">
          <NumberGrid {...clientData} />
        </div>
        <div className="card gaugeCard">
          <GaugeLegend {...totalRevenue} />
        </div>
      </div>
    </div>
  )
}

export default CardDashboard
