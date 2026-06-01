import { Link, useRouteLoaderData } from "react-router-dom";
import { Body, Card, Flex, Icon, Title } from "playbook-ui";

import { getKitPreview } from "../../../../../images/kit_previews";
import { linkFormat } from "../../../../../utilities/website_sidebar_helper";

import "./styles.scss";

type KitCardProps = {
  description: string;
  name: string;
  platform: string;
  parent?: string;
};

type KitCategory = {
  category: string;
  components: Array<{ name: string }>;
};

export const KitCard = ({
  description,
  name,
  platform,
  parent,
}: KitCardProps) => {
  const { kits } = useRouteLoaderData("site") as {
    kits: KitCategory[];
  };

  // Find which category this kit belongs to
  const kitCategory = kits?.find((category) =>
    category.components.some((component) => component.name === name),
  );

  const generateLink = ({
    componentName,
    platform,
    parent,
  }: {
    componentName: string;
    platform: string;
    parent?: string;
  }) => {
    if (parent && parent === "advanced_table") {
      return `/kits/advanced_table/${componentName}/${platform}`;
    }
    return `/kits/${componentName}/${platform}`;
  };
  const previewSrc = getKitPreview({
    category: kitCategory?.category,
    name,
    parent,
  });

  return (
    <Link
      className="kit-card-link border_radius_lg"
      to={generateLink({
        componentName: name,
        platform,
        parent,
      })}
    >
      <Card className="kit-card" padding="none" borderRadius="lg">
        <div aria-hidden className="kit-card-media">
          {previewSrc && (
            <img
              alt=""
              className="kit-card-media-image"
              src={previewSrc}
            />
          )}
        </div>
        <Flex
          className="kit-card-content"
          gap="xs"
          orientation="column"
          padding={{ xs: "xs", default: "sm" }}
        >
          <Flex
            align="center"
            className="kit-card-header"
            width="100%"
            justify="between"
          >
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
