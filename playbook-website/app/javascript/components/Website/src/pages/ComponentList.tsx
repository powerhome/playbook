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
        <Flex paddingX="md" orientation="column" flex="1">
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
                  <Card 
                    className="category-card" key={`${name}-${index}}`}
                    paddingX={{ xs: "sm", sm: "lg", md: "lg", lg: "lg", xl: "lg" }}
                    paddingTop={{ xs: "xxs", default: "md"}}
                    paddingBottom={{ xs: "xxs", default: "lg"}}
                  >
                    <NavLink to={name}>
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
                        <Icon className="icon mobile" fixedWidth icon="angle-right" size="xs" />
                        <Icon className="icon desktop" fixedWidth icon="angle-right" size="2x" />
                      </Flex>
                      <Body
                        className="category-card-description"
                        text={description}
                      />
                    </NavLink>
                  </Card>
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
