import React from 'react'
import Table from '../_table'

const TableStickyLeftColumns = () => {
    return (
        <Table
            responsive="scroll"
            size="md"
            stickyLeftColumn={["1", "2", "3"]}
        >
            <Table.Head>
                <Table.Row>
                <Table.Header htmlOptions={{ 'data-sticky-id': '1' }}>{'Column 1'}</Table.Header>
                <Table.Header htmlOptions={{ 'data-sticky-id': '2' }}>{'Column 2'}</Table.Header>
                <Table.Header htmlOptions={{ 'data-sticky-id': '3' }}>{'Column 3'}</Table.Header>
                <Table.Header>{'Column 4'}</Table.Header>
                <Table.Header>{'Column 5'}</Table.Header>
                <Table.Header>{'Column 6'}</Table.Header>
                <Table.Header>{'Column 7'}</Table.Header>
                <Table.Header>{'Column 8'}</Table.Header>
                <Table.Header>{'Column 9'}</Table.Header>
                <Table.Header>{'Column 10'}</Table.Header>
                <Table.Header>{'Column 11'}</Table.Header>
                <Table.Header>{'Column 12'}</Table.Header>
                <Table.Header>{'Column 13'}</Table.Header>
                <Table.Header>{'Column 14'}</Table.Header>
                <Table.Header>{'Column 15'}</Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '1' }}>{'Value 1'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '2' }}>{'Value 2'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '3' }}>{'Value 3'}</Table.Cell>
                    <Table.Cell>{'Value 4'}</Table.Cell>
                    <Table.Cell>{'Value 5'}</Table.Cell>
                    <Table.Cell>{'Value 6'}</Table.Cell>
                    <Table.Cell>{'Value 7'}</Table.Cell>
                    <Table.Cell>{'Value 8'}</Table.Cell>
                    <Table.Cell>{'Value 9'}</Table.Cell>
                    <Table.Cell>{'Value 10'}</Table.Cell>
                    <Table.Cell>{'Value 11'}</Table.Cell>
                    <Table.Cell>{'Value 12'}</Table.Cell>
                    <Table.Cell>{'Value 13'}</Table.Cell>
                    <Table.Cell>{'Value 14'}</Table.Cell>
                    <Table.Cell>{'Value 15'}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '1' }}>{'Value 1'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '2' }}>{'Value 2'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '3' }}>{'Value 3'}</Table.Cell>
                    <Table.Cell>{'Value 4'}</Table.Cell>
                    <Table.Cell>{'Value 5'}</Table.Cell>
                    <Table.Cell>{'Value 6'}</Table.Cell>
                    <Table.Cell>{'Value 7'}</Table.Cell>
                    <Table.Cell>{'Value 8'}</Table.Cell>
                    <Table.Cell>{'Value 9'}</Table.Cell>
                    <Table.Cell>{'Value 10'}</Table.Cell>
                    <Table.Cell>{'Value 11'}</Table.Cell>
                    <Table.Cell>{'Value 12'}</Table.Cell>
                    <Table.Cell>{'Value 13'}</Table.Cell>
                    <Table.Cell>{'Value 14'}</Table.Cell>
                    <Table.Cell>{'Value 15'}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '1' }}>{'Value 1'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '2' }}>{'Value 2'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '3' }}>{'Value 3'}</Table.Cell>
                    <Table.Cell>{'Value 4'}</Table.Cell>
                    <Table.Cell>{'Value 5'}</Table.Cell>
                    <Table.Cell>{'Value 6'}</Table.Cell>
                    <Table.Cell>{'Value 7'}</Table.Cell>
                    <Table.Cell>{'Value 8'}</Table.Cell>
                    <Table.Cell>{'Value 9'}</Table.Cell>
                    <Table.Cell>{'Value 10'}</Table.Cell>
                    <Table.Cell>{'Value 11'}</Table.Cell>
                    <Table.Cell>{'Value 12'}</Table.Cell>
                    <Table.Cell>{'Value 13'}</Table.Cell>
                    <Table.Cell>{'Value 14'}</Table.Cell>
                    <Table.Cell>{'Value 15'}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}

export default TableStickyLeftColumns
