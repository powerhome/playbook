import React from 'react'
import Table from '../_table'

const TableStickyRightColumns = () => {
    return (
        <Table
            responsive="scroll"
            size="md"
            stickyRightColumn={["13", "14", "15"]}
        >
            <Table.Head>
                <Table.Row>
                <Table.Header>{'Column 1'}</Table.Header>
                <Table.Header>{'Column 2'}</Table.Header>
                <Table.Header>{'Column 3'}</Table.Header>
                <Table.Header>{'Column 4'}</Table.Header>
                <Table.Header>{'Column 5'}</Table.Header>
                <Table.Header>{'Column 6'}</Table.Header>
                <Table.Header>{'Column 7'}</Table.Header>
                <Table.Header>{'Column 8'}</Table.Header>
                <Table.Header>{'Column 9'}</Table.Header>
                <Table.Header>{'Column 10'}</Table.Header>
                <Table.Header>{'Column 11'}</Table.Header>
                <Table.Header>{'Column 12'}</Table.Header>
                <Table.Header htmlOptions={{ 'data-sticky-id': '13' }}>{'Column 13'}</Table.Header>
                <Table.Header htmlOptions={{ 'data-sticky-id': '14' }}>{'Column 14'}</Table.Header>
                <Table.Header htmlOptions={{ 'data-sticky-id': '15' }}>{'Column 15'}</Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>{'Value 1'}</Table.Cell>
                    <Table.Cell>{'Value 2'}</Table.Cell>
                    <Table.Cell>{'Value 3'}</Table.Cell>
                    <Table.Cell>{'Value 4'}</Table.Cell>
                    <Table.Cell>{'Value 5'}</Table.Cell>
                    <Table.Cell>{'Value 6'}</Table.Cell>
                    <Table.Cell>{'Value 7'}</Table.Cell>
                    <Table.Cell>{'Value 8'}</Table.Cell>
                    <Table.Cell>{'Value 9'}</Table.Cell>
                    <Table.Cell>{'Value 10'}</Table.Cell>
                    <Table.Cell>{'Value 11'}</Table.Cell>
                    <Table.Cell>{'Value 12'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '13' }}>{'Value 13'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '14' }}>{'Value 14'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '15' }}>{'Value 15'}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>{'Value 1'}</Table.Cell>
                    <Table.Cell>{'Value 2'}</Table.Cell>
                    <Table.Cell>{'Value 3'}</Table.Cell>
                    <Table.Cell>{'Value 4'}</Table.Cell>
                    <Table.Cell>{'Value 5'}</Table.Cell>
                    <Table.Cell>{'Value 6'}</Table.Cell>
                    <Table.Cell>{'Value 7'}</Table.Cell>
                    <Table.Cell>{'Value 8'}</Table.Cell>
                    <Table.Cell>{'Value 9'}</Table.Cell>
                    <Table.Cell>{'Value 10'}</Table.Cell>
                    <Table.Cell>{'Value 11'}</Table.Cell>
                    <Table.Cell>{'Value 12'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '13' }}>{'Value 13'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '14' }}>{'Value 14'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '15' }}>{'Value 15'}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>{'Value 1'}</Table.Cell>
                    <Table.Cell>{'Value 2'}</Table.Cell>
                    <Table.Cell>{'Value 3'}</Table.Cell>
                    <Table.Cell>{'Value 4'}</Table.Cell>
                    <Table.Cell>{'Value 5'}</Table.Cell>
                    <Table.Cell>{'Value 6'}</Table.Cell>
                    <Table.Cell>{'Value 7'}</Table.Cell>
                    <Table.Cell>{'Value 8'}</Table.Cell>
                    <Table.Cell>{'Value 9'}</Table.Cell>
                    <Table.Cell>{'Value 10'}</Table.Cell>
                    <Table.Cell>{'Value 11'}</Table.Cell>
                    <Table.Cell>{'Value 12'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '13' }}>{'Value 13'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '14' }}>{'Value 14'}</Table.Cell>
                    <Table.Cell htmlOptions={{ 'data-sticky-id': '15' }}>{'Value 15'}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}

export default TableStickyRightColumns
