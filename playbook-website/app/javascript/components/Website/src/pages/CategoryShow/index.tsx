import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { Body, Flex, Icon } from "playbook-ui";

import { KitCard } from "../../components/KitCard";
import { KitGrid } from "../../components/KitGrid";
import { Hero } from "../../components/Hero";
import { PageContainer } from "../../components/PageContainer";
import { linkFormat } from "../../../../../utilities/website_sidebar_helper";

import "./styles.scss";

export default function CategoryShow() {
  const { components, name, description } = useLoaderData();

  return (
    <>
      <Hero description={description} title={linkFormat(name)} />
      <PageContainer>
        <Flex align="center">
          <NavLink to="/beta/kits">
            <Body color="light">Components</Body>
          </NavLink>
          <Icon className="category-breadcrumb-icon" icon="angle-right" />
          <Body text={linkFormat(name)} />
        </Flex>
        <KitGrid>
          {components.map(({ description, name }, index) => (
            <KitCard
              description={description}
              name={name}
              key={`category-${name}-${index}`}
            />
          ))}
        </KitGrid>
      </PageContainer>
    </>
  );
}
