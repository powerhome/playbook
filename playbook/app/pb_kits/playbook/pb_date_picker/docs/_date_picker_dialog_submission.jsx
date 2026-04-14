import React, { useState } from "react";
import { Button, Dialog, DatePicker } from "playbook-ui";

const DatePickerDialogSubmission = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [payoffDateFixed, setPayoffDateFixed] = useState("");
    const [pickerInstance, setPickerInstance] = useState(0);

    const close = () => setIsOpen(false);
    const open = () => {
        setPickerInstance((current) => current + 1);
        setIsOpen(true);
    };

    const handleSubmit = () => {
        if (!payoffDateFixed.trim()) return;
        close();
    };

    return (
        <>
            <Button 
                onClick={open} 
                text="Open Dialog" 
            />
            <Dialog
                onClose={close}
                opened={isOpen}
                size="md"
                title="Date Picker: Dialog Submission Example"
            >
                <Dialog.Body>
                    <DatePicker
                        defaultDate={payoffDateFixed || undefined}
                        key={`fixed-${pickerInstance}`}
                        label="Payoff Date (fixed)"
                        marginBottom="none"
                        maxDate="4/17/2026"
                        minDate="3/17/2026"
                        onChange={(dateStr) => setPayoffDateFixed(dateStr || "")}
                        pickerId={`payoffStatementDatePickerFixed-${pickerInstance}`}
                        staticPosition={false}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Button 
                        onClick={handleSubmit}
                        text="Submit"
                    />
                    <Button 
                        onClick={close} 
                        text="Cancel" 
                        variant="link" 
                    />
                </Dialog.Footer>
            </Dialog>
        </>
    );
};

export default DatePickerDialogSubmission;