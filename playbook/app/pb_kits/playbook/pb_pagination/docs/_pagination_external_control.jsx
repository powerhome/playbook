import React, { useState } from "react";
import Flex from '../../pb_flex/_flex'
import Pagination from '../../pb_pagination/_pagination'
import Select from '../../pb_select/_select'
import Table from '../../pb_table/_table'

import { data } from "./data";

const PaginationExternalControl = (props) => {
  const [totalItems, setTotalItems] = useState(20);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const limitedData = data.slice(0, totalItems);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = limitedData.slice(startIndex, startIndex + itemsPerPage);

  const handleTotalItemsChange = (event) => {
    const value = Number(event.target.value);
    setTotalItems(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (event) => {
    const value = Number(event.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <>
        <Flex gap="sm">
            <Select
                label="Total Items"
                onChange={handleTotalItemsChange}
                options={[
                    { value: "5", text: "5" },
                    { value: "10", text: "10" },
                    { value: "20", text: "20" }
                ]}
                size="sm"
                value={String(totalItems)}
                {...props}
            />

            <Select
                label="Items per Page"
                onChange={handleItemsPerPageChange}
                options={[
                    { value: "3", text: "3" },
                    { value: "5", text: "5" },
                    { value: "10", text: "10" }
                ]}
                size="sm"
                value={String(itemsPerPage)}
                {...props}
            />
        </Flex>

        <Pagination
            current={currentPage}
            key={`pagination-top-${currentPage}`}
            marginBottom="xs"
            onChange={handlePageChange}
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
            {paginatedItems.map((row, index) => (
                <Table.Row key={index}>
                {row.map((cell, cellIndex) => (
                    <Table.Cell key={cellIndex}>{cell}</Table.Cell>
                ))}
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
        <Pagination
            current={currentPage}
            key={`pagination-bottom-${currentPage}`}
            onChange={handlePageChange}
            range={5}
            total={totalPages}
            {...props}
        />
    </>
  )
}

export default PaginationExternalControl 