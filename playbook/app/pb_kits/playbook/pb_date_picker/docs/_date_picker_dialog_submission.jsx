import React, { useState } from "react";
import { Button, Dialog, DatePicker } from "playbook-ui";

const DatePickerDialogSubmission = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dateFixed, setDateFixed] = useState("");
    const [pickerInstance, setPickerInstance] = useState(0);

    const close = (clearDate = false) => {
        if (clearDate) setDateFixed("");
        setIsOpen(false);
    };

    const open = () => {
        setPickerInstance((current) => current + 1);
        setIsOpen(true);
    };

    const handleSubmit = () => {
        if (!dateFixed.trim()) return;
        close();
    };

    return (
        <>
            <Button 
                onClick={open} 
                text="Open Dialog" 
            />
            <Dialog
                onClose={() => close(true)}
                opened={isOpen}
                size="md"
                title="Date Picker: Dialog Submission Example"
            >
                <Dialog.Body>
                    <DatePicker
                        defaultDate={dateFixed || undefined}
                        key={"fixed-" + pickerInstance}
                        label="Date"
                        onChange={(dateStr) => setDateFixed(dateStr || "")}
                        pickerId={"datePickerFixed-" + pickerInstance}
                        staticPosition={false}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Button 
                        onClick={handleSubmit}
                        text="Submit"
                    />
                    <Button 
                        onClick={() => close(true)} 
                        text="Cancel" 
                        variant="link" 
                    />
                </Dialog.Footer>
            </Dialog>
        </>
    );
};

export default DatePickerDialogSubmission;