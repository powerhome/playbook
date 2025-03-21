import React, { useState } from 'react';

import Button from '../../pb_button/_button'
import SkeletonLoading from '../../pb_skeleton_loading/_skeleton_loading'
import Flex from '../../pb_flex/_flex'
import User from '../../pb_user/_user'

const SkeletonLoadingUser = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const toggleLoading = () => setIsLoading((prev) => !prev)

  return (
    <div>
      <Button 
          marginBottom="md" 
          onClick={toggleLoading} 
          variant="secondary"
      >
          {isLoading ? "Show User" : "Show Skeleton Loading"}
      </Button>
      <div>
        {isLoading ? (
          <Flex alignItems="center">
              <SkeletonLoading 
                  borderRadius="rounded" 
                  height="38px" 
                  paddingRight="sm"
                  width="38px" 
                  {...props} 
              />
                <SkeletonLoading 
                    gap="xxs"
                    height="18px" 
                    stack="2"
                    width="161px"
                    {...props}
                />
          </Flex>
        ) : (
          <User
              align="left"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              orientation="horizontal"
              title="Remodeling Consultant"
              {...props}
          />
        )}
      </div>
      <div>
        {isLoading ? (
          <Flex 
              alignItems="start"
              paddingTop="md"
          >
              <Flex 
                  alignItems="center" 
                  flexDirection="column"
              >
                  <SkeletonLoading 
                      borderRadius="rounded" 
                      height="80px" 
                      paddingBottom="xs" 
                      width="80px" 
                      {...props}
                  />
                  <SkeletonLoading 
                      height="32px" 
                      paddingBottom="xxs" 
                      width="144px" 
                      {...props} 
                  />
                  <SkeletonLoading 
                      height="21px" 
                      width="164px" 
                      {...props}
                  />
              </Flex>
          </Flex>
        ) : (
          <Flex
              alignItems="start" 
              paddingTop="md"
          >
              <User
                  align="center"
                  avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                  name="Anna Black"
                  orientation="vertical"
                  size="lg"
                  title="Remodeling Consultant"
                  {...props}
              />
          </Flex>
        )}
      </div>
    </div>
  )
}

export default SkeletonLoadingUser;
