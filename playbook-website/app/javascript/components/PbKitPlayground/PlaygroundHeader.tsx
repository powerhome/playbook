import { Icon, SectionSeparator, Button, Flex, FlexItem, Image} from 'playbook-ui'
import playgroundLogo from '../../images/playground-logo.svg';

const PlaygroundHeader = () => {
  const handleBackNavigation = (event) => {
    event.preventDefault()
    // if (window.history.length > 1) {
    //   window.history.back();
    // } else {
      window.location.href = "https://playbook.powerapp.cloud/";
    // }
  }

  return (
    <>
      <Flex orientation="row" justify="between" marginTop='sm' marginBottom='sm'>

        <Flex orientation="row" vertical="stretch">
        <FlexItem marginLeft='sm'>
            <button
              onClick={handleBackNavigation}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Go Back"
            >
              <Icon color="primary" fixedWidth icon="chevron-left" size="2x"  marginTop='xxs'/>
            </button>
          <Image
              marginLeft='sm'
              position="absolute"
              url={playgroundLogo}
          />
            <SectionSeparator
              orientation="vertical"
              color='primary'
            />

         </FlexItem>

    </Flex>
        <FlexItem justify="end">
          <Button marginRight='sm' text="Share"/>
        </FlexItem>
    </Flex>

      <SectionSeparator />
    </>
  );
}

export default PlaygroundHeader;
