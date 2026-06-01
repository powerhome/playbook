import { ReactNode } from "react";
import { Card, Body, Tooltip } from "playbook-ui";

type ValueCardTypes = {
  isImage?: boolean;
  text?: string;
  tooltipText?: string | ReactNode;
};
const ValueCardWithTooltip = ({ text, tooltipText, isImage }: ValueCardTypes) => {
  return (
    <>
      {tooltipText ? (
        <Tooltip className={isImage ? "image" : ""} dark={isImage} placement="top" text={tooltipText} zIndex={10}>
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
