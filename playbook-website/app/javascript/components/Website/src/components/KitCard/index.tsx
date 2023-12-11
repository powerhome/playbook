import React from "react";
import { Body, Card, Flex, Icon, Title } from "playbook-ui";

import { linkFormat } from "../../../../../utilities/website_sidebar_helper";

import "./styles.scss";

type KitCardProps = {
  description: string;
  name: string;
};

export const KitCard = ({ description, name }: KitCardProps) => {
  return (
    <Card
      className="kit-card"
      paddingX={{
        xs: "sm",
        sm: "md",
        md: "md",
        lg: "md",
        xl: "md",
      }}
      paddingTop={{ xs: "xxs", default: "md" }}
      paddingBottom={{ xs: "xxs", default: "md" }}
      borderRadius="lg"
    >
      <a href={`/kits/${name}`}>
        <Flex align="center" className="kit-card-header" justify="between">
          <Title
            text={linkFormat(name)}
            size={4}
            truncate="1"
          />
          <Icon
            className="icon mobile"
            fixedWidth
            icon="angle-right"
            size="sm"
          />
          <Icon
            className="icon desktop"
            fixedWidth
            icon="angle-right"
            size="2x"
          />
        </Flex>
        <Body
          className="kit-card-description"
          color="light"
          truncate="2"
          text={description}
        />
      </a>
    </Card>
  );
};
