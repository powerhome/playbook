import React, { useEffect, useState } from "react";
import { Card, Body, Icon, Flex, usePBCopy, Tooltip } from "playbook-ui";

type ExampleCodeCardTypes = {
  id?: string;
  text?: string;
  copyIcon?: boolean;
};
const ExampleCodeCard = ({ text, id, copyIcon = true }: ExampleCodeCardTypes) => {
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
      cursor={copyIcon ? "pointer" : "default"}
      alignItems="center"
      gap="xxs"
      htmlOptions={{ onClick: () => copyIcon && handleCopy() }}
    >
      <Card
        borderRadius="sm"
        background="light"
        padding="xxs"
        borderNone
        className="value-card"
      >
        <Body id={id} >
          {text}
        </Body>
      </Card>
      {
        copyIcon && (
<Tooltip
        delay={{ close: 1000 }}
        forceOpenTooltip={showTooltip}
        placement="top"
        showTooltip={false}
        text="Copied!"
      >
        <Icon icon="clipboard" color="light" />
      </Tooltip>
        )
      }
      
    </Flex>
  );
};

export default ExampleCodeCard;
