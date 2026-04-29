import { Link, useRouteLoaderData } from "react-router-dom";
import { Body, Card, Flex, Icon, Title } from "playbook-ui";

import { linkFormat } from "../../../../../utilities/website_sidebar_helper";

import "./styles.scss";

type KitCardProps = {
  description: string;
  name: string;
  platform: string;
  parent?: string;
};

export const KitCard = ({
  description,
  name,
  platform,
  parent,
}: KitCardProps) => {
  const { kits } = useRouteLoaderData("beta-site") as {
    kits: Array<{ category: string; components: Array<{ name: string }> }>;
  };

  // Find which category this kit belongs to
  const kitCategory = kits?.find((category: { components: any[] }) =>
    category.components?.some((component) => component.name === name),
  );

  const generateLink = ({ componentName, platform, parent }: any) => {
    if (parent && parent === "advanced_table") {
      return `/beta/kits/advanced_table/${componentName}/${platform}`;
    }
    return `/beta/kits/${componentName}/${platform}`;
  };

  return (
    <Link
      className="kit-card-link border_radius_lg"
      to={generateLink({
        componentName: name,
        platform,
        category: kitCategory?.category,
        parent,
      })}
        style={{
          maxWidth: "364px",
        }}
    >
      <Card className="kit-card" padding="none" borderRadius="lg">
        <div aria-hidden className="kit-card-media" />
        <Flex
          className="kit-card-content"
          orientation="column"
          padding={{ xs: "xxs", default: "sm" }}
        >
          <Flex
            align="center"
            className="kit-card-header"
            width="100%"
            justify="between"
          >
            <Title text={linkFormat(name)} size={4} truncate="1" />
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
              size="1x"
            />
          </Flex>
          <Body
            className="kit-card-description"
            color="light"
            truncate="2"
            text={description}
          />
        </Flex>
      </Card>
    </Link>
  );
};
