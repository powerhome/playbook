import { useState, useEffect } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { Body, Flex, Title } from "playbook-ui";

import { KitCard } from "../../components/KitCard";
import { KitGrid } from "../../components/KitGrid";
import { PageContainer } from "../../components/PageContainer";
import { linkFormat } from "../../../../../utilities/website_sidebar_helper";
import { usePlatform } from "../../contexts/PlatformContext";

import "./styles.scss";

interface Component {
  name: string;
  platforms: string[];
  description: string;
  status?: string;
  parent?: string;
}

type LoaderData = {
  components: Component[];
  category: string;
};

export default function CategoryShow() {
  const { components, category } = useLoaderData() as LoaderData;
  const [kitsToShow, setKitsToShow] = useState(components);
  const { platform } = usePlatform();

  // Update kitsToShow when components data changes from navigation (fix for bug where filtered kits would persist between categories)
  useEffect(() => {
    setKitsToShow(components);
  }, [components]);

  // Filter kits based on platform
  useEffect(() => {
    const filtered = components.filter((component: Component) => {
      return component.platforms?.includes(platform);
    });
    setKitsToShow(filtered);
  }, [platform, components]);

  return (
    <>
      <Title
        marginLeft="lg"
        marginTop="lg"
        size={1}
        text={linkFormat(category)}
      />

      <PageContainer>
        <Flex
          align="center"
          className="category-breadcrumb"
          marginBottom="md"
          paddingX="xl"
        >
          <NavLink to="/beta/kits">
            <Body className="previous-route" color="link">
              <b>Components</b>
            </Body>
          </NavLink>
          <Body marginX="xxs" text="/" />
          <Body>
            <b>{linkFormat(category)}</b>
          </Body>
        </Flex>

        {!kitsToShow.length && (
          <Flex justify="center" orientation="row">
            <Body text="No Results, Try Again" />
          </Flex>
        )}

        <KitGrid>
          {kitsToShow
            .filter((component) => component.status === "stable")
            .map(({ description, name, parent }: Component, index: number) => {
              return (
                <KitCard
                  description={description}
                  name={name}
                  key={`category-${name}-${index}`}
                  parent={parent}
                  platform={platform}
                />
              );
            })}
        </KitGrid>
      </PageContainer>
    </>
  );
}
