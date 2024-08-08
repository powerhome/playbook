import React, { useState } from "react";
import { Table, Pagination } from 'playbook-ui'


import { data } from "./data";

const PaginationPageChange = (props) => {

  const [activePage, setActivePage] = useState(1);
  const rowsPerPage = 3;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const currentData = data.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );


    return (
      <div className="App">
      <Table 
          marginBottom="xs"
          responsive="none" 
          size="sm" 
          {...props}
      >
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
          {currentData.map((row, index) => (
            <Table.Row key={index}>
              {row.map((cell, cellIndex) => (
                <Table.Cell key={cellIndex}>{cell}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
 
      <Pagination
          current={1}
          onChange={onPageChange}
          range={5}
          total={totalPages}
          {...props}
      />
    </div>
    )
}

export default PaginationPageChange
