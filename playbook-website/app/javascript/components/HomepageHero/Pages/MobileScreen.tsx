import React from "react";
import { Background, Flex } from "playbook-ui";
import WelcomeComponent from "./Welcome";

const MobileScreen = () => {
  return (
    <>
      <Flex
        className="homepage_hero_container"
        marginX="md"
        maxWidth="xl"
        orientation="column"
        paddingY="xl"
      >
        <Background
          alignItems="center"
          backgroundColor="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          paddingY="md"
        >
          <WelcomeComponent
            fixedSize="374px"
            headerAlign="center"
            buttonsAlignment="center"
            displayProps={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            titleSize={3}
          />
        </Background>
      </Flex>
    </>
  );
};

export default MobileScreen;
