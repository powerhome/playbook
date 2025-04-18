import React from "react";
import { Flex, Avatar, Title, Body, Badge } from "playbook-ui";

export default function App() {
  return (
      <Flex flexDirection="column">
        <Avatar
          imageAlt="Tori Johnson Standing"
          imageUrl="https://randomuser.me/api/portraits/women/27.jpg"
          name="Tori Johnson"
          size="md"
          status="offline"
        />
        <Flex alignItems="center" justifyContent="center">
          <Title paddingRight="xs" text="Tori Johnson" size={4} />
          <Badge text="inactive" variant="neutral" dark />
        </Flex>
        <Body color="light">
          <b>User Experience Designer</b>
        </Body>
        <Body color="light" text="PHL • User Experience" />
      </Flex>
  );
}