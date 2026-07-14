import React from "react";
import { Body, Button, Caption, Card, Flex, Icon, Title } from "playbook-ui";

type PlaygroundPromptBuilderProps = {
  diagnostics: string[];
  isMinimized: boolean;
  promptText: string;
  status: string | null;
  onMinimize: () => void;
  onOpen: () => void;
  onPromptTextChange: (value: string) => void;
  onSubmit: () => void;
};

export const PlaygroundPromptBuilder = ({
  diagnostics,
  isMinimized,
  promptText,
  status,
  onMinimize,
  onOpen,
  onPromptTextChange,
  onSubmit,
}: PlaygroundPromptBuilderProps) => (
  <>
    <button
        aria-hidden={!isMinimized}
        aria-label="Open prompt builder"
        className={`builder-prompt-fab ${isMinimized ? "is-visible" : "is-hidden"}`}
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
            onChange={(event) => onPromptTextChange(event.target.value)}
            placeholder="Example: Build a compact settings page with two cards, fields, toggles, and save/cancel actions."
            tabIndex={isMinimized ? -1 : 0}
            value={promptText}
        />
      </Flex>
      <Button
          disabled={!promptText.trim()}
          fullWidth
          icon="sparkles"
          onClick={onSubmit}
          text="Build"
      />
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
