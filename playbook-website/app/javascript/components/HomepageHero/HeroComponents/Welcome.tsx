import React from "react";
import { Title, Body, Flex, FlexItem, Image, Button } from "playbook-ui";
import { Logos } from "../ComponentData/LogosData";
// @ts-ignore
import Underline from "../../../images/PurpleUnderline.svg";

const WelcomeComponent = () => {
  return (
    <>
      <Flex className="welcome_component">
        <FlexItem fixedSize="546px">
          <Title text="WELCOME TO PLAYBOOK" size={4} color="link" />
          <Title size={1} paddingBottom="sm" position="relative">
            {" "}
            The Design System to help you{" "}
            <span>
              ship faster.
              <Image
                position="absolute"
                className="welcome_component_underline"
                url={Underline}
              />
            </span>
          </Title>
          <Body
            color="light"
            text="Playbook makes it easy to support bleeding edge, or legacy systems. Use Playbook’s 200+ components and end-to-end design language to create simple, intuitive and beautiful experiences with ease."
          />
          <Flex paddingY="lg">
            {Logos.map(({ text, logo }) => (
              <>
                <Flex align="center" paddingRight="sm">
                  <Image url={logo} />
                  <Body paddingLeft="xxs" text={text} color="light" />
                </Flex>
              </>
            ))}
          </Flex>
          <Flex>
            <Button
              fixedWidth
              icon="arrow-right"
              iconRight
              link="/guides/getting_started"
              marginRight="sm"
              tabIndex={0}
              text="Get started"
              zIndex={2}
            />
            <Button
              fixedWidth
              link="/kits"
              tabIndex={0}
              text="Explore components"
              variant="secondary"
              zIndex={2}
            />
          </Flex>
        </FlexItem>
      </Flex>
    </>
  );
};

export default WelcomeComponent;
