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
  dark?: boolean,
  data?: {[key: string]: string},
  grayscale?:  boolean,
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
    grayscale = false,
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

  const onlineStatusSize =
    ['xxs', 'xs'].includes(size) ? 'sm' :
      ['sm', 'md'].includes(size) ? 'md' :
        ['lg', 'xl'].includes(size) ? 'lg' :
          'sm';

  const onlineStatusPositionProps = (["xxs", "xs", "sm"].includes(size)) ?
    {
      top: { inset: true, value: "0" },
      right: { inset: false, value: "xxs" }
    }
    : {
      bottom: { inset: true, value: "0" },
      right: { inset: true, value: size === "xl" ? "sm" : size === "lg" ? "xs" : "xxs" }
    };

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
                 dark={dark}
                 padding="none"
                 position="absolute"
                 {...getPlacementProps(componentOverlay.placement, size)}
             >

            <Badge
                dark={dark}
                rounded
                text={componentOverlay.text}
                variant={componentOverlay.variant as "error" | "info" | "neutral" | "primary" | "success" | "warning" | "notification"}
            />
            </Card>
          )}
          {componentOverlay.component === "iconCircle" && (
            <Card
                borderNone
                borderRadius="rounded"
                dark={dark}
                htmlOptions={{style: {padding:"2px"}}}
                position="absolute"
                {...getPlacementProps(componentOverlay.placement, size)}
            >
              <IconCircle
                  dark={dark}
                  icon={componentOverlay.icon}
                  size="xxs"
                  variant={componentOverlay.variant as "default" | "royal" | "blue" | "purple" | "teal" | "red" | "yellow" | "orange" | "green"}
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
                  className={grayscale ? "grayscale" : ""}
                  onError={handleError}
                  url={imageUrl}
              />
            )}
          </div>
          {status && (
            <OnlineStatus
                dark={dark}
                position="absolute"
                size={onlineStatusSize}
                status={status}
                {...onlineStatusPositionProps}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Avatar
