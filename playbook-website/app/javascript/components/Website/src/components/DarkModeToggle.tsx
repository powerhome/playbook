import { Body, Flex, FlexItem, Icon, Toggle } from 'playbook-ui';
import { useDarkMode } from '../contexts/DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Flex
      spacing="between"
      vertical="center"
    >
      <FlexItem>
        <Body
          color={darkMode ? '' : 'lighter'}
          dark={darkMode}
        >
          <Icon
            className="toggle-icon"
            fixedWidth
            icon="moon"
            marginRight="xs"
          />
        </Body>
      </FlexItem>
      <FlexItem>
        <Toggle>
          <input
            checked={darkMode}
            onChange={toggleDarkMode}
            type="checkbox"
          />
        </Toggle>
      </FlexItem>
    </Flex>
  );
};

export default DarkModeToggle;
