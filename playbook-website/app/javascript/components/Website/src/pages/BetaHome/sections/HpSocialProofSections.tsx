import React from "react"
import {
  Background,
  Body,
  Button,
  Caption,
  Flex,
  FlexItem,
  IconStatValue,
  Title,
} from "playbook-ui"

import hpSocialProofBg from "images/hp-social-proof-background.png"

const EXPLORE = "Explore All Components"

const STATS = [
  {
    icon: "puzzle" as const,
    text: "components",
    value: "200＋",
  },
  {
    icon: "chart-line-up" as const,
    text: "downloads",
    value: "1M＋",
  },
  {
    icon: "arrows-repeat" as const,
    text: "Release Updates",
    value: "Weekly",
  },
]

/** Match Rails: only one variant visible per viewport (all breakpoints must be set or `none` leaks through). */
function LgSocialProof() {
  return (
    <Background
        backgroundColor="white"
        display={{ lg: "flex", md: "none", sm: "none", xl: "flex", xs: "none" }}
        justifyContent="center"
        paddingBottom="xl"
        paddingTop="xl"
    >
      <Flex
          className="width-full"
          justify="center"
          marginX="md"
          maxWidth="xl"
          wrap
      >
        <Background
            backgroundColor="dark"
            borderRadius="lg"
            className="width-full"
        >
          <Background
              alt="background"
              backgroundColor="dark"
              backgroundPosition="center right"
              backgroundRepeat="no-repeat"
              backgroundSize="auto"
              borderRadius="lg"
              imageUrl={hpSocialProofBg}
              padding="xl"
              transition="fade"
          >
            <Flex
                justify="center"
                spacing="between"
                vertical="center"
                wrap
            >
              <FlexItem alignSelf="center">
                <Flex orientation="column">
                  <FlexItem>
                    <Body color="link"
                        dark
                        text="BY THE NUMBERS"
                    />
                  </FlexItem>
                  <FlexItem paddingTop="xxs">
                    <Title dark
                        size={2}
                        tag="h2"
                        text="Don't take our word for it."
                    />
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem alignSelf="center">
                <Button
                    dark
                    icon="chevron-right"
                    iconRight
                    link="/beta/kits"
                    padding="none"
                    text={EXPLORE}
                    variant="link"
                />
              </FlexItem>
            </Flex>
            <Flex
                gap="xl"
                justify="center"
                paddingTop="xl"
                rowGap="xl"
                wrap
            >
              {STATS.map((s) => (
                <FlexItem key={s.text}>
                  <IconStatValue
                      dark
                      icon={s.icon}
                      size="lg"
                      text={s.text}
                      value={s.value}
                      variant="orange"
                  />
                </FlexItem>
              ))}
            </Flex>
          </Background>
        </Background>
      </Flex>
    </Background>
  )
}

function MdSocialProof() {
  return (
    <Background
        backgroundColor="white"
        display={{ lg: "none", md: "flex", sm: "flex", xl: "none", xs: "none" }}
        justifyContent="center"
        paddingBottom="xl"
        paddingTop="xl"
    >
      <Flex
          className="width-full"
          justify="center"
          maxWidth="xl"
          paddingLeft="md"
          paddingRight="md"
          wrap
      >
        <Background
            backgroundColor="dark"
            borderRadius="lg"
            className="width-full"
        >
          <Background
              alt="background"
              backgroundColor="dark"
              backgroundPosition="center right"
              backgroundRepeat="no-repeat"
              backgroundSize="auto"
              borderRadius="lg"
              imageUrl={hpSocialProofBg}
              paddingBottom="xl"
              paddingLeft="lg"
              paddingRight="lg"
              paddingTop="lg"
              transition="fade"
          >
            <Flex align="center"
                orientation="column"
            >
              <FlexItem>
                <Title dark
                    size={2}
                    tag="h2"
                    text="Don't take our word for it."
                />
              </FlexItem>
              <FlexItem>
                <Button
                    dark
                    icon="chevron-right"
                    iconRight
                    link="/beta/kits"
                    text={EXPLORE}
                    variant="link"
                />
              </FlexItem>
            </Flex>
            <Flex
                gap="md"
                horizontal="center"
                justify="center"
                paddingTop="xl"
                spacing="between"
                wrap
            >
              {STATS.map((s) => (
                <FlexItem key={s.text}>
                  <IconStatValue
                      dark
                      icon={s.icon}
                      size="sm"
                      text={s.text}
                      value={s.value}
                      variant="orange"
                  />
                </FlexItem>
              ))}
            </Flex>
          </Background>
        </Background>
      </Flex>
    </Background>
  )
}

function SmSocialProof() {
  return (
    <Background
        backgroundColor="white"
        display={{ lg: "none", md: "none", sm: "none", xl: "none", xs: "flex" }}
        justifyContent="center"
    >
      <Flex
          className="width-full"
          horizontal="center"
          maxWidth="xl"
          wrap
      >
        <Background backgroundColor="dark"
            className="width-full"
        >
          <Flex align="center"
              justify="center"
              orientation="column"
              paddingTop="md"
          >
            <FlexItem>
              <Body color="link"
                  dark
                  text="BY THE NUMBERS"
              />
            </FlexItem>
          </Flex>
          <Flex
              gap="md"
              horizontal="center"
              justify="center"
              paddingBottom="xl"
              paddingLeft="sm"
              paddingRight="sm"
              paddingTop="md"
              spacing="between"
              wrap
          >
            <FlexItem>
              <Flex orientation="column">
                <Title dark
                    size={3}
                    tag="h3"
                    text="200＋"
                />
                <Caption dark
                    text="components"
                />
              </Flex>
            </FlexItem>
            <FlexItem>
              <Flex orientation="column">
                <Title dark
                    size={3}
                    tag="h3"
                    text="1M＋"
                />
                <Caption dark
                    text="downloads"
                />
              </Flex>
            </FlexItem>
            <FlexItem>
              <Flex orientation="column">
                <Title dark
                    size={3}
                    tag="h3"
                    text="Weekly"
                />
                <Caption dark
                    text="release updates"
                />
              </Flex>
            </FlexItem>
          </Flex>
        </Background>
      </Flex>
    </Background>
  )
}

/**
 * “By the numbers” social proof — three responsive layouts matching
 * `LgHpSocialProofComponent`, `MdHpSocialProofComponent`, `SmHpSocialProofComponent`.
 */
export default function HpSocialProofSections() {
  return (
    <>
      <LgSocialProof />
      <MdSocialProof />
      <SmSocialProof />
    </>
  )
}
