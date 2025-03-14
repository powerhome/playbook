/* eslint-disable react/no-multi-comp */
import React, { useState } from "react";

import Overlay from '../../pb_overlay/_overlay'
import Button from '../../pb_button/_button'
import Table from '../../pb_table/_table'

const TableExample = () => {
    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th>{"Column 1"}</th>
                    <th>{"Column 2"}</th>
                    <th>{"Column 3"}</th>
                    <th>{"Column 4"}</th>
                    <th>{"Column 5"}</th>
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
    );
};

const OverlayToggle = () => {
    const [showOverlay, setShowOverlay] = useState(true);

    return (
        <>
            {showOverlay ? (
                <>
                    <Overlay overflow="hidden">
                        <div style={{ height: 200 }}>
                            <TableExample />
                        </div>
                    </Overlay>
                    <Button
                        fullWidth
                        icon="chevron-down"
                        iconRight
                        key="chevron-down"
                        onClick={() => setShowOverlay(false)}
                        text="Show More"
                        variant="link"
                    />
                </>
            ) : (
                <>
                    <TableExample />
                    <Button
                        fullWidth
                        icon="chevron-up"
                        iconRight
                        key="chevron-up"
                        onClick={() => setShowOverlay(true)}
                        text="Show Less"
                        variant="link"
                    />
                </>
            )}
        </>
    );
};

export default OverlayToggle;
