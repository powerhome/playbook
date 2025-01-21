import React from 'react'

import { Table, Tooltip, Icon } from "playbook-ui";

const TableTestToolTip = () => {
  return (
    <Table size="sm">
        <Table.Head>
          <Table.Row>
            <Table.Header>{"Column 1"}</Table.Header>
            <Table.Header>{"Column 2"}</Table.Header>
            <Table.Header>{"Column 3"}</Table.Header>
            <Table.Header>{"Column 4"}</Table.Header>
            <Table.Header>{"Column 5"}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {"Test Right Placement"}
              <Tooltip
                  placement={"right"}
                  text={`Hello this is a tooltip hello hi hey HI wahts up everyone`}
                  zIndex={10}
              >
                <Icon
                    color={"primary"}
                    icon={"info-circle"}
                    paddingLeft={"xs"}
                />
              </Tooltip>
            </Table.Cell>
            <Table.Cell>
              {"Test Top Placement"}
              <Tooltip
                  placement={"top"}
                  text={`Hello this is a tooltip hello hi hey HI wahts up everyone`}
                  zIndex={10}
              >
                <Icon
                    color={"primary"}
                    icon={"info-circle"}
                    paddingLeft={"xs"}
                />
              </Tooltip>
            </Table.Cell>
            <Table.Cell>
              {"Test Bottom Placement"}
              <Tooltip
                  placement={"bottom"}
                  text={`Hello this is a tooltip hello hi hey HI wahts up everyone`}
                  zIndex={10}
              >
                <Icon
                    color={"primary"}
                    icon={"info-circle"}
                    paddingLeft={"xs"}
                />
              </Tooltip>
            </Table.Cell>
            <Table.Cell>
              {"Test Left Placement"}
              <Tooltip
                  placement={"left"}
                  text={`Hello this is a tooltip hello hi hey HI wahts up everyone`}
                  zIndex={10}
              >
                <Icon
                    color={"primary"}
                    icon={"info-circle"}
                    paddingLeft={"xs"}
                />
              </Tooltip>
            </Table.Cell>
            <Table.Cell>{"Value 5"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{"Value 1"}</Table.Cell>
            <Table.Cell>{"Value 2"}</Table.Cell>
            <Table.Cell>{"Value 3"}</Table.Cell>
            <Table.Cell>{"Value 4"}</Table.Cell>
            <Table.Cell>{"Value 5"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{"Value 1"}</Table.Cell>
            <Table.Cell>{"Value 2"}</Table.Cell>
            <Table.Cell>{"Value 3"}</Table.Cell>
            <Table.Cell>{"Value 4"}</Table.Cell>
            <Table.Cell>{"Value 5"}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
)}

export default TableTestToolTip
