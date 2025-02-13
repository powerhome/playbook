import {
  Icon,
  SectionSeparator,
  Button,
  Flex,
  FlexItem,
  Image
} from 'playbook-ui';
import playgroundLogo from '../../images/playground-logo.svg'

const PlaygroundHeader = () => {
  return (
    <>
      <Flex orientation="row" justify="between" marginTop="xs">
        <Flex orientation="row" vertical="stretch">
          <Button
            link="https://playbook.powerapp.cloud/"
            variant="link"
            padding="none"
            marginRight="sm"
            marginLeft="sm"
          >
            <Icon color="primary" fixedWidth icon="chevron-left" size="2x" />
          </Button>

          <SectionSeparator orientation="vertical" inline="flex-container" marginX="none" />

          <Image
            marginLeft="md"
            marginBottom="none"
            url={playgroundLogo}
            alignSelf="center"
          />
        </Flex>

        <FlexItem justify="end">
          <Button disabled marginBottom="xs" marginRight="lg" text="Share" />
        </FlexItem>
      </Flex>

      <SectionSeparator />
    </>
  )
}

export default PlaygroundHeader
