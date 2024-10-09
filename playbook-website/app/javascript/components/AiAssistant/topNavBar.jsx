import React from "react"
import { Card, Icon, Flex, FlexItem  } from 'playbook-ui';


const topNavBar = () => {

  return (
    <>
        <Card fullWidth padding="none">
            <Flex align="center" htmlOptions={{style: {height:"40px"}}} justify="between" > 
                <FlexItem>
                    <Flex>
                        <div>
                            <Icon marginX="md" icon="arrow-left"/>
                        </div>
                        <div>
                            <Icon icon="arrow-right"/>
                        </div>
                    </Flex>
                </FlexItem>
                <FlexItem>
                    <Flex>
                        <div>
                            <Icon icon="file-circle-plus"/>
                        </div>
                        <div>
                            <Icon marginX="md" icon="file-export"/>
                        </div>
                    </Flex>
                </FlexItem>
            </Flex>
        </Card>
    </>
  );
};

export default topNavBar;