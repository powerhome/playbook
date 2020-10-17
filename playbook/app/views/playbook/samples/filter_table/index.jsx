import React from 'react'
import { Body, Button, Caption, CircleIconButton, Currency, Date, Filter, Flex, FlexItem, PersonContact, ProgressPills, Table, TextInput, Title, User } from '../../../../pb_kits/playbook'

const FilterTable = () => (
  <div>
    <Flex
        className="bg_light"
        marginTop="md"
        paddingX="md"
        spacing="between"
    >
      <FlexItem>
        <Title
            size={3}
            tag="h3"
            text="Prospective Clients"
        />
      </FlexItem>
      <FlexItem>
        <Button
            onClick={() => alert('button clicked!')}
            text="Add Client"
        />
      </FlexItem>
    </Flex>
    <Filter
        filters={{ 'Start Date': 'Apr 19, 2020', 'End Date': 'Apr 20, 2020' }}
        marginTop="md"
        marginX="md"
        results={0}
        sortOptions={{
          dateCreated: 'Date Created',
          // eslint-disable-next-line
          assignee: 'Assignee',
          // eslint-disable-next-line
          contact: 'Contact',
          // eslint-disable-next-line
          inquirySource: 'Inquiry Source',
        }}
        sortValue={[{ name: 'dateCreated', dir: 'asc' }]}
        template="single"
    >

      <Flex orientation="row">
        <TextInput
            aria={{ label: 'hello' }}
            data={{ say: 'hi', yell: 'go' }}
            id="unique-id"
            label="Start Date"
            paddingRight="md"
            placeholder="Enter first name"
            value="Apr 19, 2020"
        />
        <TextInput
            aria={{ label: 'hello' }}
            data={{ say: 'hi', yell: 'go' }}
            id="unique-id"
            label="End Date"
            placeholder="Enter first name"
            value="Apr 20, 2020"
        />
      </Flex>

      <Flex spacing="between">
        <Button text="Apply" />
        <Button
            text="Clear"
            variant="secondary"
        />
      </Flex>
    </Filter>
    <Flex orientation="row">

      <Table
          margin="md"
          size="sm"
      >
        <thead>
          <tr>
            <th>{'Contact'}</th>
            <th>{'Date Created'}</th>
            <th>{'Inquiry Source'}</th>
            <th>{'Lead Status'}</th>
            <th>{'Quote'}</th>
            <th>{'Assignee'}</th>
            <th>{'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PersonContact
                  contacts={[
                        {
                          contactType: 'cell',
                          contactValue: '3832919348',
                        },
                        {
                          contactType: 'email',
                          contactValue: 'jesse.cortez@gmail.com',
                        },
                      ]}
                  firstName="Jesse"
                  lastName="Cortez"
              />
            </td>
            <td>
              <Date
                  size="xs"
                  value="2020-04-20T04:20:00.000Z"
              />
            </td>
            <td>
              <Body text="Email" />
              <Caption
                  size="xs"
                  text="hello@companyname.com"
              />
            </td>
            <td>
              <ProgressPills
                  active={0}
                  steps={4}
                  title="Status:"
                  value="Not Started"
              />
            </td>
            <td>
              <Currency amount="729.63" />
            </td>
            <td>
              <Body text="Unassigned" />
            </td>
            <td>
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
              />
            </td>
          </tr>
          <tr>
            <td>
              <PersonContact
                  contacts={[
                        {
                          contactType: 'cell',
                          contactValue: '8313455824',
                        },
                        {
                          contactType: 'email',
                          contactValue: 'billbuch@yahoo.com',
                        },
                      ]}
                  firstName="Bill"
                  lastName="Buchanan"
              />
            </td>
            <td>
              <Date
                  size="xs"
                  value="2020-04-20T04:20:00.000Z"
              />
            </td>
            <td>
              <Body text="Social Media" />
              <Caption
                  size="xs"
                  text="Facebook"
              />
            </td>
            <td>
              <ProgressPills
                  active={3}
                  steps={4}
                  title="Status:"
                  value="Negotiation"
              />
            </td>
            <td>
              <Currency amount="534.40" />
            </td>
            <td>
              <User
                  align="left"
                  avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                  name="Anna Black"
                  orientation="horizontal"
                  title="Project Coordinator"
              />
            </td>
            <td>
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
              />
            </td>
          </tr>
          <tr>
            <td>
              <PersonContact
                  contacts={[
                        {
                          contactType: 'cell',
                          contactValue: '1582430782',
                        },
                        {
                          contactType: 'email',
                          contactValue: 'effieguzman@comcast.net',
                        },
                      ]}
                  firstName="Effie"
                  lastName="Guzman"
              />
            </td>
            <td>
              <Date
                  size="xs"
                  value="2020-04-20T04:20:00.000Z"
              />
            </td>
            <td>
              <Body text="Online Quote" />
              <Caption
                  size="xs"
                  text="Landing Page"
              />
            </td>
            <td>
              <ProgressPills
                  active={4}
                  steps={4}
                  title="Status:"
                  value="Contract"
              />
            </td>
            <td>
              <Currency amount="392.26" />
            </td>
            <td>
              <User
                  align="left"
                  avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                  name="Anna Black"
                  orientation="horizontal"
                  title="Project Coordinator"
              />
            </td>
            <td>
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
              />
            </td>
          </tr>
          <tr>
            <td>
              <PersonContact
                  contacts={[
                        {
                          contactType: 'cell',
                          contactValue: '3859275970',
                        },
                        {
                          contactType: 'email',
                          contactValue: 'rodneyboone@gmail.com',
                        },
                      ]}
                  firstName="Rodney"
                  lastName="Boone"
              />
            </td>
            <td>
              <Date
                  size="xs"
                  value="2020-04-20T04:20:00.000Z"
              />
            </td>
            <td>
              <Body text="Internal" />
              <Caption
                  size="xs"
                  text="Referral"
              />
            </td>
            <td>
              <ProgressPills
                  active={4}
                  steps={4}
                  title="Status:"
                  value="Contract"
              />
            </td>
            <td>
              <Currency amount="342.86" />
            </td>
            <td>
              <User
                  align="left"
                  avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                  name="Anna Black"
                  orientation="horizontal"
                  title="Project Coordinator"
              />
            </td>
            <td>
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
              />
            </td>
          </tr>
          <tr>
            <td>
              <PersonContact
                  contacts={[
                        {
                          contactType: 'cell',
                          contactValue: '2849186943',
                        },
                        {
                          contactType: 'email',
                          contactValue: 'barbaramaxwell4@yahoo.com',
                        },
                      ]}
                  firstName="Barbara"
                  lastName="Maxwell"
              />
            </td>
            <td>
              <Date
                  size="xs"
                  value="2020-04-20T04:20:00.000Z"
              />
            </td>
            <td>
              <Body text="Online Quote" />
              <Caption
                  size="xs"
                  text="Main Website"
              />
            </td>
            <td>
              <ProgressPills
                  active={3}
                  steps={4}
                  title="Status:"
                  value="Negotiation"
              />
            </td>
            <td>
              <Currency amount="145.01" />
            </td>
            <td>
              <User
                  align="left"
                  avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                  name="Anna Black"
                  orientation="horizontal"
                  title="Project Coordinator"
              />
            </td>
            <td>
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
              />
            </td>
          </tr>
          <tr>
            <td>
              <PersonContact
                  contacts={[
                        {
                          contactType: 'cell',
                          contactValue: '6884927492',
                        },
                        {
                          contactType: 'email',
                          contactValue: 'ellen.thornton@gmail.com',
                        },
                      ]}
                  firstName="Ellen"
                  lastName="Thornton"
              />
            </td>
            <td>
              <Date
                  size="xs"
                  value="2020-04-20T04:20:00.000Z"
              />
            </td>
            <td>
              <Body text="Social Media" />
              <Caption
                  size="xs"
                  text="Instagram"
              />
            </td>
            <td>
              <ProgressPills
                  active={3}
                  steps={4}
                  title="Status:"
                  value="Negotiation"
              />
            </td>
            <td>
              <Currency amount="25.27" />
            </td>
            <td>
              <User
                  align="left"
                  avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                  name="Anna Black"
                  orientation="horizontal"
                  title="Project Coordinator"
              />
            </td>
            <td>
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Flex>

  </div>
)

export default FilterTable
