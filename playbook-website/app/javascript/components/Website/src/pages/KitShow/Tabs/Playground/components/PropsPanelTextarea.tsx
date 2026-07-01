import React, { useState } from "react";
import {
  Button,
  Caption,
  Card,
  Dialog,
  Flex,
  Icon,
  Tooltip,
} from "playbook-ui";
import { SyntaxHighlightedCode } from "../../../../../components/SyntaxHighlightedCode";
import "./PropsPanelTextarea.scss";

type PropsPanelTextareaProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  dialogTitle?: string;
  exampleFormat?: string;
  exampleLanguage?: "json" | "jsx";
  htmlOptions?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export const PropsPanelTextarea: React.FC<PropsPanelTextareaProps> = ({
  value,
  onChange,
  placeholder,
  dialogTitle = "Edit value",
  exampleFormat,
  exampleLanguage = "json",
  htmlOptions,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copyState, setCopyState] = useState(false);

  const closeDialog = () => setDialogOpen(false);

  const copyExample = async () => {
    if (!exampleFormat) return;

    try {
      await navigator.clipboard.writeText(exampleFormat);
      setCopyState(true);
      setTimeout(() => setCopyState(false), 2000);
    } catch (err) {
      console.error("Failed to copy example format:", err);
    }
  };

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
          {exampleFormat ? (
            <div className="props-panel-textarea__example">
              <Flex align="center" justify="between" marginBottom="xs">
                <Caption text="Example format" />
                <Button
                  icon="copy"
                  onClick={copyExample}
                  size="sm"
                  text={copyState ? "Copied!" : "Copy"}
                  variant="link"
                />
              </Flex>
              <Card background="light" borderNone padding="none">
                <SyntaxHighlightedCode
                  code={exampleFormat}
                  language={exampleLanguage}
                />
              </Card>
            </div>
          ) : null}
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
