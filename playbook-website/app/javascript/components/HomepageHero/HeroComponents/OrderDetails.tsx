import React from "react";
import {
  Flex,
  Card,
  Image,
  Caption,
  Detail,
  Button,
  ProgressStep,
  ProgressStepItem,
} from "playbook-ui";

const OrderDetailsCard = () => {
  return (
    <Flex
      className="order_details component_example"
      cursor="pointer"
      hover={{ scale: "sm" }}
    >
      <Card borderNone borderRadius="lg" shadow="deepest" padding="sm">
        <Flex orientation="column" gap="lg" align="stretch">
          <ProgressStep icon>
            <ProgressStepItem status="complete">
              <Caption size="xs" text="Confirmed" />
            </ProgressStepItem>
            <ProgressStepItem status="active">
              <Caption size="xs" text="Shipped" />
            </ProgressStepItem>
            <ProgressStepItem status="inactive">
              <Caption size="xs" text="Delivered" />
            </ProgressStepItem>
          </ProgressStep>
          <Flex
            align="center"
            gap="sm"
            hover={{ scale: "sm" }}
            paddingRight="xl"
            paddingTop="xs"
          >
            <Image
              alt="Jean Jacket"
              rounded
              size="sm"
              url="https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80"
            />
            <Flex orientation="column">
              <Detail bold color="light" text="Est. delivery Sept 12-16" />
              <Button
                className="button-padding"
                size="sm"
                padding="none"
                variant="link"
                text="Order details & help"
                iconRight
                icon="arrow-right"
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default OrderDetailsCard;
