import React from 'react'
import Table from '../_table'

const TableStickyRightColumns = () => {
    return (
        <Table
            responsive="scroll"
            size="md"
            stickyRightColumn={["13", "14", "15"]}
        >
            <thead>
                <tr>
                    <th>{'Column 1'}</th>
                    <th>{'Column 2'}</th>
                    <th>{'Column 3'}</th>
                    <th>{'Column 4'}</th>
                    <th>{'Column 5'}</th>
                    <th>{'Column 6'}</th>
                    <th>{'Column 7'}</th>
                    <th>{'Column 8'}</th>
                    <th>{'Column 9'}</th>
                    <th>{'Column 10'}</th>
                    <th>{'Column 11'}</th>
                    <th>{'Column 12'}</th>
                    <th data-sticky-id="13">{'Column 13'}</th>
                    <th data-sticky-id="14">{'Column 14'}</th>
                    <th data-sticky-id="15">{'Column 15'}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{'Value 1'}</td>
                    <td>{'Value 2'}</td>
                    <td>{'Value 3'}</td>
                    <td>{'Value 4'}</td>
                    <td>{'Value 5'}</td>
                    <td>{'Value 6'}</td>
                    <td>{'Value 7'}</td>
                    <td>{'Value 8'}</td>
                    <td>{'Value 9'}</td>
                    <td>{'Value 10'}</td>
                    <td>{'Value 11'}</td>
                    <td>{'Value 12'}</td>
                    <td data-sticky-id="13">{'Value 13'}</td>
                    <td data-sticky-id="14">{'Value 14'}</td>
                    <td data-sticky-id="15">{'Value 15'}</td>
                </tr>
                <tr>
                    <td>{'Value 1'}</td>
                    <td>{'Value 2'}</td>
                    <td>{'Value 3'}</td>
                    <td>{'Value 4'}</td>
                    <td>{'Value 5'}</td>
                    <td>{'Value 6'}</td>
                    <td>{'Value 7'}</td>
                    <td>{'Value 8'}</td>
                    <td>{'Value 9'}</td>
                    <td>{'Value 10'}</td>
                    <td>{'Value 11'}</td>
                    <td>{'Value 12'}</td>
                    <td data-sticky-id="13">{'Value 13'}</td>
                    <td data-sticky-id="14">{'Value 14'}</td>
                    <td data-sticky-id="15">{'Value 15'}</td>
                </tr>
                <tr>
                    <td>{'Value 1'}</td>
                    <td>{'Value 2'}</td>
                    <td>{'Value 3'}</td>
                    <td>{'Value 4'}</td>
                    <td>{'Value 5'}</td>
                    <td>{'Value 6'}</td>
                    <td>{'Value 7'}</td>
                    <td>{'Value 8'}</td>
                    <td>{'Value 9'}</td>
                    <td>{'Value 10'}</td>
                    <td>{'Value 11'}</td>
                    <td>{'Value 12'}</td>
                    <td data-sticky-id="13">{'Value 13'}</td>
                    <td data-sticky-id="14">{'Value 14'}</td>
                    <td data-sticky-id="15">{'Value 15'}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default TableStickyRightColumns