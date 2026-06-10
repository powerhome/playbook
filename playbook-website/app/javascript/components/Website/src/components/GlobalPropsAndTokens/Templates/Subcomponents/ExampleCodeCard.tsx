import { useState } from "react";
import { Card, Body, Icon, Flex, usePBCopy, Tooltip } from "playbook-ui";

type ExampleCodeCardTypes = {
  id?: string;
  text?: string;
  copyIcon?: boolean;
  marginBottom?: string;
};

const ExampleCodeCard = ({
  text,
  id,
  copyIcon = true,
  marginBottom,
}: ExampleCodeCardTypes) => {
  // eslint-disable-next-line no-unused-vars
  const [copied, copyToClipboard] = usePBCopy({ from: id });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    copyToClipboard();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCopy();
    }
  };

  if (!copyIcon) {
    return (
      <Flex alignItems="center" gap="xxs" marginBottom={marginBottom || undefined}>
        <Card background="light" borderNone borderRadius="sm" padding="xxs">
          <Body>{text}</Body>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      gap="xxs"
      htmlOptions={{
        "aria-label": `Copy ${text} to clipboard`,
        onClick: handleCopy,
        onKeyDown: handleKeyDown,
        role: "button",
        tabIndex: 0,
      }}
      inline="flex"
      marginBottom={marginBottom || undefined}
    >
      <Card borderRadius="sm" background="light" padding="xxs" borderNone>
        <Body id={id}>{text}</Body>
      </Card>
      <Tooltip
        delay={{ close: 1000 }}
        forceOpenTooltip={showTooltip}
        placement="top"
        showTooltip={false}
        text="Copied!"
      >
        <Icon aria={{ hidden: true }} color="light" icon="clipboard" />
      </Tooltip>
    </Flex>
  );
};

export default ExampleCodeCard;
