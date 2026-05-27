import React, { useState } from "react";
import Table from '../../pb_table/_table'
import Pagination from '../../pb_pagination/_pagination'

const data = [
  ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5"],
  ["Value 6", "Value 7", "Value 8", "Value 9", "Value 10"],
  ["Value 11", "Value 12", "Value 13", "Value 14", "Value 15"],
  ["Value 16", "Value 17", "Value 18", "Value 19", "Value 20"],
  ["Value 21", "Value 22", "Value 23", "Value 24", "Value 25"],
  ["Value 26", "Value 27", "Value 28", "Value 29", "Value 30"],
  ["Value 31", "Value 32", "Value 33", "Value 34", "Value 35"],
  ["Value 36", "Value 37", "Value 38", "Value 39", "Value 40"],
  ["Value 41", "Value 42", "Value 43", "Value 44", "Value 45"],
  ["Value 46", "Value 47", "Value 48", "Value 49", "Value 50"],
  ["Value 51", "Value 52", "Value 53", "Value 54", "Value 55"],
  ["Value 56", "Value 57", "Value 58", "Value 59", "Value 60"],
  ["Value 61", "Value 62", "Value 63", "Value 64", "Value 65"],
  ["Value 66", "Value 67", "Value 68", "Value 69", "Value 70"],
  ["Value 71", "Value 72", "Value 73", "Value 74", "Value 75"],
  ["Value 76", "Value 77", "Value 78", "Value 79", "Value 80"],
  ["Value 81", "Value 82", "Value 83", "Value 84", "Value 85"],
  ["Value 86", "Value 87", "Value 88", "Value 89", "Value 90"],
  ["Value 91", "Value 92", "Value 93", "Value 94", "Value 95"],
  ["Value 96", "Value 97", "Value 98", "Value 99", "Value 100"],
];

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
      <Pagination
          current={activePage}
          key={`pagination-top-${activePage}`}
          marginBottom="xs"
          onChange={onPageChange}
          range={5}
          total={totalPages}
          {...props}
      />

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
          current={activePage}
          key={`pagination-bottom-${activePage}`}
          onChange={onPageChange}
          range={5}
          total={totalPages}
          {...props}
      />
    </div>
    )
}

export default PaginationPageChange
