import React from "react";
import { Flex, Icon, Title } from "playbook-ui";

import { linkFormat } from "../../../../../utilities/website_sidebar_helper";

import "./styles.scss";

type CategoryTitleProps = {
  name: string;
};

export const CategoryTitle = ({ name }: CategoryTitleProps): React.ReactElement => {
  return (
    <Flex align="center" className="category-title" gap="xs" marginBottom="md">
      <Title size={{ xs: 3, sm: 2, md: 2, lg: 2, xl: 2 }} tag="h1" text={linkFormat(name)} />
      <Icon className="icon mobile" icon="circle-arrow-right" size="sm" />
      <Icon className="icon desktop" icon="circle-arrow-right" size="xl" />
    </Flex>
  );
};
