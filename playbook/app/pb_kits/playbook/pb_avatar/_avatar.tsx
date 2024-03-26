import React, { useState } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Image from "../pb_image/_image";
import OnlineStatus from "../pb_online_status/_online_status";
import Flex from "../pb_flex/_flex";
import Badge from "../pb_badge/_badge";
import IconCircle from "../pb_icon_circle/_icon_circle";
import Card from "../pb_card/_card";

export type AvatarProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: {[key: string]: string},
  dark?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  imageAlt?: string,
  imageUrl?: string,
  name?: string,
  size?: "md" | "lg" | "sm" | "xl" | "xs" | "xxs",
  status?: "away" | "offline" | "online",
} & GlobalProps

const firstTwoInitials = (name: string) =>
  name.split(/\s/).map((name) => name[0])
    .join('')
    .substring(0, 2)

const Avatar = (props: AvatarProps): React.ReactElement => {
  const {
    aria = {},
    className,
    data = {},
    htmlOptions = {},
    name = undefined,
    overlay,
    id = '',
    imageAlt = '',
    imageUrl,
    size = 'md',
    status = null,
    dark = false,
  } = props
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss('pb_avatar_kit', `size_${size}`),
    globalProps(props),
    className
  )

  const initials = name && firstTwoInitials(name)
  dataProps['data-initials'] = (initials as string)

  const [error, setError] = useState(false)
  const handleError = () => setError(true)

  const canShowImage = imageUrl && !error

  //example of placement configurations, will need to account for different Avatar sizes + will be different for badge vs IconCircle
  const getPlacementProps = (placement: string) => {
  const placementMapping: any = {
    'top-right': { top: '0', right: '0' },
    'bottom-left': { bottom: '0', left: '0' },
    'top-left': { top: '0', left: '0' },
    'bottom-right': { bottom: '0', right: '0' },
  }

  return placementMapping[placement] || {};
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {overlay ? (
        <Flex display="display_inline_block" 
            position="relative"
        >
          <div className="avatar_wrapper" 
              data-initials={initials}
          >
            {canShowImage && (
              <Image
                  alt={imageAlt ? imageAlt : name}
                  onError={handleError}
                  url={imageUrl}
              />
            )}
          </div>

          {overlay.component === "badge" && (
            <Badge
                position="absolute"
                rounded
                text={overlay.text}
                variant={overlay.variant}
                {...getPlacementProps(overlay.placement)}
            />
          )}
          {overlay.component === "icon" && (
            <Card
                borderNone
                borderRadius="rounded"
                padding="xxs"
                position="absolute"
                {...getPlacementProps(overlay.placement)}
            >
              <IconCircle
                  icon={overlay.icon}
                  size="xs"
                  variant={overlay.variant}
              />
            </Card>
          )}
        </Flex>
      ) : (
        <>
          <div className="avatar_wrapper" 
              data-initials={initials}
          >
            {canShowImage && (
              <Image
                  alt={imageAlt ? imageAlt : name}
                  onError={handleError}
                  url={imageUrl}
              />
            )}
          </div>
          {status && (
            <OnlineStatus
                className={`size_${size}`}
                dark={dark}
                status={status}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Avatar
