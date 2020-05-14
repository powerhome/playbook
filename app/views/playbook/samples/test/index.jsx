import React from 'react'
import { Body, Button, Card, Caption, Checkbox, Flex, Table, Title, SectionSeparator,  } from '../../../../pb_kits/playbook'
import NavItem from '../../../../pb_kits/playbook/pb_nav/_item.jsx'
import FlexItem from '../../../../pb_kits/playbook/pb_flex/_flex_item.jsx'

const Test = () => (
  <div>
    <div className="pb_layout_kit_size_lg_left_light full layout_left_collapse_md">
      <div className="layout_sidebar">
        <Title
            size={3}
            tag="h3"
            text="Design Expo"
        />
        <Body
          color="light"
          text="Annual Expo*"
        />
        <SectionSeparator />
        <Title
            size={4}
            tag="h4"
            text="Regions"
        />
        <Flex
            inline
            orientation="column"
        >
          <Checkbox
            checked={true}
            name="NorthAmerica"
            text="North America"
            value="NorthAmerica"
          />
          <Checkbox
            checked={true}
            name="Europe"
            text="Europe"
            value="Europe"
          />
        </Flex>
        
        
        <Title
          size={4}
          tag="h4"
          text="Total Registered"
        />

        <Table size="sm">
          <thead>
            <tr>
              <th>{'Conference'}</th>
              <th>{'Total #'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{'2020 | SF'}</td>
              <td>{'2,391'}</td>
            </tr>
            <tr>
              <td>{'2020 | TOR'}</td>
              <td>{'3,829'}</td>
            </tr>
            <tr>
              <td>{'2019 | AMS'}</td>
              <td>{'2,047'}</td>
            </tr>
            <tr>
              <td>{'2018 | SF'}</td>
              <td>{'1,824'}</td>
            </tr>
            <tr>
              <td>{'2017 | LA'}</td>
              <td>{'719'}</td>
            </tr>
            <tr>
              <td>{'2017 | LDN'}</td>
              <td>{'491'}</td>
            </tr>
          </tbody>
        </Table>
        <Caption
          size="xs"
          text="*This dashboard includes the last six conferences"
        />
      </div>

      <div className="layout_body">
        <Title
            size={3}
            tag="h3"
            text="Registration Dashboard"
        />
        <Flex
            className="bg_light"
            wrap
        >
          <FlexItem fixedSize="60%">
            <Card>

              <Flex
              spacing="around"
              vertical="stretch"
              >
                {/****** first number ******/}
                <FlexItem>
                  <Flex
                  orientation="column"
                  vertical="center"
                  >
                    <FlexItem>
                      <Caption
                        size="xs"
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Caption
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                        size={2}
                        tag="h2"
                        text="2,391"
                      />
                    </FlexItem>   
                  </Flex>
                
                </FlexItem>

                <SectionSeparator orientation="vertical" />

                {/****** second number ******/}

                <FlexItem>
                  <Flex
                  orientation="column"
                  vertical="center"
                  >
                    <FlexItem>
                      <Caption
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                        size={3}
                        tag="h3"
                        text="353"
                      />
                    </FlexItem>   
                  </Flex>
                
                </FlexItem>

                {/****** third number ******/}

                <FlexItem>
                  <Flex
                  orientation="column"
                  vertical="center"
                  >
                    <FlexItem>
                      <Caption
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                        size={3}
                        tag="h3"
                        text="254"
                      />
                    </FlexItem>   
                  </Flex>

                </FlexItem>


                {/****** fourth number ******/}

                <FlexItem>
                  <Flex
                  orientation="column"
                  vertical="center"
                  >
                    <FlexItem>
                      <Caption
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                        size={3}
                        tag="h3"
                        text="194"
                      />
                    </FlexItem>   
                  </Flex>
                </FlexItem>
              </Flex>

              <SectionSeparator />

              <Flex
              spacing="around"
              vertical="stretch"
              >
                {/****** first number ******/}
                <FlexItem>
                  <Flex
                  orientation="column"
                  vertical="center"
                  >
                    <FlexItem>
                      <Caption
                        size="xs"
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Caption
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                        size={2}
                        tag="h2"
                        text="2,391"
                      />
                    </FlexItem>   
                  </Flex>
                
                </FlexItem>

                <SectionSeparator orientation="vertical" />

                {/****** second number ******/}

                <FlexItem>
                  <Flex
                  orientation="column"
                  vertical="center"
                  >
                    <FlexItem>
                      <Caption
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                        size={3}
                        tag="h3"
                        text="353"
                      />
                    </FlexItem>   
                  </Flex>
                
                </FlexItem>

                {/****** third number ******/}

                <FlexItem>
                  <Flex
                  orientation="column"
                  vertical="center"
                  >
                    <FlexItem>
                      <Caption
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                        size={3}
                        tag="h3"
                        text="254"
                      />
                    </FlexItem>   
                  </Flex>

                </FlexItem>


                {/****** fourth number ******/}

                <FlexItem>
                  <Flex
                  orientation="column"
                  vertical="center"
                  >
                    <FlexItem>
                      <Caption
                        text="Caption"
                      />
                    </FlexItem>
                    <FlexItem>
                      <Title
                        size={3}
                        tag="h3"
                        text="194"
                      />
                    </FlexItem>   
                  </Flex>
                </FlexItem>
              </Flex>



              
              
            </Card>

            <Flex
            orientation="column"
            vertical="right"
            >
              <FlexItem>
                <Button
                  onClick={() => alert('button clicked!')}
                  text="View full breakdown"
                  variant="link"
                />
              </FlexItem>
            </Flex>

            <Card>{'Card content'}</Card>
          </FlexItem>
          <FlexItem fixedSize="40%">
            {'2'}
          </FlexItem>
        </Flex>



      </div>
    </div>

  </div>
)

export default Test
