import React, { useCallback, useMemo, useState } from "react"
import classnames from "classnames"

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props"
import { globalProps } from "../utilities/globalProps"

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import CircleIconButton from '../pb_circle_icon_button/_circle_icon_button'
import colors from '../tokens/exports/_colors.module.scss'
import Flex from '../pb_flex/_flex'
import Icon from '../pb_icon/_icon'
import PbReactPopover from '../pb_popover/_popover'
import TextInput from '../pb_text_input/_text_input'
import { GenericObject } from "../types"
import { getAllIcons } from "../utilities/icons/allicons"

type PassphraseProps = {
  aria?: { [key: string]: string },
  confirmation?: boolean,
  className?: string,
  data?: GenericObject,
  dark?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  inputProps?: GenericObject,
  label?: string,
  onChange: (inputValue: string) => void,
  requiredIndicator?: boolean,
  showTipsBelow?: "always" | "xs" | "sm" | "md" | "lg" | "xl",
  tips?: Array<string>,
  uncontrolled?: boolean,
  value: string,
}

const Passphrase = (props: PassphraseProps): React.ReactElement => {
  const {
    aria = {},
    className,
    confirmation = false,
    data = {},
    dark = false,
    htmlOptions = {},
    id,
    inputProps = {},
    label = confirmation ? "Confirm Passphrase" : "Passphrase",
    onChange = () => undefined,
    requiredIndicator = false,
    showTipsBelow = "always",
    tips = [],
    uncontrolled = false,
    value = "",
  } = props

  const [uncontrolledValue, setUncontrolledValue] = useState("")
  const [showPopover, setShowPopover] = useState(false)
  const [showPassphrase, setShowPassphrase] = useState(false)

  const handleChange = useCallback(
    (e) => (uncontrolled ? setUncontrolledValue(e.target.value) : onChange(e)),
    [uncontrolled, onChange]
  )

  const displayValue = useMemo(
    () => (uncontrolled ? uncontrolledValue : value),
    [value, uncontrolledValue, uncontrolled]
  )

  const toggleShowPopover = () => setShowPopover(!showPopover)
  const handleShouldClosePopover = (shouldClosePopover: boolean) => {
    setShowPopover(!shouldClosePopover)
  }

  const toggleShowPassphrase = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setShowPassphrase(!showPassphrase)
  }

  const tipClass = classnames(
    "passphrase-popover",
    showTipsBelow === "always" ? null : `show-below-${showTipsBelow}`
  )

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss("pb_passphrase"),
    globalProps(props),
    className
  )
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const popoverReference = (
    <CircleIconButton
        className={tipClass}
        dark={dark}
        icon="info-circle"
        onClick={toggleShowPopover}
        variant="link"
    />
  )

  const shieldIcon = getAllIcons()["shieldCheck"]
  const eyeIcon = getAllIcons()["eye"]
  const hasLabel = label && label !== ""

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <label>
        <Flex
            align="baseline"
            {...(hasLabel ? { marginBottom: "xs" } : {})}
        >
          {hasLabel && (requiredIndicator ? (
            <Caption
                className="passphrase-label"
            >
              {label} <span style={{ color: `${colors.error}` }}>*</span>
            </Caption>
          ) : (
            <Caption
                className="passphrase-label"
                text={label}
            />
          ))}
          {tips.length > 0 && !confirmation &&
            <PbReactPopover
                className="passphrase-tips"
                closeOnClick="outside"
                placement="right"
                reference={popoverReference}
                shouldClosePopover={handleShouldClosePopover}
                show={showPopover}
            >
              <Flex
                  align="center"
                  orientation="column"
              >
                <Caption
                    marginBottom="xs"
                    text="Tips for a good passphrase"
                />
                <div>
                  {tips.map((tip, i) => (
                    <Caption
                        key={i}
                        marginBottom="xs"
                        size="xs"
                    >
                      <Icon
                          className="svg-inline--fa"
                          customIcon={shieldIcon.icon as unknown as { [key: string]: SVGElement }}
                          marginRight="xs"
                      />
                      {tip}
                    </Caption>
                  ))}
                </div>
              </Flex>
            </PbReactPopover>
          }
        </Flex>
        <div className="passphrase-text-input-wrapper">
          <TextInput
              className="passphrase-text-input"
              dark={dark}
              marginBottom="xs"
              onChange={handleChange}
              placeholder="Enter a passphrase..."
              type={showPassphrase ? "text" : "password"}
              value={displayValue}
              {...inputProps}
          />
          <span
              className="show-passphrase-icon"
              onClick={toggleShowPassphrase}
          >
            <Body
                className={showPassphrase ? "hide-icon" : ""}
                color="light"
                dark={dark}
            >
              <Icon icon="eye-slash" />
            </Body>
            <Body
                className={showPassphrase ? "" : "hide-icon"}
                color="light"
                dark={dark}
            >
            <Icon  
                className="svg-inline--fa"
                customIcon={eyeIcon.icon as unknown as { [key: string]: SVGElement }}
            />
            </Body>
          </span>
        </div>
      </label>
    </div>
  );
};

export default Passphrase;
