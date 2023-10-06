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
            ButtonsAlignment="center"
            displayProps={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            TitleSize={3}
          />
        </Background>
      </Flex>
    </>
  );
};

export default MobileScreen;
