import React from "react";
import { Background, Flex, FlexItem, Image } from "playbook-ui";
import WelcomeComponent from "./Welcome";
import ConnectedDevicesCard from "../HeroComponents/ConnectedDevices";
import NotificationsSmallCard from "../HeroComponents/NotificationsSmall";
import OrderDetailsCard from "../HeroComponents/OrderDetails";
import SelectPlanCard from "../HeroComponents/SelectPlan";
import SubscribeToggleCard from "../HeroComponents/SubscribeToggle";
import TicketsChartCard from "../HeroComponents/TicketsChart";
import Blur from "../HeroComponents/Blur";
// @ts-ignore
import GridMedium from "../../../images/MediumBackgroundGrid.svg";

const MediumScreen = () => {
  return (
    <Flex
      className="homepage_hero_container"
      marginX="md"
      maxWidth="xl"
      orientation="column"
      paddingTop="xl"
    >
      <Background
        alignItems="center"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingTop="xl"
        paddingBottom="sm"
      >
        <WelcomeComponent
          fixedSize="963px"
          headerAlign="center"
          buttonsAlignment="center"
          displayProps={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      </Background>

      <Background
        className="homepage_hero_container_cards"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Image url={GridMedium} />
        <Flex orientation="column">
          <FlexItem
            alignSelf="end"
            className="homepage_hero_container_cards_blur_3"
            position="absolute"
          >
            <Blur
              background="var(--data-3, #9E64E9)"
              borderRadius="570.112px"
              filter="blur(100px)"
              flexShrink="0"
              height="138.544px"
              width="184.867px"
            />
          </FlexItem>
          <FlexItem
            className="homepage_hero_container_cards_blur_4"
            position="absolute"
          >
            <Blur
              background="rgba(0, 130, 255, 0.25)"
              borderRadius="var(--border-radius-none, 479.808px)"
              filter="blur(100px)"
              flexShrink="0"
              height="359.581px"
              width="479.808px"
            />
          </FlexItem>
        </Flex>
        <TicketsChartCard />
        <ConnectedDevicesCard />
        <NotificationsSmallCard />
        <OrderDetailsCard />
        <SelectPlanCard />
        <SubscribeToggleCard />
      </Background>
    </Flex>
  );
};

export default MediumScreen;
