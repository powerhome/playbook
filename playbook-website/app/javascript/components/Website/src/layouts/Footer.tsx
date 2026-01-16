import {
  Flex,
  FlexItem,
  Title,
  Body,
  Button,
  SectionSeparator,
  Caption,
} from "playbook-ui"

const Footer = () => {
  return (
    <div className='pb--page--footer'>
      <div className='inner-footer-wrapper'>
        <Flex align='center' orientation='column' marginX='xl'>
          <FlexItem maxWidth='md'>
            <Flex justify='center'>
              <Title
                dark
                text='Contribute to Playbook'
                tag='h1'
                size={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 2 }}
                paddingBottom='md'
                textAlign='center'
              />
            </Flex>
            <Body
              dark
              padding='lg'
              color='light'
              textAlign='center'
              display={{ xs: "none" }}
            >
              When you start designing a new feature, you may come across a
              Design Token or Component that isn’t defined in Playbook. If so,
              you should
              <a
                href='https://github.com/powerhome/playbook/issues'
                target='_blank'
              >
                <Body
                  tag='span'
                  text='open an issue'
                  dark
                  color='link'
                  textHover
                />
              </a>
              or reach out to the team to make a contribution.
            </Body>
            <Flex justify='center'>
              <Button
                iconFontFamily='fab'
                icon='github'
                text='Contribute on GitHub'
                link='https://github.com/powerhome/playbook'
                marginBottom='lg'
              />
            </Flex>
          </FlexItem>
        </Flex>
        <FlexItem alignSelf='stretch'>
          <SectionSeparator paddingY='lg' dark />{" "}
        </FlexItem>
        <Flex justify='center' margin='lg'>
          <Flex
            marginX={{ xs: "xl" }}
            className='link-container'
            justify='between'
            maxWidth='xl'
            flexDirection={{ xs: "row" }}
          >
            <Flex maxWidth='sm' paddingTop='xl' display={{ xs: "none" }}>
              <FlexItem alignSelf='center'>
                <Body
                  dark
                  text='As the highest-rated residential remodeler in the nation, our international technology team builds a custom suite of products that continuously transform our business.'
                  color='light'
                  paddingLeft='lg'
                  display={{ md: "none", sm: "none", xs: "none" }}
                />
              </FlexItem>
            </Flex>
            <FlexItem>
              <Title dark tag='h4' text='Power' size={4} marginBottom='md' />
              <a href='https://www.techatpower.com/'>
                <Body
                  text='Tech @ Power'
                  dark
                  color='light'
                  marginBottom='md'
                  hover={{ color: "text_dk_default" }}
                />
              </a>
              <a href='https://www.techatpower.com/jobs'>
                <Body
                  text='Open Positions'
                  dark
                  color='light'
                  marginBottom='md'
                  hover={{ color: "text_dk_default" }}
                />
              </a>
              <a href='https://powerhrg.com/'>
                <Body
                  text='About Power'
                  dark
                  color='light'
                  marginBottom='md'
                  hover={{ color: "text_dk_default" }}
                />
              </a>
            </FlexItem>
            <FlexItem>
              <Title dark tag='h4' text='Connect' size={4} marginBottom='md' />
              <a href='https://github.com/powerhome/playbook'>
                <Body
                  text='Github'
                  dark
                  color='light'
                  marginBottom='md'
                  hover={{ color: "text_dk_default" }}
                />
              </a>
              <a href='https://nitro.powerhrg.com/connect#rooms/23514'>
                <Body
                  text='Connect Chat'
                  dark
                  color='light'
                  marginBottom='md'
                  hover={{ color: "text_dk_default" }}
                />
              </a>
            </FlexItem>
          </Flex>
        </Flex>
        <div className='copyright-tag'>
          <Caption text={`© ${new Date().getFullYear()}-${(new Date().getFullYear() + 1).toString().slice(-2)}, ALL RIGHTS RESERVED`} color='lighter' dark />
        </div>
      </div>
    </div>
  )
}

export default Footer
