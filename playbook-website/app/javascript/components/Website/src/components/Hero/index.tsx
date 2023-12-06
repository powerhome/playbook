import React from "react";
import { Background, Title, Body } from "playbook-ui";

import HeaderMobile from "../../../../../images/pb_generic_header.jpg";
import HeaderDesktop from "../../../../../images/pb_generic_header_desktop.jpg";

import "./styles.scss";

type HeroProps = {
  title: string;
  description: string;
};

export function Hero({ title, description }: HeroProps) {
  return (
    <Background
      alt="background with blue colors fading to darker blue"
      className="hero"
      marginBottom="lg"
      marginTop={{ md: "none", lg: "none", xl: "none" }}
      padding={{ md: "xl", default: "xl" }}
      paddingTop={{ xs: "lg" }}
      paddingBottom={{ xs: "sm" }}
      backgroundSize={{
        default: "1105px 243px",
        xs: "80%",
        sm: "80%",
        md: "1105px 243px",
      }}
      backgroundPosition={{
        default: "right bottom",
        xs: "center top",
        sm: "center top",
        md: "right bottom",
      }}
      backgroundColor="dark"
      backgroundRepeat="no-repeat"
      imageUrl={{
        default: HeaderDesktop,
        xs: HeaderMobile,
        sm: HeaderMobile,
        md: HeaderDesktop,
      }}
    >
      <Title
        size={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}
        paddingTop={{ xs: "none", sm: "xl", md: "none" }}
        paddingBottom={{ xs: "none", default: "sm" }}
        text={title}
        marginBottom={{ xs: "none", md: "xs" }}
        dark
      />
      <Body
        className="hero-description"
        maxWidth="sm"
        lineHeight="loose"
        paddingBottom="xl"
        dark
        text={description}
      />
    </Background>
  );
}
