import React from 'react';
import { Button, Card, Filter, Flex, Select, SkeletonLoading, TextInput } from "playbook-ui";

const SortingChangeCallback = (sortOptions) => {
  alert(JSON.stringify(sortOptions[0]))
}

const SkeletonLoadingFilter = (props) => {
  const isLoading = true

  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A galaxy far far away, like really far away...' },
  ]

  return (
    <div>
      <div>
        {isLoading ? (
          <Card 
              marginBottom="lg" 
              {...props}
          >
              <Flex 
                  alignItems="center" 
                  justify="between"
                  orientation="row"
              >
                  <Flex 
                      alignItems="center" 
                      justify="start"
                      orientation="row"
                  >
                      <SkeletonLoading
                          borderRadius="rounded"
                          height="40px"
                          marginRight="sm"
                          width="40px"
                          {...props}
                      />
                      <SkeletonLoading 
                          height="16px" 
                          marginRight="md"
                          width="80px"
                          {...props}
                      />
                  </Flex>
                  <Flex 
                      alignItems="center" 
                      justify="end"
                      orientation="row"
                  >
                      <SkeletonLoading 
                          height="18px" 
                          width="120px"
                          {...props}
                      />
                  </Flex>
              </Flex>
          </Card>
        ) : (
          <Filter
              filters={{ 'Full Name': 'John Wick' }}
              marginBottom="lg" 
              minWidth="375px"
              results={546}
              sortOptions={{
                popularity: 'Popularity',
                // eslint-disable-next-line
                manager_title: "Manager\'s Title",
                // eslint-disable-next-line
                manager_name: "Manager\'s Name",
              }}
              sortValue={[{ name: 'popularity', dir: 'desc' }]}
          >
            {({ closePopover }) => (
              <form>
                <TextInput 
                    label="Example Text Field" 
                    placeholder="Enter Text"
                />
                <Select
                    blankSelection="Select One..."
                    label="Example Collection Select"
                    name="Collection Select"
                    options={options}
                />
                <Flex spacing="between">
                    <Button 
                        onClick={closePopover} 
                        text="Filter"
                    />
                    <Button 
                        text="Defaults" 
                        variant="secondary"
                    />
                </Flex>
              </form>
            )}
          </Filter>
        )}
      </div>
      <div>
        {isLoading ? (
          <SkeletonLoading 
              height="127px" 
              marginBottom="lg"
              width="100%"
              {...props}
          />
        ) : (
          <Filter
              double
              filters={{
                'Full Name': 'John Wick',
                'City': 'San Francisco',
              }}
              marginBottom="xl"
              minWidth="375px"
              onSortChange={SortingChangeCallback}
              results={1}
              sortOptions={{
                popularity: 'Popularity',
                manager_title: "Manager's Title",
                manager_name: "Manager's Name",
              }}
              sortValue={[{ name: 'popularity', dir: 'desc' }]}
          >
            {({ closePopover }) => (
              <form>
                <TextInput 
                    label="Full Name" 
                    placeholder="Enter name"
                />
                <Select
                    blankSelection="Select One..."
                    label="Territory"
                    maxWidth="sm"
                    name="location"
                    options={options}
                />
                <Flex spacing="between">
                    <Button 
                        onClick={closePopover}
                        text="Filter" 
                    />
                    <Button 
                        text="Defaults"
                        variant="secondary"
                    />
                </Flex>
              </form>
            )}
          </Filter>
        )}
      </div>      
    </div>
  )
}

export default SkeletonLoadingFilter;
