import React, { useState } from "react";
import { Button, Caption, Card, Flex } from "playbook-ui";

interface CodePanelProps {
  code: string;
  hasModifiedProps: boolean;
  onReset: () => void;
}

export const CodePanel: React.FC<CodePanelProps> = ({ code, hasModifiedProps, onReset }) => {
  const [copyState, setCopyState] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState(true);
      setTimeout(() => setCopyState(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <Card padding="none" width="100%">
      <Flex justify="between" align="center" padding="sm">
        <Caption text="Code" color="lighter" />
        <Flex gap="xs">
          {hasModifiedProps && (
            <Button text="Reset" variant="link" size="sm" icon="undo" onClick={onReset} />
          )}
          <Button
            text={copyState ? "Copied!" : "Copy"}
            variant="link"
            size="sm"
            icon="copy"
            onClick={copyCode}
          />
        </Flex>
      </Flex>
      <Card borderNone background="light">
        <pre className="highlight" style={{ margin: 0, padding: "16px", overflow: "auto" }}>
          <code>{code}</code>
        </pre>
      </Card>
    </Card>
  );
};
