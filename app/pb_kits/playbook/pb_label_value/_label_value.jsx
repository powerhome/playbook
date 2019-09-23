// @flow
import React from 'react';
import Body from "../pb_body/_body.jsx";
import Caption from "../pb_caption/_caption.jsx";

type Props = {
  className?: string,
  id?: string,
  label?: string,
  value?: string,
  children?: React.Node,
};

const LabelValue = ({id, className, label, value, children}: Props) => {
  return (
    <div className={className || "pb_label_value_kit"} id={id}>
      <Caption text={label} />
      <Choose>
        <When condition={!!value}>
          <Body text={value} />
        </When>
        <Otherwise>
          {children}
        </Otherwise>
      </Choose>
    </div>
  )
}


export default LabelValue;
