import React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useOutlet,
} from "react-router-dom";
import { Body, Card, Flex, Icon, Title } from "playbook-ui";
import { linkFormat } from "../../../../utilities/website_sidebar_helper";

import "../assets/styles.scss";

export default function ComponentList() {
  const outlet = useOutlet();
  const { kits } = useLoaderData();

  console.log("componentList", kits);
  return (
    <Flex paddingLeft="md">
      {!outlet && (
        <Flex paddingX="md" orientation="column">
          {kits.map(({ name, components }, index) => (
            <section
              className="category mb_xl"
              key={`${name}-${index}`}
              id={name}
            >
              <Link to={`kit_category/${name}`}>
                <Title
                  marginBottom="md"
                  size={2}
                  tag="h1"
                  text={linkFormat(name)}
                />
              </Link>
              <div className="category-container">
                {components.map(({ name, description }, index) => (
                  <NavLink to={name}>
                    <Card className="category-card" key={`${name}-${index}}`}>
                      <Flex
                        align="center"
                        className="category-card-header"
                        justify="between"
                      >
                        <Title
                          text={linkFormat(name)}
                          size={{ xs: "4", sm: "3", md: "3", lg: "3", xl: "3" }}
                          truncate="1"
                        />
                        <div className="icon">
                          <Icon fixedWidth icon="angle-right" size="2x" />
                        </div>
                      </Flex>
                      <Body
                        className="category-card-description"
                        text={description}
                      />
                    </Card>
                  </NavLink>
                ))}
              </div>
            </section>
          ))}
        </Flex>
      )}
      <Outlet />
    </Flex>
  );
}
