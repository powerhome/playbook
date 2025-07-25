import React, { useEffect, useState } from "react";
import { Card, Body, Tooltip } from "playbook-ui";

type ValueCardTypes = {
  text?: string;
  tooltipText?: string;
};
const ValueCardWithTooltip = ({ text, tooltipText }: ValueCardTypes) => {
  return (
    <>
      {tooltipText ? (
        <Tooltip placement="top" text={tooltipText} zIndex={10}>
          <Card
            borderRadius="sm"
            background="light"
            padding="xxs"
            borderNone
            className="value_card_with_tooltip"
          >
            <Body>{text}</Body>
          </Card>
        </Tooltip>
      ) : (
        <Card borderRadius="sm" background="light" padding="xxs" borderNone>
          <Body>{text}</Body>
        </Card>
      )}
    </>
  );
};

export default ValueCardWithTooltip;
