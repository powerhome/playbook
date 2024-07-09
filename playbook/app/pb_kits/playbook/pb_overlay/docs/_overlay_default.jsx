import React from 'react'
import {
    Overlay,
    Table,
} from '../..'

const TableExample = () => {
    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th>{'Column 1'}</th>
                    <th>{'Column 2'}</th>
                    <th>{'Column 3'}</th>
                    <th>{'Column 4'}</th>
                    <th>{'Column 5'}</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 7 }, (_, index) => (
                    <tr key={index}>
                        {Array.from({ length: 5 }, (_, columnIndex) => (
                            <td key={columnIndex}>{`Value ${columnIndex + 1}`}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const OverlayDefault = () => (
    <>
        <Overlay>
            <TableExample />
        </Overlay>
    </>
)

export default OverlayDefault
