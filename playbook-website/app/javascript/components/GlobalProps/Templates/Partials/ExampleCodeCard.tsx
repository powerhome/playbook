import React, { useEffect, useState } from "react";
import { Card, Body, Icon, Flex, usePBCopy, Tooltip } from "playbook-ui";

type ExampleCodeCardTypes = {
  id?: string;
  text?: string;
};
const ExampleCodeCard = ({ text, id }: ExampleCodeCardTypes) => {
  // eslint-disable-next-line no-unused-vars
  const [copied, copyToClipboard] = usePBCopy({ from: id });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    copyToClipboard();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", handleCopy);
    return () => {
      el.removeEventListener("click", handleCopy);
    };
  }, [copyToClipboard]);

  return (
    <Flex
      cursor="pointer"
      alignItems="center"
      gap="xxs"
      htmlOptions={{ onClick: () => handleCopy() }}
    >
      <Card
        borderRadius="xs"
        background="light"
        padding="none"
        borderNone
        className="value-card"
      >
        <Body id={id} paddingX="xs">
          {text}
        </Body>
      </Card>
      <Tooltip
        delay={{ close: 1000 }}
        forceOpenTooltip={showTooltip}
        placement="top"
        showTooltip={false}
        text="Copied!"
      >
        <Icon icon="clipboard" color="light" />
      </Tooltip>
    </Flex>
  );
};

export default ExampleCodeCard;
