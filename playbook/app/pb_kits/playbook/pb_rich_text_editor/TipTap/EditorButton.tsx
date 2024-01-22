import React from "react";

import Icon from "../../pb_icon/_icon";
import Flex from "../../pb_flex/_flex";
import Tooltip from "../../pb_tooltip/_tooltip";


type EditorButtonProps = {
  classname?: string,
  onclick?: () => undefined | void,
  icon?: string;
  text?: string;
  disable?: boolean
};

const EditorButton = ({
  classname,
  disable,
  onclick,
  icon,
  text,
}: EditorButtonProps): React.ReactElement => {
  return (
    <Tooltip
        delay={{
        open: 2000
      }}
        interaction
        placement="top"
        text={text}
    >
      <button
          className={classname}
          disabled={disable}
          onClick={onclick}
          role="button"
          type="button"
      >
        <Flex
            align="center"
            className="toolbar_button_icon"
            justify="center"
        >
          <Icon icon={icon}
              size="lg"
          />
        </Flex>
      </button>
    </Tooltip>
  );
};

export default EditorButton