import React, { useState } from "react";
import { Button, Caption, Card, Flex } from "playbook-ui";
import { SyntaxHighlightedCode } from "../../../../../components/SyntaxHighlightedCode";

interface CodePanelProps {
  code: string;
}

export const CodePanel: React.FC<CodePanelProps> = ({ code }) => {
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
        <Caption text="Code" />
          <Button
            text={copyState ? "Copied!" : "Copy Code"}
            variant="link"
            size="sm"
            icon="copy"
            onClick={copyCode}
          />
      </Flex>
      <Card borderNone background="light">
        <SyntaxHighlightedCode code={code} language="tsx" />
      </Card>
    </Card>
  );
};
