import React from "react";
import { Background, Flex, FlexItem, Image } from "playbook-ui";
import WelcomeComponent from "./HeroComponents/Welcome";
import ConnectedDevicesCard from "./HeroComponents/ConnectedDevices";
import HoverCard from "./HeroComponents/Hover";
import LettuceCheckboxCard from "./HeroComponents/LettuceCheckbox";
import NewsNavCard from "./HeroComponents/NewsNav";
import NotificationsLargeCard from "./HeroComponents/NotificationsLarge";
import NotificationsSmallCard from "./HeroComponents/NotificationsSmall";
import OrderDetailsCard from "./HeroComponents/OrderDetails";
import SelectPlanCard from "./HeroComponents/SelectPlan";
import SubscribeToggleCard from "./HeroComponents/SubscribeToggle";
import TicketsChartCard from "./HeroComponents/TicketsChart";
import Blur from "./HeroComponents/Blur";
// @ts-ignore
import GridLarge from "../../images/LargeBackgroundGrid.svg";


const HomepageHero = () => {
  return (
    <Background
      backgroundColor="white"
      className="homepage_hero_wrapper"
      display="flex"
      justifyContent="center"
    >
      <Flex
        className="homepage_hero_container"
        marginX="md"
        maxWidth="xl"
        orientation="column"
        paddingTop="xl"
        position="relative"
      >
        <Background
          alignItems="center"
          backgroundColor="white"
          display="flex"
          flexDirection="column"
          paddingTop="xl"
        >
          <WelcomeComponent />
        </Background>

        <Background
          className="homepage_hero_container_cards"
          position="absolute"
        >
          <Image url={GridLarge} position="absolute" className="homepage_hero_container_cards_grid"/>
          <Flex orientation="column">
            <FlexItem
              alignSelf="end"
              className="homepage_hero_container_cards_blur_1"
              position="absolute"
            >
              <Blur
                background="var(--data-3, #9E64E9)"
                borderRadius="570.112px"
                filter="blur(100px)"
                flexShrink="0"
                height="164.619px"
                width="219.661px"
              />
            </FlexItem>
            <FlexItem
              className="homepage_hero_container_cards_blur_2"
              position="absolute"
            >
              <Blur
                background="rgba(0, 130, 255, 0.25)"
                borderRadius="var(--border-radius-none, 402px)"
                filter="blur(100px)"
                flexShrink="0"
                height="301px"
                width="402px"
              />
            </FlexItem>
          </Flex>
          <TicketsChartCard />
          <NotificationsLargeCard />
          <ConnectedDevicesCard />
          <HoverCard />
          <LettuceCheckboxCard />
          <OrderDetailsCard />
          <SelectPlanCard />
          <SubscribeToggleCard />
        </Background>
      </Flex>
    </Background>
  );
};

export default HomepageHero;
