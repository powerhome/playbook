import { ReactNode } from "react";
import { Link } from "react-router-dom";
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
  const pageClassName =
    pageType === "tokens" ? "tokens_show_page" : "global_props_page";

  return (
    <Flex className={pageClassName} justifyContent="center">
      <Flex
        maxWidth="lg"
        paddingY="xl"
        paddingX={{ xl: "none", default: "md" }}
        flexDirection="column"
        gap="md"
      >
        <BreadCrumbs>
          <BreadCrumbItem>
            <Link to={`/${pageType}`}>
              <Detail color="link">{pageType === "tokens" ? "Tokens" : "Global Props"}</Detail>
            </Link>
          </BreadCrumbItem>
          {isFlex ? (
            <>
              <BreadCrumbItem>
                <Link to="/global_props/flex_box">
                  <Detail color="link">Flex Box</Detail>
                </Link>
              </BreadCrumbItem>
              <BreadCrumbItem>
                <Detail color="link">{title}</Detail>
              </BreadCrumbItem>
            </>
          ) :
            <BreadCrumbItem>
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
