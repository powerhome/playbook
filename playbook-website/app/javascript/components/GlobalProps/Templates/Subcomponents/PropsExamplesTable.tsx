import React from "react";
import { Table, Flex, Title } from "playbook-ui";

type PropsExamplesTableTypes = {
  headers: any[];
  rows: any[][];
};

const PropsExamplesTable = ({ headers, rows }: PropsExamplesTableTypes) => {
  return (
    <Flex width="100%" justifyContent="center">
      <Table disableHover size="sm">
        <Table.Head>
          <Table.Row>
            {headers.map((header, i) => (
              <Table.Header key={i}>{header}</Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row, i) => (
            <Table.Row key={i}>
              {row.map((cell, j) => (
                <Table.Cell key={j}>
                  {j === 0 ? <Title size={4}>{cell}</Title> : cell}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Flex>
  );
};

export default PropsExamplesTable;
