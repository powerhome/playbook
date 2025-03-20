import React, { useState } from 'react'
import Table from '../../pb_table/_table'
import Image from '../../pb_image/_image'
import Flex from '../../pb_flex/_flex'
import Checkbox from '../../pb_checkbox/_checkbox'
import Button from '../../pb_button/_button'

const TableWithSelectableRows = (props) => {
    const [checkboxes, setCheckboxes] = useState([
        { name: "Coffee", checked: false },
        { name: "Ice Cream", checked: false },
        { name: "Chocolate", checked: true },
    ]);

    const isAllChecked = !checkboxes.find((checkbox) => !checkbox.checked);
    const isNoneChecked = !checkboxes.find((checkbox) => checkbox.checked);

    const processCheckboxes = (checked) =>
        checkboxes.slice(0).map((checkbox) => {
            checkbox.checked = checked;
            return checkbox;
        });

    const onToggleAll = () => {
        setCheckboxes(
            isNoneChecked ? processCheckboxes(true) : processCheckboxes(false)
        );
    };

    const updateCheckboxes = (checkbox, index) => {
        const newCheckboxes = checkboxes.slice(0);
        newCheckboxes[index].checked = !checkbox.checked;
        setCheckboxes(newCheckboxes);
    };

    return (
        <>
            <Flex
                justify="end"
                marginBottom="sm"
            >
                {!isNoneChecked && (
                    <Flex
                        justify="end"
                        marginBottom="sm"
                    >
                        <Button>Delete</Button>
                    </Flex>
                )}
            </Flex>
            <Table
                size="sm"
                {...props}
            >
                <Table.Head>
                    <Table.Row>
                        <Table.Header>
                            <Checkbox
                                checked={isAllChecked}
                                indeterminate={!isAllChecked && !isNoneChecked}
                                name="checkbox-name"
                                onChange={onToggleAll}
                                value="check-box value"
                            />
                        </Table.Header>
                        <Table.Header>{"Column 1"}</Table.Header>
                        <Table.Header>{"Column 2"}</Table.Header>
                        <Table.Header>{"Column 3"}</Table.Header>
                        <Table.Header>{"Column 4"}</Table.Header>
                        <Table.Header>{"Column 5"}</Table.Header>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {checkboxes.map((checkbox, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>
                                <Checkbox
                                    checked={checkbox.checked}
                                    name={checkbox.name}
                                    onChange={() => {
                                        updateCheckboxes(checkbox, index);
                                    }}
                                    value="check-box value"
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Image
                                    alt="picture of a misty forest"
                                    size="xs"
                                    url="https://unsplash.it/500/400/?image=634"
                                />
                            </Table.Cell>
                            <Table.Cell>{"Value 2"}</Table.Cell>
                            <Table.Cell>{"Value 3"}</Table.Cell>
                            <Table.Cell>{"Value 4"}</Table.Cell>
                            <Table.Cell>{"Value 5"}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}

export default TableWithSelectableRows
