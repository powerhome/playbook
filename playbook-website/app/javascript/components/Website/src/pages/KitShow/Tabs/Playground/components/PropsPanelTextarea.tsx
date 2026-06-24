import React, { useState } from "react";
import {
  Button,
  Dialog,
  Icon,
  Tooltip,
} from "playbook-ui";
import "./PropsPanelTextarea.scss";

type PropsPanelTextareaProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  dialogTitle?: string;
  htmlOptions?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export const PropsPanelTextarea: React.FC<PropsPanelTextareaProps> = ({
  value,
  onChange,
  placeholder,
  dialogTitle = "Edit value",
  htmlOptions,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => setDialogOpen(false);

  return (
    <>
      <div className="props-panel-textarea">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...htmlOptions}
        />
        <div className="props-panel-textarea__expand">
          <Tooltip placement="top" text="Expand content to edit" zIndex={10}>
            <Icon
              aria={{ label: "Expand editor" }}
              icon="expand"
              htmlOptions={{ onClick: () => setDialogOpen(true) }}
              size="xs"
              cursor="pointer"
            />
          </Tooltip>
        </div>
      </div>

      <Dialog
        onClose={closeDialog}
        opened={dialogOpen}
        shouldCloseOnOverlayClick
        size="lg"
      >
        <Dialog.Header>{dialogTitle}</Dialog.Header>
        <Dialog.Body>
          <textarea
            className="props-panel-textarea__dialog"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...htmlOptions}
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={closeDialog} text="Save" />
          <Button onClick={closeDialog} text="Cancel" variant="link" />
        </Dialog.Footer>
      </Dialog>
    </>
  );
};
