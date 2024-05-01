import React, { useState } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { getPlacementProps } from './Utilities/GetPlacementPropsHelper'

import Image from "../pb_image/_image";
import OnlineStatus from "../pb_online_status/_online_status";
import Flex from "../pb_flex/_flex";
import Badge from "../pb_badge/_badge";
import IconCircle from "../pb_icon_circle/_icon_circle";
import Card from "../pb_card/_card";

export type AvatarProps = {
  aria?: {[key: string]: string},
  className?: string,
  componentOverlay?: {
    component: "badge" | "iconCircle",
    placement: string,
    size?: "md" | "lg" | "sm" | "xl" | "xs" | "xxs",
    text?: string,
    variant?: string,
    icon?: string
  },
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
    componentOverlay,
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

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {componentOverlay ? (
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

          {componentOverlay.component === "badge" && (
             <Card
                 borderNone
                 borderRadius="rounded"
                 padding="none"
                 position="absolute"
                 {...getPlacementProps(componentOverlay.placement, size)}
             >
    
            <Badge
                rounded
                text={componentOverlay.text}
              
              
            />
            </Card>
          )}
          {componentOverlay.component === "iconCircle" && (
            <Card
                borderNone
                borderRadius="rounded"
                htmlOptions={{style: {padding:"2px"}}}
                position="absolute"
                {...getPlacementProps(componentOverlay.placement, size)}
            >
              <IconCircle
                  icon={componentOverlay.icon}
                  size="xxs"
                
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
