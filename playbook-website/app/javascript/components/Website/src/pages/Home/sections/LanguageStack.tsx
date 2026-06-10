import React from "react"
import { Link } from "react-router-dom"
import { Caption, Card, Flex, FlexItem, Image } from "playbook-ui"

export default function LanguageStack({
  caption,
  href,
  img,
  label,
}: {
  caption: string
  href: string
  img: string
  label: string
}) {
  return (
    <Flex className="language-card"
        orientation="column"
        rowGap="sm"
    >
      <FlexItem alignSelf="stretch">
        <Link style={{ textDecoration: "none" }}
            to={href}
        >
          <Card
              borderRadius="lg"
              className="language-card"
              cursor="pointer"
              hover={{ scale: "sm" }}
              padding="xl"
              shadow="deeper"
          >
            <Image alt={`${label} logo`}
                url={img}
            />
          </Card>
        </Link>
      </FlexItem>
      <FlexItem
          className="language-card-text"
          display={{ sm: "none", md: "none", lg: "none", xl: "flex" }}
      >
        <Caption paddingX="xxs"
            size="xs"
            text={caption}
        />
      </FlexItem>
    </Flex>
  )
}
