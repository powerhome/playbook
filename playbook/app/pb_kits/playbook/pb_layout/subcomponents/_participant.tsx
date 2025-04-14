import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../../utilities/props'
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
  self?: boolean,
} & GlobalProps

export const Participant = (props: LayoutParticipantProps) => {
  const { className, name = 'To be determined...', territory = '', points, rank, avatar, winner, self } = props
  const dynamicInlineProps = globalInlineProps(props)
  const classes = classnames(buildCss('layout_participant', winner ? 'winner' : '', self ? 'self' : ''), globalProps(props), className)
  return (
    <Background
        backgroundColor={winner ? "success_subtle" : "white"}
        className={classes}
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
            <Body color={winner ? "success" : "default"}>{winner ? <strong>{name}</strong> : name}{self ? ' (You)' : ''}</Body>
            <Body
                color={winner ? "success" : "light"}
                display="flex"
            >
              <strong>{points}</strong>
              <Detail
                  color={winner ? "success" : "light"}
                  text="pts"
              />
            </Body>
          </Flex>
          <Body color="light">
            {territory}
            &nbsp;
            <Badge
                text={rank}
                variant={winner ? "success" : self ? "notification" : "neutral"}
            />
          </Body>
        </Body>
      </Flex>
    </Background>
  )
}

export default Participant
