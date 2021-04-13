import React from 'react'
import { Caption, Card, Flex, FlexItem, IconValue, Image, Layout, Nav, NavItem, SectionSeparator, Title } from 'playbook-ui'

const NewsMagazine = () => {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[class*="pb_image_kit"]').forEach((element) => {
      element.style.width = '100%'
      element.style.height = '200px'
    })
  })

  return (
    <div>
      <Layout
          layout="collection_detail"
          padding="lg"
      >
        <Card padding="none">
          <Caption
              padding="md"
              size="lg"
              text="News Stories"
          />
          <SectionSeparator />
          {
            <Nav
                link="#"
                marginTop="sm"
                orientation="vertical"
            >
              <NavItem
                  link="#"
                  text="All News"
              />
              <NavItem
                  link="#"
                  text="Top Stories"
              />
              <NavItem
                  active
                  link="#"
                  text="National"
              />
              <Nav variant="subtle">
                <NavItem
                    active
                    link="#"
                    text="All"
                />
                <NavItem
                    link="#"
                    text="Planet Money"
                />
                <NavItem
                    link="#"
                    text="Books"
                />
                <NavItem
                    link="#"
                    text="Books, News, and Features"
                />
                <NavItem
                    link="#"
                    text="Science"
                />
                <NavItem
                    link="#"
                    text="Politics"
                />
                <NavItem
                    link="#"
                    text="National Security"
                />
                <NavItem
                    link="#"
                    text="Environment"
                />
                <NavItem
                    link="#"
                    text="Shots - Health News"
                />
                <NavItem
                    link="#"
                    text="Analysis"
                />
              </Nav>
              <NavItem
                  link="#"
                  text="Files"
              />
            </Nav>
          }
        </Card>

        <Layout.Body>
          {/* START PLANET MONEY */}
          <Card padding="none">
            <Card.Header>
              <Caption
                  dark
                  text="Planet Money"
              />
            </Card.Header>
            <Card.Body padding="none">
              <Image url="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80" />
              <Title
                  paddingLeft="sm"
                  paddingTop="sm"
                  size={4}
                  tag="h4"
                  text="Where’d the Money Go, and Other Questions"
              />
              <SectionSeparator paddingY="sm" />
              <Flex
                  orientation="row"
                  paddingBottom="sm"
                  paddingX="sm"
                  wrap
              >
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="share-alt"
                      text="391"
                    /> }
                </FlexItem>
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="eye"
                      text="2,039"
                    /> }
                </FlexItem>
                <FlexItem>
                  { <IconValue
                      icon="comments"
                      text="89"
                    /> }
                </FlexItem>
              </Flex>
            </Card.Body>
          </Card>
          {/* END PLANET MONEY */}
          {/* START WORLD CARD */}
          <Card padding="none">
            <Card.Header headerColor="category_2">
              <Caption
                  dark
                  text="World"
              />
            </Card.Header>
            <Card.Body padding="none">
              <Image url="https://images.unsplash.com/photo-1500202352583-7b2fc394ed15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
              <Title
                  paddingLeft="sm"
                  paddingTop="sm"
                  size={4}
                  tag="h4"
                  text="U.K. Willing To Admit 3 Million If China Adopts Security Law"
              />
              <SectionSeparator paddingY="sm" />
              <Flex
                  orientation="row"
                  paddingBottom="sm"
                  paddingX="sm"
                  wrap
              >
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="share-alt"
                      text="304"
                    /> }
                </FlexItem>
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="eye"
                      text="5,032"
                    /> }
                </FlexItem>
                <FlexItem>
                  { <IconValue
                      icon="comments"
                      text="102"
                    /> }
                </FlexItem>
              </Flex>
            </Card.Body>
          </Card>
          {/* END WORLD CARD */}
          {/* START BOOKS CARD */}
          <Card padding="none">
            <Card.Header headerColor="category_3">
              <Caption
                  dark
                  text="Books"
              />
            </Card.Header>
            <Card.Body padding="none">
              <Image url="https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
              <Title
                  paddingLeft="sm"
                  paddingTop="sm"
                  size={4}
                  tag="h4"
                  text="Opinion: Harry Potter's Magic Fades When His Creator Tweets"
              />
              <SectionSeparator paddingY="sm" />
              <Flex
                  orientation="row"
                  paddingBottom="sm"
                  paddingX="sm"
                  wrap
              >
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="share-alt"
                      text="201"
                    /> }
                </FlexItem>
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="eye"
                      text="890"
                    /> }
                </FlexItem>
                <FlexItem>
                  { <IconValue
                      icon="comments"
                      text="2"
                    /> }
                </FlexItem>
              </Flex>
            </Card.Body>
          </Card>
          {/* END BOOKS CARD */}
          {/* START NATIONAL CARD */}
          <Card padding="none">
            <Card.Header headerColor="category_4">
              <Caption
                  dark
                  text="National"
              />
            </Card.Header>
            <Card.Body padding="none">
              <Image url="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80" />
              <Title
                  paddingTop="sm"
                  paddingX="sm"
                  size={4}
                  tag="h4"
                  text="1st U.S. Woman To Walk In Space Dives To Deepest Point In Ocean"
              />
              <SectionSeparator paddingY="sm" />
              <Flex
                  orientation="row"
                  paddingBottom="sm"
                  paddingX="sm"
                  wrap
              >
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="share-alt"
                      text="245"
                    /> }
                </FlexItem>
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="eye"
                      text="10,302"
                    /> }
                </FlexItem>
                <FlexItem>
                  { <IconValue
                      icon="comments"
                      text="89"
                    /> }
                </FlexItem>
              </Flex>
            </Card.Body>
          </Card>
          {/* END NATIONAL CARD */}
          {/* START BOOKS, NEWS, AND FEATURES CARD */}
          <Card padding="none">
            <Card.Header headerColor="category_5">
              <Caption
                  dark
                  text="Books, News, and Features"
              />
            </Card.Header>
            <Card.Body padding="none">
              <Image url="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
              <Title
                  paddingLeft="sm"
                  paddingTop="sm"
                  size={4}
                  tag="h4"
                  text="Publishers Sue Internet Archive For Mass Copyright Infringement"
              />
              <SectionSeparator paddingY="sm" />
              <Flex
                  orientation="row"
                  paddingBottom="sm"
                  paddingX="sm"
                  wrap
              >
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="share-alt"
                      text="84"
                    /> }
                </FlexItem>
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="eye"
                      text="5,592"
                    /> }
                </FlexItem>
                <FlexItem>
                  { <IconValue
                      icon="comments"
                      text="104"
                    /> }
                </FlexItem>
              </Flex>
            </Card.Body>
          </Card>
          {/* END BOOKS, NEWS, AND FEATURES CARD */}
          {/* START SCIENCE CARD */}
          <Card padding="none">
            <Card.Header headerColor="category_6">
              <Caption
                  dark
                  text="Science"
              />
            </Card.Header>
            <Card.Body padding="none">
              <Image url="https://images.unsplash.com/photo-1558677949-260173506bbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" />
              <Title
                  paddingLeft="sm"
                  paddingTop="sm"
                  size={4}
                  tag="h4"
                  text="New Book Argues Migration Isn’t A Crisis — It’s The Solution"
              />
              <SectionSeparator paddingY="sm" />
              <Flex
                  orientation="row"
                  paddingBottom="sm"
                  paddingX="sm"
                  wrap
              >
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="share-alt"
                      text="54"
                    /> }
                </FlexItem>
                <FlexItem paddingRight="sm">
                  { <IconValue
                      icon="eye"
                      text="3,982"
                    /> }
                </FlexItem>
                <FlexItem>
                  { <IconValue
                      icon="comments"
                      text="12"
                    /> }
                </FlexItem>
              </Flex>
            </Card.Body>
          </Card>
          {/* END SCIENCE CARD */}

        </Layout.Body>

      </Layout>
    </div>
  )
}

export default NewsMagazine
