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
    componentOverlay: {[key: string]: any},
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
  
  const getPlacementProps = (placement: string) => {
    let placementMapping: any;
  
    if (size === 'xxs') {
      placementMapping = {
        'top-right': { top: 'xs', right: 'xs' },
        'bottom-left': { bottom: 'xs', left: 'xs' },
        'top-left': { top: 'xs', left: 'xs' },
        'bottom-right': { bottom: 'xs', right: 'xs' },
      };
    } else if (size === 'xs') {
      placementMapping = {
        'top-right': { top: 'xs', right: 'xs' },
        'bottom-left': { bottom: 'xs', left: 'xs' },
        'top-left': { top: 'xs', left: 'xs' },
        'bottom-right': { bottom: 'xs', right: 'xs' },
      };
    } else if (size === 'sm') {
      placementMapping = {
        'top-right': { top: '0', right: 'xs' },
        'bottom-left': { bottom: '0', left: 'xs' },
        'top-left': { top: '0', left: 'xs' },
        'bottom-right': { bottom: '0', right: 'xs' },
      };
    } else if (size === 'md') {
      placementMapping = {
        'top-right': { top: '0', right: '0' },
        'bottom-left': { bottom: '0', left: '0' },
        'top-left': { top: '0', left: '0' },
        'bottom-right': { bottom: '0', right: '0' },
      };
    } else if (size === 'lg') {
      placementMapping = {
        'top-right': { top: '0', right: '0' },
        'bottom-left': { bottom: '0', left: '0' },
        'top-left': { top: '0', left: '0' },
        'bottom-right': { bottom: '0', right: '0' },
      };
    } else if (size === 'xl') {
      placementMapping = {
        'top-right': { top: { value: "xxs", inset: true }, right: { value: "xxs", inset: true } },
        'bottom-left': { bottom: { value: "xxs", inset: true }, left: { value: "xxs", inset: true } },
        'top-left': { top: { value: "xxs", inset: true }, left: { value: "xxs", inset: true } },
        'bottom-right': { bottom: { value: "xxs", inset: true }, right: { value: "xxs", inset: true } },
      };
    }
  
    // Return the specific placement mapping or an empty object if placement is not found
    return placementMapping[placement] || {};
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
                 padding="none"
                 position="absolute"
                 {...getPlacementProps(componentOverlay.placement)}
             >
    
            <Badge
                rounded
                text={componentOverlay.text}
                variant={componentOverlay.variant}
              
            />
            </Card>
          )}
          {componentOverlay.component === "iconCircle" && (
            <Card
                borderNone
                borderRadius="rounded"
                htmlOptions={{style: {padding:"2px"}}}
                position="absolute"
                {...getPlacementProps(componentOverlay.placement)}
            >
              <IconCircle
                  icon={componentOverlay.icon}
                  size="xxs"
                  variant={componentOverlay.variant}
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
