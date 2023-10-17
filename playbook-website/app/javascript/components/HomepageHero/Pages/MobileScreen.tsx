import React from "react";
import { Background } from "playbook-ui";
import WelcomeComponent from "./Welcome";

const MobileScreen = () => {
  return (
    <>
      <Background
        alignItems="center"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingY="md"
      >
        <WelcomeComponent
          buttonFullWidth={true}
          buttonsAlignment="center"
          buttonsFlexDirection="column"
          displayProps={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          fixedSize="374px"
          headerAlign="center"
          titleSize={3}
        />
      </Background>
    </>
  );
};

export default MobileScreen;
