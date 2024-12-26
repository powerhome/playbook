import React from 'react';
import { components, ControlProps, GroupBase } from 'react-select';
import Flex from '../../pb_flex/_flex';
import TextInput from '../../pb_text_input/_text_input';

type Props = ControlProps<unknown, boolean, GroupBase<unknown>> & {
  selectProps: {
    dark: boolean;
    error: boolean;
    label: string;
  };
};

const TypeaheadControl = (props: Props): JSX.Element => (
  <div className="pb_typeahead_wrapper">
    <TextInput
        dark={props.selectProps.dark}
        error={props.selectProps.error}
        label={props.selectProps.label}
        marginBottom="none"
    >
      <Flex>
        <components.Control<unknown, boolean, GroupBase<unknown>>
            className="text_input"
            {...props}
        >
          {props.children}
        </components.Control>
      </Flex>
    </TextInput>
  </div>
);

export default TypeaheadControl;
