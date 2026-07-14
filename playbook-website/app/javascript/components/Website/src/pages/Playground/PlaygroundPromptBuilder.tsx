import React, { useEffect, useState } from "react";
import { Body, Button, Caption, Card, Flex, Icon, Title } from "playbook-ui";

type PlaygroundPromptBuilderProps = {
  clearSignal: number;
  diagnostics: string[];
  hasPreviousIteration: boolean;
  isMinimized: boolean;
  status: string | null;
  onClear: () => void;
  onMinimize: () => void;
  onOpen: () => void;
  onRestorePreviousIteration: () => void;
  onSubmit: (prompt: string) => void;
};

export const PlaygroundPromptBuilder = ({
  clearSignal,
  diagnostics,
  hasPreviousIteration,
  isMinimized,
  status,
  onClear,
  onMinimize,
  onOpen,
  onRestorePreviousIteration,
  onSubmit,
}: PlaygroundPromptBuilderProps) => {
  const [promptText, setPromptText] = useState("");

  useEffect(() => {
    setPromptText("");
  }, [clearSignal]);

  const handleClear = () => {
    setPromptText("");
    onClear();
  };

  return (
    <>
      <button
          aria-hidden={!isMinimized}
          aria-label="Open prompt builder"
          className={`builder-prompt-fab ${
          isMinimized ? "is-visible" : "is-hidden"
        }`}
          onClick={onOpen}
          tabIndex={isMinimized ? 0 : -1}
          type="button"
      >
        <Icon icon="sparkles" />
        <span
            className="builder-prompt-fab-tooltip"
            role="tooltip"
        >
          {"Prompt Builder"}
        </span>
      </button>
      <Card
          className={`builder-prompt-floating playground-panel-controls ${
          isMinimized ? "is-hidden" : "is-visible"
        }`}
          padding="md"
      >
        <Flex
            align="center"
            className="builder-prompt-header"
            justify="between"
            marginBottom="sm"
        >
          <Title
              size={4}
              text="Prompt Builder"
          />
          <button
              aria-label="Minimize prompt builder"
              className="builder-prompt-icon-button"
              onClick={onMinimize}
              type="button"
          >
            <Icon icon="minus" />
          </button>
        </Flex>
        <Flex
            className="builder-field"
            gap="xs"
            marginBottom="sm"
            orientation="column"
        >
          <Caption
              color="lighter"
              text="Describe the screen"
          />
          <textarea
              className="builder-prompt-textarea"
              onChange={(event) => setPromptText(event.target.value)}
              placeholder="Example: Build a compact settings page with two cards, fields, toggles, and save/cancel actions."
              tabIndex={isMinimized ? -1 : 0}
              value={promptText}
          />
        </Flex>
        <Flex
            gap="xs"
            orientation="column"
        >
          <Flex width="100%">
            <Button
                disabled={!promptText.trim()}
                fullWidth
                icon="sparkles"
                onClick={() => onSubmit(promptText)}
                text="Build"
            />
          </Flex>
          <Flex
              gap="xs"
              width="100%"
          >
            <Button
                disabled={!hasPreviousIteration}
                fullWidth
                icon="undo"
                onClick={onRestorePreviousIteration}
                text="Undo"
                variant="secondary"
            />
            <Button
                disabled={!promptText.trim() && !status && diagnostics.length === 0}
                fullWidth
                icon="trash"
                onClick={handleClear}
                text="Clear"
                variant="secondary"
            />
          </Flex>
        </Flex>
        {status && (
          <Body
              color="light"
              marginTop="sm"
              text={status}
          />
        )}
        {diagnostics.length > 0 && (
          <Flex
              gap="xxs"
              marginTop="xs"
              orientation="column"
          >
            {diagnostics.slice(0, 4).map((diagnostic) => (
              <Caption
                  color="lighter"
                  key={diagnostic}
                  text={diagnostic}
              />
            ))}
          </Flex>
        )}
      </Card>
    </>
  );
};
