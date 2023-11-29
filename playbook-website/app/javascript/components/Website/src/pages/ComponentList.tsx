import React, { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useOutlet,
} from "react-router-dom";
import { Background, Body, Card, Flex, Icon, Title } from "playbook-ui";
import { linkFormat } from "../../../../utilities/website_sidebar_helper";
// import HeaderMobile from "../../../javascript/images/pb_generic_header.jpg";
// import HeaderDesktop from "../../../../../javascript/images/pb_generic_header.jpg"
import HeaderDesktop from "../../../../images/pb_generic_header_desktop.jpg"
// /Users/augustocmallmann/powerhome/playbook/playbook-website/app/javascript/images/pb_generic_header_desktop.jpg
import "../assets/styles.scss";

export default function ComponentList() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const outlet = useOutlet();
  const { kits } = useLoaderData();

  console.log("componentList", kits);
  return (
    <Flex align="stretch" paddingLeft="md" maxWidth="xxl" marginX="auto" orientation="column">
      {!outlet && (
        <>
          <Background
            alt="background with blue colors fading to darker blue"
            margin={{
              xs: "none",
              sm: "none",
              md: "md",
              lg: "md",
              xl: "md",
            }}
            marginTop={{ md: "none", lg: "none", xl: "none" }}
            padding={{ md: "xl", default: "xl" }}
            paddingTop={{ xs: "lg" }}
            paddingBottom={{ xs: "xs" }}
            paddingX={{ xs: "xs" }}
            textAlign={isMobile ? "center" : "left"}
            borderRadius={isMobile ? "none" : "lg"}
            backgroundSize={{
              default: "1105px 243px",
              xs: "80%",
              sm: "80%",
              md: "1105px 243px",
            }}
            backgroundPosition={{
              default: "right bottom",
              xs: "center top",
              sm: "center top",
              md: "right bottom",
            }}
            backgroundColor="dark"
            backgroundRepeat="no-repeat"
            imageUrl={{
              default: HeaderDesktop,
              // xs: HeaderMobile,
              // sm: HeaderMobile,
              // md: HeaderDesktop,
            }}
          >
            <Title
              size={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}
              paddingTop={{ xs: "xl", sm: "xl", md: "none" }}
              paddingBottom={{ default: "sm" }}
              text="Components"
              marginBottom={{ xs: "sm", md: "xs" }}
              dark
            />
            {!isMobile && (
              <Body
                maxWidth="sm"
                lineHeight="loose"
                paddingBottom="xl"
                dark
                text="Components are the reusable building blocks of our design system. Each component meets a specific interaction or UI need, and has been specifically created to work together to create patterns and intuitive user experiences."
              />
            )}
          </Background>
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
                      className="category-card"
                      key={`${name}-${index}}`}
                      paddingX={{
                        xs: "sm",
                        sm: "lg",
                        md: "lg",
                        lg: "lg",
                        xl: "lg",
                      }}
                      paddingTop={{ xs: "xxs", default: "md" }}
                      paddingBottom={{ xs: "xxs", default: "lg" }}
                    >
                      <NavLink to={name}>
                        <Flex
                          align="center"
                          className="category-card-header"
                          justify="between"
                        >
                          <Title
                            text={linkFormat(name)}
                            size={{
                              xs: "4",
                              sm: "3",
                              md: "3",
                              lg: "3",
                              xl: "3",
                            }}
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
                            size="2x"
                          />
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
        </>
      )}
      <Outlet />
    </Flex>
  );
}
