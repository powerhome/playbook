import {
  Background,
  Layout,
  Card,
  Icon,
  Flex,
  Title,
  Body,
  Link,
  IconCircle,
} from "playbook-ui";
import HeaderImage from "../../images/getting-started.svg";
import { TokenCards } from "./Data/TokenCards";

const Tokens = () => {
  return (
    <Background
      flexDirection="column"
      backgroundColor="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Background
        imageUrl={HeaderImage}
        width="100%"
        display={{ xs: "none", sm: "none", md: "none" }}
        height="250px"
        backgroundColor="dark"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />
      <Background
        paddingX={{ xs: "sm", sm: "sm", md:"sm", lg: "sm", default:"none" }}
        paddingY="md"
        backgroundColor="white"
        maxWidth="lg"
      >
        <Title size={1} text="Tokens" marginBottom="sm" />
        <Body text="Tokens are reusable values that define core design elements like colors, typography, and spacing. They provide consistency across components and Global Props, ensuring scalable and cohesive design throughout the application." />
        <Layout layout="collection" marginY="xl" paddingBottom="xl">
          <Layout.Body>
            {TokenCards.sort((a, b) => a.title.localeCompare(b.title)).map(({ title, description, link, icon }) => {
              return (
                <Link key={title} href={link}>
                  <Card padding="none" hover={{ shadow: "deep" }} flex={1}>
                    <Background backgroundColor="light">
                      <Flex justify="center" padding="xl">
                        <IconCircle icon={icon} variant="royal" />
                      </Flex>
                    </Background>

                    <Flex justify="between" align="center" padding="sm">
                      <Title size={4} color="link" text={title} />
                      <Title size={4} color="link">
                        <Icon icon="arrow-right-long" />
                      </Title>
                    </Flex>

                    <Body
                      text={description}
                      truncate="3"
                      color="light"
                      marginX="sm"
                      marginBottom="sm"
                    />
                  </Card>
                </Link>
              );
            })}
          </Layout.Body>
        </Layout>
      </Background>
    </Background>
  );
};

export default Tokens;
