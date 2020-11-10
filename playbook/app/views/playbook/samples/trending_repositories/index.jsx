import React from 'react'
import { Background, Body, Button, Card, Flex, FlexItem, Icon, IconValue, MultipleUsers, Nav, Title, SectionSeparator, Legend } from '../../../../pb_kits/playbook'
import NavItem from '../../../../pb_kits/playbook/pb_nav/_item.jsx'

const TrendingRepositories = () => (
  <div>

    <div class="nav-bar-header">
      <Background
          backgroundColor="white"
          padding="sm"
      >
        <Flex
          spacing="between"
          paddingLeft="xl"
          paddingRight="md"
        >
          <FlexItem>
            <Nav
            link="#"
            orientation="horizontal"
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
            />
          </FlexItem>
        </Flex>
      </Background>
      <SectionSeparator />

    </div>

    <div class="trending-section">
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

    <div class="cards-body">
      <Background
        backgroundColor="white"
        padding="sm"
      >
        <Card
          padding="none"
          margin="xl"
        >
          <Background
            backgroundColor="light"
          >

            <Flex
            spacing="between"
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

              <div class="p_sm">
                <FlexItem>
                  <Flex
                    spacing="evenly"
                    horizontal="right"
                    wrap="true"
                  >
                    <FlexItem
                      paddingRight="lg"
                    >
                      {"Spoken Language: "}
                      <Title
                        tag="span"
                        text="Any "
                        size={4}
                      />
                      <span>&#9662;</span>
                    </FlexItem>
                    <FlexItem
                      paddingRight="lg"
                    >
                      {"Language: "}
                      <Title
                        tag="span"
                        text="Any "
                        size={4}
                      />
                      <span>&#9662;</span>
                    </FlexItem>
                    <FlexItem
                      padding="none"
                    >
                      {"Date Range: "}
                      <Title
                        tag="span"
                        text="Today "
                        size={4}
                      />
                      <span>&#9662;</span>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </div>
            </Flex>
          </Background>
        <SectionSeparator />
        <div class="p_sm">
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
                    paddingRight="xs"
                    fixedWidth
                    icon="book"
                  />
                  <a>themsaid / ibis</a>
                </h3>
              </FlexItem>
              <FlexItem>
                <Button
                  variant="secondary"
                  text="Star"
                  icon="star"
                />
              </FlexItem>
            </Flex>
            <FlexItem
              paddingBottom="xs"
            >
              {"A PHP tool that helps you write eBooks in markdown and convert to PDF."}
            </FlexItem>

            <Flex
              spacing="between"
            >
              <FlexItem>
                <FlexItem>
                <Flex
                  wrap="true"
                >
                  <FlexItem>
                    <Legend
                      paddingRight="xs"
                      color={`data_1`}
                      text={"HTML"}
                    />
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                      paddingRight="sm"
                      icon="star"
                      text="2,278"
                    />
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                      paddingRight="sm"
                      icon="bezier-curve"
                      text="1,366"
                    />
                  </FlexItem>
                  <FlexItem>
                    <Flex>
                      <FlexItem>
                        <Body
                          paddingRight="sm"
                          text="Built by"
                          color="light"
                        />
                      </FlexItem>
                      <FlexItem>
                        <MultipleUsers
                          users={[
                            {
                              name: "Patrick Welch",
                              imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
                            },
                            {
                              name: "Lucille Sanchez",
                              imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
                            },
                            {
                              name: "Beverly Reyes",
                              imageUrl: "https://randomuser.me/api/portraits/women/74.jpg",
                            },
                            {
                              name: "Keith Craig",
                              imageUrl: "https://randomuser.me/api/portraits/men/40.jpg",
                            },
                            {
                              name: "Alicia Cooper",
                              imageUrl: "https://randomuser.me/api/portraits/women/46.jpg",
                            }
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
        <div class="p_sm">
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
                    paddingRight="xs"
                    fixedWidth
                    icon="book"
                  />
                  <a>l1ving / youtube-dl</a>
                </h3>
              </FlexItem>
              <FlexItem>
                <Button
                  variant="secondary"
                  text="Star"
                  icon="star"
                />
              </FlexItem>
            </Flex>
            <FlexItem
              paddingBottom="xs"
            >
              {"A fork of youtube-dl, for archival purposes."}
            </FlexItem>

            <Flex
              spacing="between"
            >
              <FlexItem>
                <FlexItem>
                <Flex
                  wrap="true"
                >
                  <FlexItem>
                    <Legend
                      paddingRight="xs"
                      color={`data_2`}
                      text={"Python"}
                    />
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                      paddingRight="sm"
                      icon="star"
                      text="2,278"
                    />
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                      paddingRight="sm"
                      icon="bezier-curve"
                      text="1,366"
                    />
                  </FlexItem>
                  <FlexItem>
                    <Flex>
                      <FlexItem>
                        <Body
                          paddingRight="sm"
                          text="Built by"
                          color="light"
                        />
                      </FlexItem>
                      <FlexItem>
                        <MultipleUsers
                          users={[
                            {
                              name: "Patrick Welch",
                              imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
                            },
                            {
                              name: "Lucille Sanchez",
                              imageUrl: "https://randomuser.me/api/portraits/women/15.jpg",
                            },
                            {
                              name: "Beverly Reyes",
                              imageUrl: "https://randomuser.me/api/portraits/women/17.jpg",
                            },
                            {
                              name: "Keith Craig",
                              imageUrl: "https://randomuser.me/api/portraits/men/18.jpg",
                            },
                            {
                              name: "Alicia Cooper",
                              imageUrl: "https://randomuser.me/api/portraits/women/19.jpg",
                            }
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
        <SectionSeparator/>
        <div class="p_sm">
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
                    paddingRight="xs"
                    fixedWidth
                    icon="book"
                  />
                  <a>apache / incubator-nuttx</a>
                </h3>
              </FlexItem>
              <FlexItem>
                <Button
                  variant="secondary"
                  text="Star"
                  icon="star"
                />
              </FlexItem>
            </Flex>
            <FlexItem
              paddingBottom="xs"
            >
              {"Apache NuttX is a mature, real-time embedded operating system (RTOS)."}
            </FlexItem>

            <Flex
              spacing="between"
            >
              <FlexItem>
                <FlexItem>
                <Flex
                  wrap="true"
                >
                  <FlexItem>
                    <Legend
                      paddingRight="xs"
                      color={`data_3`}
                      text={"C"}
                    />
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                      paddingRight="sm"
                      icon="star"
                      text="2,278"
                    />
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                      paddingRight="sm"
                      icon="bezier-curve"
                      text="1,366"
                    />
                  </FlexItem>
                  <FlexItem>
                    <Flex>
                      <FlexItem>
                        <Body
                          paddingRight="sm"
                          text="Built by"
                          color="light"
                        />
                      </FlexItem>
                      <FlexItem>
                        <MultipleUsers
                          users={[
                            {
                              name: "Patrick Welch",
                              imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
                            },
                            {
                              name: "Lucille Sanchez",
                              imageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
                            },
                            {
                              name: "Beverly Reyes",
                              imageUrl: "https://randomuser.me/api/portraits/women/23.jpg",
                            },
                            {
                              name: "Keith Craig",
                              imageUrl: "https://randomuser.me/api/portraits/men/24.jpg",
                            },
                            {
                              name: "Alicia Cooper",
                              imageUrl: "https://randomuser.me/api/portraits/women/29.jpg",
                            }
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
        <SectionSeparator/>
        <div class="p_sm">
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
                    paddingRight="xs"
                    fixedWidth
                    icon="book"
                  />
                  <a>jofpin / trape</a>
                </h3>
              </FlexItem>
              <FlexItem>
                <Button
                  variant="secondary"
                  text="Star"
                  icon="star"
                />
              </FlexItem>
            </Flex>
            <FlexItem
              paddingBottom="xs"
            >
              {"Learning to scrape using the trape tool."}
            </FlexItem>

            <Flex
              spacing="between"
            >
              <FlexItem>
                <FlexItem>
                <Flex
                  wrap="true"
                >
                  <FlexItem>
                    <Legend
                      paddingRight="xs"
                      color={`data_2`}
                      text={"Python"}
                    />
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                      paddingRight="sm"
                      icon="star"
                      text="2,278"
                    />
                  </FlexItem>
                  <FlexItem>
                    <IconValue
                      paddingRight="sm"
                      icon="bezier-curve"
                      text="1,366"
                    />
                  </FlexItem>
                  <FlexItem>
                    <Flex>
                      <FlexItem>
                        <Body
                          paddingRight="sm"
                          text="Built by"
                          color="light"
                        />
                      </FlexItem>
                      <FlexItem>
                        <MultipleUsers
                          users={[
                            {
                              name: "Patrick Welch",
                              imageUrl: "https://randomuser.me/api/portraits/men/30.jpg",
                            },
                            {
                              name: "Lucille Sanchez",
                              imageUrl: "https://randomuser.me/api/portraits/women/31.jpg",
                            },
                            {
                              name: "Beverly Reyes",
                              imageUrl: "https://randomuser.me/api/portraits/women/32.jpg",
                            },
                            {
                              name: "Keith Craig",
                              imageUrl: "https://randomuser.me/api/portraits/men/33.jpg",
                            },
                            {
                              name: "Alicia Cooper",
                              imageUrl: "https://randomuser.me/api/portraits/women/34.jpg",
                            }
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

export default TrendingRepositories