import React from "react";
import { Outlet } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";
import HeaderMobile from "../../images/pb_generic_header.jpg";
import HeaderDesktop from "../../images/pb_generic_header_desktop.jpg";

import {
  Layout,
  FlexItem,
  Flex,
  Icon,
  Background,
  Button,
  Title,
  TextInput,
  Card,
  Nav,
  NavItem,
  Body,
} from "playbook-ui";

export default function LayoutRight({ isMobile, dark, content }) {
  console.log("content", content);
  return (
    <Layout.Body>
      <div className={`pb--page--content--main ${dark}`}>
        {!isMobile && (
          <Flex spacing="between" vertical="center">
            <Button
              text="Back to Legacy View"
              variant="link"
              icon="circle-left"
              tag="h1"
              marginY="xs"
              paddingLeft="none"
              marginBottom="none"
              paddingBottom="none"
              link="/kits"
              marginLeft="md"
            />
            <FlexItem
              marginRight="md"
              className="pb--page--dark-mode-toggle-desktop"
            >
              <DarkModeToggle initMode={dark} />
            </FlexItem>
          </Flex>
        )}
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
            xs: HeaderMobile,
            sm: HeaderMobile,
            md: HeaderDesktop,
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

        <Flex marginX="auto" maxWidth="xxl" orientation="column">
          <Flex justify="center" orientation="row">
            <Nav orientation="horizontal" variant="subtle">
              <NavItem iconLeft="atom" link="#" text="React" />
              <NavItem iconLeft="atom" link="#" text="Rails" />
              <NavItem iconLeft="atom" link="#" text="Swift" />
            </Nav>
          </Flex>
          <Flex justify="center" marginY="lg" orientation="row">
            <TextInput />
          </Flex>

          {content.map((item, index) => (
            <>
              {Object.keys(item).map((kit) => (
                <section className="category mb_xl" key={kit}>
                  <Title marginBottom="md" size={2} tag="h2" text={kit} />
                  <div className="category-container">
                    {item[kit].map(({ name, description }, index) => (
                      <Card className="category-card" key={index}>
                        <Flex
                          align="center"
                          className="category-card-header"
                          justify="between"
                        >
                          <Title text={name} />
                          <div className="icon">
                            <Icon fixedWidth icon="angle-right" size="2x" />
                          </div>
                        </Flex>
                        <Body
                          className="category-card-description"
                          text={description}
                        />
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </>
          ))}
        </Flex>
        {/* test */}
        {/* <Outlet /> */}
      </div>
    </Layout.Body>
  );
}
