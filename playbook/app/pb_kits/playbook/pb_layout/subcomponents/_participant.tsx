import React from 'react'
import classnames from 'classnames'

import { GlobalProps, globalProps, globalInlineProps } from '../../utilities/globalProps'

import Avatar from "../../pb_avatar/_avatar";
import Body from "../../pb_body/_body";
import Flex from "../../pb_flex/_flex";
import Badge from "../../pb_badge/_badge";
import Detail from "../../pb_detail/_detail";
import Background from "../../pb_background/_background";

type LayoutParticipantProps = {
  className?: string,
  name?: string,
  territory?: string,
  points?: string,
  rank?: string,
  avatar?: string,
  winner?: boolean,
} & GlobalProps

export const Participant = (props: LayoutParticipantProps) => {
  const { className, name = 'To be determined...', territory = '', points, rank, avatar, winner } = props
  const dynamicInlineProps = globalInlineProps(props)
  return (
    <Background
        backgroundColor={winner ? "success_subtle" : "white"}
        className={classnames('layout_participant', globalProps(props), className)}
        padding="xs"
        style={dynamicInlineProps}
    >
      <Flex justify="between">
        <Avatar
            imageUrl={avatar}
            marginRight="sm"
            name={name}
            size="sm"
        />
        <Body flexGrow={1}>
          <Flex justify="between">
            <Body color={winner ? "success" : "default"}>{name}</Body>
            <Body display="flex">
              <strong>{points}</strong>
              <Detail
                  color="light"
                  paddingLeft="xxs"
                  text="pts"
              />
            </Body>
          </Flex>
          <Body>{territory} <Badge text={rank}/></Body>
        </Body>
      </Flex>
    </Background>
  )
}

export default Participant
