import React from 'react'
import { Background, Body, Button, Card, Flex, FlexItem, Icon, IconValue, Legend, MultipleUsers, Nav, SectionSeparator, Title } from '../../../../pb_kits/playbook'
import NavItem from '../../../../pb_kits/playbook/pb_nav/_item.jsx'

const TrendingRepositories = () => {

  window.addEventListener('DOMContentLoaded', (event) => {
    let mobile_view = document.querySelector(".nav-bar-header-mobile")
    let desktop_view = document.querySelector(".nav-bar-header-desktop")
    let card_body = document.querySelector(".card_body_marg")
    const view_size = () => {
      if (window.innerWidth < 415){
          mobile_view.style.display = "block"
          desktop_view.style.display = "none"
          card_body.style.cssText = "margin:8px!important;"
          } else {
          mobile_view.style.display = "none"
          desktop_view.style.display = "block"
          card_body.style.cssText = "margin:40px!important;"
      }
    }
    view_size()

  window.addEventListener("resize", () => {
    view_size()
  })
  })

  return (

    <div>

      <div style={{display: "none"}} className="nav-bar-header-desktop">
        <Background
            backgroundColor="white"
            paddingBottom="none"
            paddingTop="md"
        >
          <Flex
              paddingLeft="xl"
              paddingRight="md"
              spacing="between"
          >
            <FlexItem>
              <Nav
                  link="#"
                  orientation="horizontal"
                  marginLeft="sm"
              >
                <NavItem
                    link="#"
                    text="Explore"
                />
                <NavItem
                    link="#"
                    text="Topics"
                />
                <NavItem
                    active
                    link="#"
                    text="Trending"
                />
                <NavItem
                    link="#"
                    text="Collections"
                />
                <NavItem
                    link="#"
                    text="Events"
                />
                <NavItem
                    link="#"
                    text="Sponsors"
                />
              </Nav>
            </FlexItem>
            <FlexItem>
              <Button
                  onClick={() => alert('button clicked!')}
                  text="Get email updates"
                  marginRight="lg"
              />
            </FlexItem>
          </Flex>
        </Background>
        <SectionSeparator />
      </div>
      <div style={{display: "none"}} className="nav-bar-header-mobile">
        <Background
            backgroundColor="white"
            paddingBottom="none"
            paddingTop="md"
        >
          <Flex
              paddingLeft="lg"
              paddingRight="md"
              spacing="between"
          >
            <FlexItem>
              <Nav
                  link="#"
                  orientation="horizontal"
                  marginLeft="none"
              >
                <NavItem
                    link="#"
                    text="Explore"
                />
                <NavItem
                    active
                    link="#"
                    text="Trending"
                />
              </Nav>
            </FlexItem>
          </Flex>
        </Background>
        <SectionSeparator />
      </div>

      <div className="trending-section">
        <Flex
            orientation="column"
            padding="xl"
            vertical="center"
        >
          <FlexItem>
            <Title
                size={1}
                tag="h1"
                text="Trending"
            />
          </FlexItem>
          <FlexItem>
            <Body
                color="light"
                text="See what the kodemonkey community is most excited about today."
            />
          </FlexItem>
        </Flex>
        <SectionSeparator />

      </div>

      <div className="cards-body">
        <Background
            backgroundColor="white"
            padding="sm"
        >
          <Card
              margin="xl"
              padding="none"
              className="card_body_marg"
          >
            <Background
                backgroundColor="light"
            >

              <Flex
                  spacing="between"
                  wrap={true}
              >
                <FlexItem>
                  <Nav
                      link="#"
                      orientation="horizontal"
                  >
                    <NavItem
                        active
                        link="#"
                        text="Repositories"
                    />
                    <NavItem
                        link="#"
                        text="Developers"
                    />
                  </Nav>
                </FlexItem>

                <div className="p_sm">
                  <FlexItem>
                    <Flex
                        horizontal="right"
                        spacing="evenly"
                        wrap={true}
                    >
                      <FlexItem
                          paddingRight="lg"
                      >
                        {'Spoken Language: '}
                        <Title
                            size={4}
                            tag="span"
                            text="Any "
                        />
                        <span>&#9662;</span>
                      </FlexItem>
                      <FlexItem
                          paddingRight="lg"
                      >
                        {'Language: '}
                        <Title
                            size={4}
                            tag="span"
                            text="Any "
                        />
                        <span>&#9662;</span>
                      </FlexItem>
                      <FlexItem
                          padding="none"
                      >
                        {'Date Range: '}
                        <Title
                            size={4}
                            tag="span"
                            text="Today "
                        />
                        <span>&#9662;</span>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </div>
              </Flex>
            </Background>
            <SectionSeparator />
            <div className="p_sm">
              <Flex
                  orientation="column"
                  vertical="stretch"
              >
                <Flex
                    spacing="between"
                >
                  <FlexItem>
                    <h3>
                      <Icon
                          fixedWidth
                          icon="book"
                          paddingRight="xs"
                      />
                      <a>{'themsaid / ibis'}</a>
                    </h3>
                  </FlexItem>
                  <FlexItem>
                    <Button
                        icon="star"
                        text="Star"
                        variant="secondary"
                    />
                  </FlexItem>
                </Flex>
                <FlexItem
                    paddingBottom="xs"
                >
                  {'A PHP tool that helps you write eBooks in markdown and convert to PDF.'}
                </FlexItem>

                <Flex
                    spacing="between"
                >
                  <FlexItem>
                    <FlexItem>
                      <Flex
                          wrap={true}
                      >
                        <FlexItem>
                          <Legend
                              color="data_1"
                              paddingRight="xs"
                              text="HTML"
                          />
                        </FlexItem>
                        <FlexItem>
                          <IconValue
                              icon="star"
                              paddingRight="sm"
                              text="2,278"
                          />
                        </FlexItem>
                        <FlexItem>
                          <IconValue
                              icon="bezier-curve"
                              paddingRight="sm"
                              text="1,366"
                          />
                        </FlexItem>
                        <FlexItem>
                          <Flex>
                            <FlexItem>
                              <Body
                                  color="light"
                                  paddingRight="sm"
                                  text="Built by"
                              />
                            </FlexItem>
                            <FlexItem>
                              <MultipleUsers
                                  users={[
                              {
                                name: 'Patrick Welch',
                                imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
                              },
                              {
                                name: 'Lucille Sanchez',
                                imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
                              },
                              {
                                name: 'Beverly Reyes',
                                imageUrl: 'https://randomuser.me/api/portraits/women/74.jpg',
                              },
                              {
                                name: 'Keith Craig',
                                imageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
                              },
                              {
                                name: 'Alicia Cooper',
                                imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg',
                              },
                            ]}
                              />
                            </FlexItem>
                          </Flex>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                        icon="star"
                        text="402 stars today"
                    />
                  </FlexItem>
                </Flex>
              </Flex>
            </div>
            <SectionSeparator />
            <div className="p_sm">
              <Flex
                  orientation="column"
                  vertical="stretch"
              >
                <Flex
                    spacing="between"
                >
                  <FlexItem>
                    <h3>
                      <Icon
                          fixedWidth
                          icon="book"
                          paddingRight="xs"
                      />
                      <a>{'l1ving / youtube-dl'}</a>
                    </h3>
                  </FlexItem>
                  <FlexItem>
                    <Button
                        icon="star"
                        text="Star"
                        variant="secondary"
                    />
                  </FlexItem>
                </Flex>
                <FlexItem
                    paddingBottom="xs"
                >
                  {'A fork of youtube-dl, for archival purposes.'}
                </FlexItem>

                <Flex
                    spacing="between"
                >
                  <FlexItem>
                    <FlexItem>
                      <Flex
                          wrap={true}
                      >
                        <FlexItem>
                          <Legend
                              color="data_2"
                              paddingRight="xs"
                              text="Python"
                          />
                        </FlexItem>
                        <FlexItem>
                          <IconValue
                              icon="star"
                              paddingRight="sm"
                              text="2,278"
                          />
                        </FlexItem>
                        <FlexItem>
                          <IconValue
                              icon="bezier-curve"
                              paddingRight="sm"
                              text="1,366"
                          />
                        </FlexItem>
                        <FlexItem>
                          <Flex>
                            <FlexItem>
                              <Body
                                  color="light"
                                  paddingRight="sm"
                                  text="Built by"
                              />
                            </FlexItem>
                            <FlexItem>
                              <MultipleUsers
                                  users={[
                              {
                                name: 'Patrick Welch',
                                imageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
                              },
                              {
                                name: 'Lucille Sanchez',
                                imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
                              },
                              {
                                name: 'Beverly Reyes',
                                imageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
                              },
                              {
                                name: 'Keith Craig',
                                imageUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
                              },
                              {
                                name: 'Alicia Cooper',
                                imageUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
                              },
                            ]}
                              />
                            </FlexItem>
                          </Flex>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                        icon="star"
                        text="172 stars today"
                    />
                  </FlexItem>
                </Flex>
              </Flex>
            </div>
            <SectionSeparator />
            <div className="p_sm">
              <Flex
                  orientation="column"
                  vertical="stretch"
              >
                <Flex
                    spacing="between"
                >
                  <FlexItem>
                    <h3>
                      <Icon
                          fixedWidth
                          icon="book"
                          paddingRight="xs"
                      />
                      <a>{'apache / incubator-nuttx'}</a>
                    </h3>
                  </FlexItem>
                  <FlexItem>
                    <Button
                        icon="star"
                        text="Star"
                        variant="secondary"
                    />
                  </FlexItem>
                </Flex>
                <FlexItem
                    paddingBottom="xs"
                >
                  {'Apache NuttX is a mature, real-time embedded operating system (RTOS).'}
                </FlexItem>

                <Flex
                    spacing="between"
                >
                  <FlexItem>
                    <FlexItem>
                      <Flex
                          wrap={true}
                      >
                        <FlexItem>
                          <Legend
                              color="data_3"
                              paddingRight="xs"
                              text="C"
                          />
                        </FlexItem>
                        <FlexItem>
                          <IconValue
                              icon="star"
                              paddingRight="sm"
                              text="2,278"
                          />
                        </FlexItem>
                        <FlexItem>
                          <IconValue
                              icon="bezier-curve"
                              paddingRight="sm"
                              text="1,366"
                          />
                        </FlexItem>
                        <FlexItem>
                          <Flex>
                            <FlexItem>
                              <Body
                                  color="light"
                                  paddingRight="sm"
                                  text="Built by"
                              />
                            </FlexItem>
                            <FlexItem>
                              <MultipleUsers
                                  users={[
                              {
                                name: 'Patrick Welch',
                                imageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
                              },
                              {
                                name: 'Lucille Sanchez',
                                imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
                              },
                              {
                                name: 'Beverly Reyes',
                                imageUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
                              },
                              {
                                name: 'Keith Craig',
                                imageUrl: 'https://randomuser.me/api/portraits/men/24.jpg',
                              },
                              {
                                name: 'Alicia Cooper',
                                imageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
                              },
                            ]}
                              />
                            </FlexItem>
                          </Flex>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                        icon="star"
                        text="302 stars today"
                    />
                  </FlexItem>
                </Flex>
              </Flex>
            </div>
            <SectionSeparator />
            <div className="p_sm">
              <Flex
                  orientation="column"
                  vertical="stretch"
              >
                <Flex
                    spacing="between"
                >
                  <FlexItem>
                    <h3>
                      <Icon
                          fixedWidth
                          icon="book"
                          paddingRight="xs"
                      />
                      <a>{'jofpin / trape'}</a>
                    </h3>
                  </FlexItem>
                  <FlexItem>
                    <Button
                        icon="star"
                        text="Star"
                        variant="secondary"
                    />
                  </FlexItem>
                </Flex>
                <FlexItem
                    paddingBottom="xs"
                >
                  {'Learning to scrape using the trape tool.'}
                </FlexItem>

                <Flex
                    spacing="between"
                >
                  <FlexItem>
                    <FlexItem>
                      <Flex
                          wrap={true}
                      >
                        <FlexItem>
                          <Legend
                              color="data_2"
                              paddingRight="xs"
                              text="Python"
                          />
                        </FlexItem>
                        <FlexItem>
                          <IconValue
                              icon="star"
                              paddingRight="sm"
                              text="2,278"
                          />
                        </FlexItem>
                        <FlexItem>
                          <IconValue
                              icon="bezier-curve"
                              paddingRight="sm"
                              text="1,366"
                          />
                        </FlexItem>
                        <FlexItem>
                          <Flex>
                            <FlexItem>
                              <Body
                                  color="light"
                                  paddingRight="sm"
                                  text="Built by"
                              />
                            </FlexItem>
                            <FlexItem>
                              <MultipleUsers
                                  users={[
                              {
                                name: 'Patrick Welch',
                                imageUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
                              },
                              {
                                name: 'Lucille Sanchez',
                                imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
                              },
                              {
                                name: 'Beverly Reyes',
                                imageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
                              },
                              {
                                name: 'Keith Craig',
                                imageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
                              },
                              {
                                name: 'Alicia Cooper',
                                imageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
                              },
                            ]}
                              />
                            </FlexItem>
                          </Flex>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                        icon="star"
                        text="789 stars today"
                    />
                  </FlexItem>
                </Flex>
              </Flex>
            </div>

          </Card>
        </Background>

      </div>

    </div>
  )
}

export default TrendingRepositories
