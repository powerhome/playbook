import React from "react";
import { Background, Image } from "playbook-ui";
import type { HomepageHeroCTALinks } from "../ctaLinks";
import WelcomeComponent from "./Welcome";
import {
  ConnectedDevicesCard,
  OrderDetailsCard,
  SelectPlanCard,
  SubscribeToggleCard,
  TicketsChartCard,
  NotificationsSmallCard,
} from "../HeroComponents";
// @ts-ignore
import GridMedium from "images/MediumBackgroundGrid.svg";
import BlurBackground from "./BlurBackground";

type MediumScreenProps = {
  ctaLinks: HomepageHeroCTALinks;
  onNavigate?: (path: string) => void;
};

const MediumScreen = ({ ctaLinks, onNavigate }: MediumScreenProps) => {
  return (
    <>
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
          buttonsAlignment="center"
          displayProps={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          exploreComponentsLink={ctaLinks.exploreComponents}
          fixedSize="963px"
          getStartedLink={ctaLinks.getStarted}
          headerAlign="center"
          onNavigate={onNavigate}
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
        <BlurBackground
          firstBlurClass="blur_3"
          firstBlurHeight="138.544px"
          firstBlurWidth="184.867px"
          secondBlurClass="blur_4"
          secondBlurHeight="359.581px"
          secondBlurWidth="479.808px"
        />
        <TicketsChartCard />
        <ConnectedDevicesCard />
        <NotificationsSmallCard />
        <OrderDetailsCard />
        <SelectPlanCard />
        <SubscribeToggleCard />
      </Background>
    </>
  );
};

export default MediumScreen;
