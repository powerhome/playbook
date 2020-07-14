import React from 'react'
import { Caption, Card, Flex, FlexItem, IconValue, Image, Layout, Nav, NavItem, SectionSeparator, Title } from '../../../../pb_kits/playbook'

const CollectionDetail = () => (
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
            <Image url="https://djenjyj46f9j9.cloudfront.net/items/292f0C2i3f2z2f2A0P0n/Screen%20Shot%202020-07-09%20at%201.23.31%20PM.png?X-CloudApp-Visitor-Id=3399053&v=ed16c3c4" />
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
            >
              <FlexItem paddingX="sm">
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
          <Card.Header categoryColor={2}>
            <Caption
                dark
                text="World"
            />
          </Card.Header>
          <Card.Body padding="none">
            <Image url="https://djenjyj46f9j9.cloudfront.net/items/0n07340O0c3R0V0L1V0P/Screen%20Shot%202020-07-09%20at%201.41.26%20PM.png?X-CloudApp-Visitor-Id=3399053&v=b532b3f0" />
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
            >
              <FlexItem paddingX="sm">
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
          <Card.Header categoryColor={3}>
            <Caption
                dark
                text="Books"
            />
          </Card.Header>
          <Card.Body padding="none">
            <Image url="https://djenjyj46f9j9.cloudfront.net/items/1j2k1g3f2H2W2f1v3225/Screen%20Shot%202020-07-09%20at%201.42.32%20PM.png?X-CloudApp-Visitor-Id=3399053&v=2ab46cb6" />
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
            >
              <FlexItem paddingX="sm">
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
          <Card.Header categoryColor={4}>
            <Caption
                dark
                text="National"
            />
          </Card.Header>
          <Card.Body padding="none">
            <Image url="https://djenjyj46f9j9.cloudfront.net/items/2j0G2k3I0f3W3a2c2q3o/Screen%20Shot%202020-07-09%20at%201.43.40%20PM.png?X-CloudApp-Visitor-Id=3399053&v=d2667a0b" />
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
            >
              <FlexItem paddingX="sm">
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
          <Card.Header categoryColor={5}>
            <Caption
                dark
                text="Books, News, and Features"
            />
          </Card.Header>
          <Card.Body padding="none">
            <Image url="https://djenjyj46f9j9.cloudfront.net/items/0m353s3A3I3B0w3N3W2U/Screen%20Shot%202020-07-09%20at%201.44.30%20PM.png?X-CloudApp-Visitor-Id=3399053&v=5b24787c" />
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
            >
              <FlexItem paddingX="sm">
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
          <Card.Header categoryColor={6}>
            <Caption
                dark
                text="Science"
            />
          </Card.Header>
          <Card.Body padding="none">
            <Image url="https://djenjyj46f9j9.cloudfront.net/items/0n1b1V1F4614343t3547/Screen%20Shot%202020-07-09%20at%201.45.26%20PM.png?X-CloudApp-Visitor-Id=3399053&v=a3cc4d20" />
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
            >
              <FlexItem paddingX="sm">
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
export default CollectionDetail
