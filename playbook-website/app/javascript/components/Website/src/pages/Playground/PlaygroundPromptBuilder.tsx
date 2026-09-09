import React, { useEffect, useRef, useState } from "react";
import { Body, Button, Caption, Card, Flex, Icon, Title } from "playbook-ui";

// One example per built-in recipe category (see PromtBuilderRecipes/index.ts)
// so the vocabulary this local recipe matcher understands is discoverable —
// there's no LLM behind this to interpret an open-ended ask.
const EXAMPLE_PROMPTS = [
  "Settings page with two cards, fields, and toggles",
  "Dashboard with stats and a bar chart",
  "Contact form with name, email, and submit button",
  "Data table with a filter",
  "Empty state for no search results",
];

const MAX_VISIBLE_DIAGNOSTICS = 6;

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setPromptText("");
  }, [clearSignal]);

  useEffect(() => {
    if (!isMinimized) textareaRef.current?.focus();
  }, [isMinimized]);

  const handleClear = () => {
    setPromptText("");
    onClear();
  };

  const handleSubmit = () => {
    if (!promptText.trim()) return;
    onSubmit(promptText);
  };

  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      onMinimize();
    }
  };

  const visibleDiagnostics = diagnostics.slice(0, MAX_VISIBLE_DIAGNOSTICS);
  const hiddenDiagnosticsCount = diagnostics.length - visibleDiagnostics.length;

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
              onKeyDown={handleTextareaKeyDown}
              placeholder="Example: Build a compact settings page with two cards, fields, toggles, and save/cancel actions."
              ref={textareaRef}
              tabIndex={isMinimized ? -1 : 0}
              value={promptText}
          />
        </Flex>
        <Flex
            className="builder-prompt-examples"
            gap="xs"
            marginBottom="sm"
        >
          {EXAMPLE_PROMPTS.map((example) => (
            <button
                className="builder-prompt-example-chip"
                key={example}
                onClick={() => setPromptText(example)}
                tabIndex={isMinimized ? -1 : 0}
                type="button"
            >
              {example}
            </button>
          ))}
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
                onClick={handleSubmit}
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
            {visibleDiagnostics.map((diagnostic) => (
              <Caption
                  color="lighter"
                  key={diagnostic}
                  text={diagnostic}
              />
            ))}
            {hiddenDiagnosticsCount > 0 && (
              <Caption
                  color="lighter"
                  text={`+${hiddenDiagnosticsCount} more`}
              />
            )}
          </Flex>
        )}
      </Card>
    </>
  );
};
