import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Title from '../pb_title/_title'

type CurrencyProps = {
  abbreviate?: boolean,
  align?: 'center' | 'left' | 'right',
  amount: string | number,
  aria?: {[key:string]:string},
  className?: string,
  dark?: boolean,
  data?: {[key:string]:string},
  decimals?: 'default' | 'matching',
  emphasized?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  label?: string,
  nullDisplay?: string,
  size?: 'sm' | 'md' | 'lg',
  symbol?: string,
  variant?: 'default' | 'light' | 'bold',
  unit?: string,
  unstyled?: boolean,
  commaSeparator?: boolean,
}

const sizes: {lg: 1, md: 3, sm: 4} = {
  lg: 1,
  md: 3,
  sm: 4,
}

const Currency = (props: CurrencyProps): React.ReactElement => {
  const {
    abbreviate = false,
    align = 'left',
    aria = {},
    amount,
    data = {},
    decimals = 'default',
    emphasized = true,
    htmlOptions = {},
    id,
    unit,
    className,
    label = '',
    nullDisplay = '',
    size = 'sm',
    symbol = '$',
    variant = 'default',
    dark = false,
    unstyled = false,
    commaSeparator = false,
  } = props

  // Convert numeric input to string format
  const convertAmount = (input: string | number): string => {
    if (typeof input === 'number') {
      return input.toFixed(2)
    }
    return input
  }

  const currencyAmount = convertAmount(amount)

  const emphasizedClass = emphasized ? '' : '_deemphasized'

  let variantClass
  if (variant === 'light') {
    variantClass = '_light'
  } else if (variant === 'bold') {
    variantClass = '_bold'
  }

  const [whole, decimal = '00'] = currencyAmount.split('.')
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_currency_kit', align, size),
    globalProps(props),
    className
  )

  const getFormattedNumber = (input: number | any) => new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(input)

  type AbbrType = 'amount' | 'unit'

  const getAbbreviatedValue = (abbrType: AbbrType) => {
    const num = `${getFormattedNumber(whole.split(',').join(''))}`,
      isAmount = abbrType === 'amount',
      isUnit =  abbrType === 'unit'
    return isAmount ? num.slice(0, -1) : isUnit ? num.slice(-1) : ''
  }

  const getMatchingDecimalAmount = decimals === "matching" ? currencyAmount : whole
  const getMatchingDecimalValue = decimals === "matching" ? '' : `.${decimal}`

  const formatAmount = (amount: string) => {
    if (!commaSeparator) return amount;

    const [wholePart, decimalPart] = amount.split('.');
    const formattedWhole = new Intl.NumberFormat('en-US').format(parseInt(wholePart));
    return decimalPart ? `${formattedWhole}.${decimalPart}` : formattedWhole;
  }

  const swapNegative = size === "sm" && symbol !== ""
  const handleNegative = currencyAmount.startsWith("-") && swapNegative ? "-" : ""
  const getAbsoluteAmount = (amountString: string) => amountString.replace(/^-/,'')
  const getAbbrOrFormatAmount = abbreviate ? getAbbreviatedValue('amount') : formatAmount(getMatchingDecimalAmount)
  const getAmount = swapNegative ? getAbsoluteAmount(getAbbrOrFormatAmount) : getAbbrOrFormatAmount
  const getAbbreviation = abbreviate ? getAbbreviatedValue('unit') : null
  const getDecimalValue = abbreviate ? '' : getMatchingDecimalValue

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <Caption dark={dark}>{label}</Caption>
      <div className={`pb_currency_wrapper${variantClass || emphasizedClass}`}>
        {unstyled ? (
          nullDisplay && !amount ? (
            <div>{nullDisplay}</div>
          ) : (
            <>
              <div>{handleNegative}{symbol}</div>
              <div>{getAmount}</div>
              <div>
                {getAbbreviation}
                {unit ? unit : getDecimalValue}
              </div>
            </>
          )
        ) : (
          nullDisplay && !amount ? (
            <Title
                className="pb_currency_value"
                dark={dark}
                size={sizes[size]}
          >
            {nullDisplay}
          </Title>
          ) : (
            <>
              <Body
                  className="dollar_sign"
                  color="light"
                  dark={dark}
              >
                {handleNegative}{symbol}
              </Body>

              <Title
                  className="pb_currency_value"
                  dark={dark}
                  size={sizes[size]}
              >
                {getAmount}
              </Title>

              <Body
                  className="unit"
                  color="light"
                  dark={dark}
              >
                {getAbbreviation}
                {unit ? unit : getDecimalValue}
              </Body>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default Currency
