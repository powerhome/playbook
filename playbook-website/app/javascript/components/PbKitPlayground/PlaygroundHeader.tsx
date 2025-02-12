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
  const handleBackNavigation = (event) => {
    event.preventDefault()
    window.location.href = "https://playbook.powerapp.cloud/"
  };

  return (
    <>
      <Flex orientation="row" justify="between" marginTop="xs">
        <Flex orientation="row" vertical="stretch">
          <button
            onClick={handleBackNavigation}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Go Back"
          >
            <Icon color="primary" fixedWidth icon="chevron-left" marginLeft="sm" size="2x" />
          </button>

          <SectionSeparator orientation="vertical" inline="flex-container" />

          <Image marginLeft="xs" marginBottom="none" url={playgroundLogo} />
        </Flex>

        <FlexItem justify="end">
          <Button marginBottom="xs" marginRight="lg" text="Share" />
        </FlexItem>
      </Flex>

      <SectionSeparator />
    </>
  )
}

export default PlaygroundHeader
