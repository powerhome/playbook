import React from 'react'
import { BarGraph, LineGraph, Nav, User } from '../../../../pb_kits/playbook'
import NavItem from '../../../../pb_kits/playbook/pb_nav/_item.jsx'

const chartData = [
  {
    name: 'Installation',
    data: [154175],
  },
  {
    name: 'Manufacturing',
    data: [40434],
  },
  {
    name: 'Sales & Distribution',
    data: [39387],
  },
  {
    name: 'Project Development',
    data: [34227],
  },
  {
    name: 'Other',
    data: [18111],
  },
]

const chartData2 = [
  {
    name: 'Installation',
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
  },
  {
    name: 'Manufacturing',
    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
  },
  {
    name: 'Sales & Distribution',
    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
  },
  {
    name: 'Project Development',
    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
  },
  {
    name: 'Other',
    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
  },
]

const Dashboards = () => (
  <div>
    <div className="pb_layout_kit_size_xl_left_light full layout_left_collapse_md">
      <div className="layout_sidebar">
        <br />
        <User
            align="left"
            avatarUrl="https://s3-hq-f5.powerhrg.com/nitro-production/avatars/55553/badge/business-technology-jonathan-zazula.jpg?AWSAccessKeyId=IWSW00NEQHMEYQTLZ7E9&Signature=S0EN3l5sfIr7yk442Q2MeledXGc%3D&Expires=3161514974"
            name="Jon Zazula"
            orientation="horizontal"
            size="md"
            title="User Experience Designer"
        />
        <br />
        <hr
            style={{
            height: '1px',
            border: 'none',
            color: '#e4e8f0',
            backgroundColor: '#e4e8f0',
            margin: '15px',
          }}
        />
        <Nav variant="subtle">
          <NavItem
              iconLeft="city"
              link="#"
              text="City"
          />
          <NavItem
              iconLeft="user-friends"
              link="#"
              text="People"
          />
          <NavItem
              active
              iconLeft="user-tie"
              link="#"
              text="Growth Dashboard"
          />
          <NavItem
              iconLeft="clock"
              link="#"
              text="History"
          />
          <NavItem
              iconLeft="clipboard"
              link="#"
              text="Memos"
          />
          <NavItem
              iconLeft="phone"
              link="#"
              text="Contacts"
          />
        </Nav>
      </div>
      <div className="layout_body">
        <BarGraph
            axisTitle="Number of Employees"
            chartData={chartData}
            id="bar-test"
            pointStart={2012}
            subTitle="Source: thesolarfoundation.com"
            title="Solar Employment Growth by Sector, 2010-2016"
        />
        <LineGraph
            axisTitle="Number of Employees"
            chartData={chartData2}
            id="line-test"
            pointStart={1}
            subTitle="Source: thesolarfoundation.com"
            title="Solar Employment Growth by Sector, 2010-2016"
        />
      </div>
    </div>
  </div>
)

export default Dashboards
