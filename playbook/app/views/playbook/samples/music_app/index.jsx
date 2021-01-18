import React from "react"

import FlexItem from '../../../../pb_kits/playbook/pb_flex/_flex_item.jsx'
import { Background, Body, Caption, Card, Flex, Icon, Image, Layout, ProgressSimple, SectionSeparator, Table, TableRow, TextInput, Title, User }  from '../../../../pb_kits/playbook'

const yourLibraryLinks = ["Made For You", "Recently Played", "Liked Songs", "Albums", "Artists", "Podcasts"]
const playlists = ["podcasts", "THENX", "Adrenaline Workout", "New Music Friday", "RetroWave / Outrun", "Tiki Torch"]

const randomImageUrl = (id) => `https://picsum.photos/id/${id}/175`
const playlistCardSubtext = "A daily show for anyone who works a regular job and wants to start an income-earning pr..."
const playlistCardTitles = ["Side Hustle School", "The Devslopes Podcast with Mark Wahlbeck", "Borrasca",
                             "Philosophize This!", "How I Built This With Guy Raz"]

const SmallIconPadded = ({icon, ...rest}) => <Icon marginX="sm" dark icon={icon} {...rest}/>
const BottomRightIcon = ({icon, ...rest}) =>  (
  <Body dark paddingRight="sm">
    <Icon dark icon={icon}/>
  </Body>
)



const MusicApp = () => {
  window.addEventListener('DOMContentLoaded', () => {
    const fullHeightElems = document.querySelectorAll(".fullHeight")
    fullHeightElems.forEach(elem => elem.style.height = "100%")
  })

  return (
    <Background
        backgroundColor="dark"
        padding="none"
    >
      <Flex
          orientation="column"
          vertical="stretch"
      >
        <FlexItem grow>
          <Layout
              collapse="xs"
              position="left"
              size="sm"
              dark
          >
            <Layout.Side>
{/**--------------------- Sidebar start --------------------- */}
              <Flex
                  className="fullHeight"
                  orientation="column"
                  spacing="between"
                  vertical="stretch"
              >
                <div>
                  <Table
                      container={false}
                      dark
                      disableHover
                      marginBottom="lg"
                      marginTop="md"
                      responsive="none"
                      size="sm"
                  >
                    <tbody>
                      <TableRow
                          dark
                          sideHighlightColor="category_2"
                      >
                        <td>
                          <Body dark>
                            <Icon
                                dark
                                icon="home"
                                marginRight="xs"
                            />
                            Home
                          </Body>
                        </td>
                      </TableRow>
                      <tr>
                        <td>
                          <Body dark>
                            <Icon
                                dark
                                icon="music"
                                marginRight="xs"
                            />
                            Browse
                          </Body>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Body dark>
                            <Icon
                                dark
                                icon="radio"
                                marginRight="xs"
                            />
                            Radio
                          </Body>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Caption paddingLeft="lg">Your Library</Caption>
                  {
                    yourLibraryLinks.map((linkText, index) =>
                      <Body
                          color="lighter"
                          dark
                          key={index}
                          padding="none"
                          paddingBottom="xs"
                          paddingLeft="lg"
                      >
                        {linkText}
                      </Body>
                    )
                  }
                  <Caption
                      paddingLeft="lg"
                      paddingTop="lg"
                  >
                    Playlists
                  </Caption>
                  {
                    playlists.map((linkText, index) =>
                    <Body
                        color="lighter"
                        dark
                        key={index}
                        padding="none"
                        paddingBottom="xs"
                        paddingLeft="lg"
                    >
                      {linkText}
                    </Body>
                    )
                  }
                </div>
                <div>
                  <SectionSeparator dark />
                  <Body
                      dark
                      paddingY="sm"
                  >
                    <Icon
                        marginLeft="lg"
                        marginRight="xs"
                        dark
                        icon="plus-circle"
                    />
                    New Playlist
                  </Body>
                  <SectionSeparator dark />
                </div>
              </Flex>
{/**--------------------- End of sidebar--------------------- */}
            </Layout.Side>
            <Layout.Body>
              <Flex
                  className="fullHeight"
                  orientation="column"
                  vertical="stretch"
              >
{/**---------------------- Start Header ---------------------- */}
                <Flex
                      dark
                      paddingLeft="lg"
                      paddingY="xs"
                      vertical="center"
                  >
                    <Body color="lighter" dark>
                      <Icon
                          dark
                          icon="chevron-left"
                          size="1x"
                          padding="none"
                          marginX="lg"
                      />
                    </Body>
                    <Body dark>
                      <Icon
                          dark
                          icon="chevron-right"
                          size="1x"
                          padding="none"
                          marginRight="lg"
                      />
                    </Body>

                    <TextInput
                      dark
                      placeholder="Search"
                      />

                    <FlexItem grow />

                    <User
                        align="left"
                        avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                        dark
                        name="Maria Illescas"
                        orientation="horizontal"
                        paddingRight="sm"
                    />
                    <Body dark>
                      <Icon
                          dark
                          icon="chevron-down"
                          marginRight="sm"
                          padding="none"
                          size="1x"
                      />
                    </Body>
                  </Flex>
{/**---------------------- End of Header---------------------- */}
                <FlexItem grow>
{/**---------------------- Start Body  ---------------------- */}
                <Card
                      dark
                      padding="none"
                      paddingBottom="xs"
                  >
                    <Flex
                        marginX="lg"
                        orientation="column"
                        paddingTop="lg"
                        paddingX="xl"
                        vertical="stretch"
                    >
                      <Title
                          dark
                          size={1}
                          text="Home"
                          marginBottom="sm"
                      />

                      <Title
                          dark
                          size={4}
                          text="Your top podcasts"
                      />
                      <SectionSeparator dark/>
                      <Flex paddingTop="sm">
                        {
                          playlistCardTitles.map((title, i) => (
                              <FlexItem
                                  fixedSize="175px"
                                  paddingRight="sm"
                                  key={i}
                              >
                                <Image url={randomImageUrl(Math.floor(1000 * Math.random()))} />
                                <Caption dark >{title}</Caption>
                                <Caption dark
                                        size="xs">
                                  {playlistCardSubtext}
                                </Caption>
                              </FlexItem>
                          ))
                        }
                      </Flex>

                      <Flex
                          spacing="between"
                          vertical="bottom"
                      >
                        <div>
                          <Title
                              dark
                              paddingTop="sm"
                              size={4}
                              text="Made for you"
                          />
                          <Caption
                              dark
                              size="xs"
                              text="Get better recommandations the more you listen."
                          />
                        </div>
                        <div>
                          <Flex paddingBottom="xs">
                            <Body
                                color="lighter"
                                dark
                            >
                              <Icon
                                  dark
                                  icon="chevron-left"
                                  size="1x"
                                  padding="none"
                                  marginRight="sm"
                              />
                            </Body>
                            <Body dark>
                              <Icon
                                  dark
                                  icon="chevron-right"
                                  size="1x"
                                  padding="none"
                              />
                            </Body>
                          </Flex>
                        </div>
                      </Flex>
                      <SectionSeparator dark/>
                      <Flex paddingTop="sm">
                        {
                          [...Array(6)].map((_,i) => (
                            <FlexItem
                                fixedSize="175px"
                                key={i}
                                paddingRight="sm"
                            >
                              <Image url={randomImageUrl(Math.floor(1000 * Math.random()))} />
                              <Caption dark >Daily Mix {i+1}</Caption>
                              <Caption
                                  dark
                                  size="xs"
                              >
                                {playlistCardSubtext}
                              </Caption>
                            </FlexItem>
                          ))
                        }
                      </Flex>
                    </Flex>
                  </Card>
{/**---------------------- End of Body ---------------------- */}
                </FlexItem>
              </Flex>
            </Layout.Body>
          </Layout>
        </FlexItem>
{/**---------------------- Start Footer  ---------------------- */}
      <Background
            backgroundColor="dark"
            padding="none"
        >
          <Flex
              padding="xs"
              vertical="stretch"
          >
            <FlexItem fixedSize="22%">
              <Flex
                  vertical="center"
              >
                <Image
                    marginLeft="xs"
                    url={randomImageUrl(Math.floor(1000 * Math.random()))}
                />
                <Body dark
                      paddingLeft="sm">
                  <Title
                      dark
                      size={4}
                  >
                    Change Will Come
                    <Icon
                          dark
                          icon="heart"
                          marginLeft="xs"
                    />
                  </Title>
                  <Caption
                      dark
                      size="xs"
                      text="Cut Snake"
                  />
                </Body>
              </Flex>
            </FlexItem>

            <FlexItem
                fixedSize="56%"
                marginTop="xs"
            >
              <Flex
                  orientation="column"
                  vertical="stretch"
              >
                <Body
                    dark
                    marginBottom="xs"
                >
                  <Flex
                      horizontal="center"
                      vertical="center"
                  >
                    <SmallIconPadded icon="random"/>
                    <SmallIconPadded icon="step-backward"/>
                    <SmallIconPadded icon="play-circle" size="2x"/>
                    <SmallIconPadded icon="step-forward"/>
                    <SmallIconPadded icon="repeat"/>
                  </Flex>
                </Body>
                <Flex
                    horizontal="center"
                    vertical="center"
                >
                  <Body
                      dark
                      marginRight="sm"
                      text="2:00"
                  />
                  <FlexItem grow>
                      <ProgressSimple muted percent={20} />
                  </FlexItem>
                  <Body
                      dark
                      marginLeft="sm"
                      text="10:00"
                  />
                </Flex>
              </Flex>
            </FlexItem>

            <FlexItem fixedSize="22%">
              <Flex
                  className="fullHeight"
                  vertical="center"
                  horizontal="right"
              >
                <BottomRightIcon icon="list-music"/>
                <BottomRightIcon icon="computer-speaker"/>
                <BottomRightIcon icon="volume"/>
                <FlexItem fixedSize="100px">
                <ProgressSimple muted paddingRight="md" percent={30} />
                </FlexItem>
                <BottomRightIcon icon="expand-alt"/>
              </Flex>
            </FlexItem>
          </Flex>
        </Background>
{/**---------------------- End of Footer ---------------------- */}
      </Flex>
    </Background>
  )

}

export default MusicApp
