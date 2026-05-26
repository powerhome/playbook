import { Link } from "react-router-dom"
import {
  Background,
  Body,
  Button,
  Caption,
  Card,
  Flex,
  FlexItem,
  Title,
} from "playbook-ui"

export type LandingPost = {
  date: string | null
  description: string | null
  image: string
  link: string
  title: string
}

type RowProps = {
  index: number
  post: LandingPost
}

function PreviewCardRow({ index, post }: RowProps) {
  const href = `/changelog/web#${post.link}`

  return (
    <Flex
      align="baseline"
      justify="center"
      paddingBottom={index === 1 ? "lg" : undefined}
      paddingTop="md"
    >
      <Card
        borderRadius="lg"
        hover={{ shadow: "deepest" }}
        marginX="md"
        maxWidth="xl"
        padding="none"
      >
        <Link style={{ color: "inherit", textDecoration: "none" }}
            to={href}
        >
          <Flex
            alignItems="stretch"
            flexDirection={{ xs: "column" }}
            gap="sm"
            padding="sm"
          >
            <FlexItem display="flex" fixedSize="200px">
              <Background
                backgroundColor="neutral"
                backgroundPosition="top"
                borderRadius="md"
                flexGrow={1}
                imageUrl={post.image}
              />
            </FlexItem>
            <FlexItem flexGrow={1}>
              <Flex flexDirection="column">
                <Caption paddingTop={{ xs: "xs" }} text={post.date || ""} />
                <Flex paddingBottom="sm">
                  <Title
                    paddingTop="xs"
                    size={4}
                    tag="h4"
                    text={post.title}
                    truncate="1"
                  />
                </Flex>
                <Body
                  color="light"
                  text={post.description || ""}
                  truncate="2"
                />
              </Flex>
            </FlexItem>
            <Flex
              align="center"
              display={{ md: "none", sm: "none", xs: "none" }}
            >
              <Button icon="chevron-right" iconRight text="Read More" />
            </Flex>
          </Flex>
        </Link>
      </Card>
    </Flex>
  )
}

type Props = {
  posts: LandingPost[]
}

/**
 * Changelog / “Newest from Playbook” cards — ported from `home.html.erb` preview cards.
 */
export default function NewestFromPlaybookSection({ posts }: Props) {
  if (!posts?.length) return null

  return (
    <Background backgroundColor="white">
      <Flex align="center" orientation="column" paddingTop="lg">
        <Title
          color="link"
          paddingBottom="sm"
          size={4}
          text="NEWEST FROM PLAYBOOK"
        />
        <Title
          paddingBottom="xs"
          size={2}
          tag="h2"
          text="Playbook is always shipping."
          textAlign="center"
        />
        <Caption
          paddingBottom="sm"
          size="lg"
          text="Move Fast. Follow Momentum."
        />
      </Flex>
      {posts.map((post, index) => (
        <PreviewCardRow index={index} key={post.link} post={post} />
      ))}
    </Background>
  )
}
