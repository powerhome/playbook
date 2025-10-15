import React, { ReactNode } from "react";
import {
  Title,
  Flex,
  BreadCrumbs,
  BreadCrumbItem,
  Detail,
  Body,
} from "playbook-ui";
import CardHeader from "./Partials/CardHeader";
import VisualGuide from "./Partials/VisualGuide";

type ShowPageTypes = {
  isFlex?: boolean;
  title: string;
  description?: string | ReactNode;
  descriptionSecondary?: string | ReactNode;
  VisualGuideCard?: ReactNode | ReactNode[];
  children?: ReactNode | ReactNode[];
  pageType?: "tokens" | "global_props";
};

const ShowPage = ({
  isFlex = false,
  title,
  description,
  descriptionSecondary,
  VisualGuideCard,
  children,
  pageType = "global_props",
}: ShowPageTypes) => {
  return (
    <Flex justifyContent="center">
      <Flex
        maxWidth="lg"
        paddingY="xl"
        paddingX={{ xl: "none", default: "md" }}
        flexDirection="column"
        gap="md"
      >
        <BreadCrumbs>
          <BreadCrumbItem href={`/${pageType}`}>
            <Detail color="link">{pageType === "tokens" ? "Tokens" : "Global Props"}</Detail>
          </BreadCrumbItem>
          {isFlex ? (
            <>
            <BreadCrumbItem href="/global_props/flex_box">
              <Detail color="link">Flex Box</Detail>
            </BreadCrumbItem>
              <BreadCrumbItem href="#">
              <Detail color="link">{title}</Detail>
            </BreadCrumbItem>
            </>
          ) : 
          <BreadCrumbItem href="#">
            <Detail color="default">{title}</Detail>
          </BreadCrumbItem>
          }
        </BreadCrumbs>
        <Title size={1}>{title}</Title>
        {pageType === "global_props" && <CardHeader />}
        {description && <Body>{description}</Body>}
        {descriptionSecondary && <Body>{descriptionSecondary}</Body>}
        {VisualGuideCard && <VisualGuide>{VisualGuideCard}</VisualGuide>}
        {children}
      </Flex>
    </Flex>
  );
};

export default ShowPage;
