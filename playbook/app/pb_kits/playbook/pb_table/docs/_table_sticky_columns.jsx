import React from 'react'
import Table from '../_table'

const TableStickyColumns = () => {
    return (
        <Table
            responsive="scroll"
            size="md"
            stickyLeftColumn={["a"]}
            stickyRightColumn={["b"]}
        >
            <thead>
                <tr>
                    <th data-sticky-id="a">{'Column 1'}</th>
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
                    <th>{'Column 13'}</th>
                    <th>{'Column 14'}</th>
                    <th data-sticky-id="b">{'Column 15'}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-sticky-id="a">{'Value 1'}</td>
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
                    <td>{'Value 13'}</td>
                    <td>{'Value 14'}</td>
                    <td data-sticky-id="b">{'Value 15'}</td>
                </tr>
                <tr>
                    <td data-sticky-id="a">{'Value 1'}</td>
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
                    <td>{'Value 13'}</td>
                    <td>{'Value 14'}</td>
                    <td data-sticky-id="b">{'Value 15'}</td>
                </tr>
                <tr>
                    <td data-sticky-id="a">{'Value 1'}</td>
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
                    <td>{'Value 13'}</td>
                    <td>{'Value 14'}</td>
                    <td data-sticky-id="b">{'Value 15'}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default TableStickyColumns