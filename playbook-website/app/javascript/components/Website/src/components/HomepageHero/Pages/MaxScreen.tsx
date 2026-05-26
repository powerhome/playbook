import React from "react";
import { Background, Image } from "playbook-ui";
import type { HomepageHeroCTALinks } from "../ctaLinks";
import WelcomeComponent from "./Welcome";
import {
  ConnectedDevicesCard,
  HoverCard,
  LettuceCheckboxCard,
  NotificationsLargeCard,
  OrderDetailsCard,
  SelectPlanCard,
  SubscribeToggleCard,
  TicketsChartCard,
} from "../HeroComponents";
// @ts-ignore
import GridLarge from "images/LargeBackgroundGrid.svg";
import BlurBackground from "./BlurBackground";

type MaxScreenProps = {
  ctaLinks: HomepageHeroCTALinks;
  onNavigate?: (path: string) => void;
};

const MaxScreen = ({ ctaLinks, onNavigate }: MaxScreenProps) => {
  return (
    <>
      <Background
        alignItems="center"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        paddingTop="xl"
      >
        <WelcomeComponent
          exploreComponentsLink={ctaLinks.exploreComponents}
          fixedSize="546px"
          getStartedLink={ctaLinks.getStarted}
          onNavigate={onNavigate}
        />
      </Background>

      <Background className="homepage_hero_container_cards" position="absolute">
        <Image
          url={GridLarge}
          position="absolute"
          className="homepage_hero_container_cards_grid"
        />

        <BlurBackground
          firstBlurClass="blur_1"
          firstBlurHeight="164.619px"
          firstBlurWidth="219.661px"
          secondBlurClass="blur_2"
          secondBlurHeight="301px"
          secondBlurWidth="402px"
        />
        <TicketsChartCard />
        <NotificationsLargeCard />
        <ConnectedDevicesCard />
        <HoverCard />
        <LettuceCheckboxCard />
        <OrderDetailsCard />
        <SelectPlanCard />
        <SubscribeToggleCard />
      </Background>
    </>
  );
};

export default MaxScreen;
