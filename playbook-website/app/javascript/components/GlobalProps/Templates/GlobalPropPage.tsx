import React, { ReactNode } from "react";
import {
  Title,
  Flex,
  BreadCrumbs,
  BreadCrumbItem,
  Detail,
  Body,
  FlexItem,
} from "playbook-ui";
import CardHeader from "./Partials/CardHeader";
import VisualGuide from "./Partials/VisualGuide";

type GlobalPropsTypes = {
  title: string;
  description?: string;
  descriptionSecondary?: string;
  VisualGuideCard?: ReactNode | ReactNode[];
  children?: ReactNode | ReactNode[];
};

const GlobalPropPage = ({
  title,
  description,
  descriptionSecondary,
  VisualGuideCard,
  children,
}: GlobalPropsTypes) => {
  return (
    <Flex justifyContent="center">
      <Flex
        maxWidth="lg"
        paddingY="xl"
        paddingX="md"
        flexDirection="column"
        gap="md"
      >
        <BreadCrumbs>
          <BreadCrumbItem href="/global_props">
            <Detail color="link">Global Props</Detail>
          </BreadCrumbItem>
          <BreadCrumbItem href="#">
            <Detail color="default">{title}</Detail>
          </BreadCrumbItem>
        </BreadCrumbs>
        <Title size={1}>{title}</Title>
        <CardHeader />
        {description && <Body>{description}</Body>}
        {descriptionSecondary && <Body>{descriptionSecondary}</Body>}
        <VisualGuide>{VisualGuideCard}</VisualGuide>
        {children}
      </Flex>
    </Flex>
  );
};

export default GlobalPropPage;
