import React, { useEffect, useState } from "react";
import { Button, Dialog, DatePicker } from "playbook-ui";

const DatePickerDialogSubmission = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [payoffDateFixed, setPayoffDateFixed] = useState("");
    const [openCount, setOpenCount] = useState(0);

    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    useEffect(() => {
        if (isOpen) {
            setOpenCount((c) => c + 1);
        }
    }, [isOpen]);

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
                        key={`fixed-${isOpen}`}
                        label="Payoff Date (fixed)"
                        marginBottom="none"
                        maxDate="4/17/2026"
                        minDate="3/17/2026"
                        onChange={(dateStr) => setPayoffDateFixed(dateStr || "")}
                        pickerId={`payoffStatementDatePickerFixed-${openCount}`}
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