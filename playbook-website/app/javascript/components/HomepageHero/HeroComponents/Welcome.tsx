import React from "react";
import {
  Title,
  Caption,
  Body,
  Flex,
  FlexItem,
  Image,
  Button,
} from "playbook-ui";
import { Logos } from "../ComponentData/LogosData";

const WelcomeComponent = () => {
  return (
    <>
      <Flex className="welcome_component">
        <FlexItem fixedSize="546px">
          <Title text="WELCOME TO PLAYBOOK" size={4} color="link" />
          <Title
            size={1}
            text="The Design System to help you ship faster."
            paddingBottom="sm"
          />
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
              marginRight="sm"
              tabIndex={0}
              text="Get started"
            />
            <Button
              fixedWidth
              tabIndex={0}
              text="Explore components"
              variant="secondary"
            />
          </Flex>
        </FlexItem>
      </Flex>
    </>
  );
};

export default WelcomeComponent;
