import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'

type BackgroundProps = {
  alt?: string,
  aria?: {[key: string]: string},
  backgroundColor?: ResponsiveProp<string> | 'gradient' |
  'dark' |'light' | 'white' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary' | 'shadow' |
  'category_1' | 'category_2' | 'category_3' | 'category_4' | 'category_5' | 'category_6' | 'category_7' |
  'category_8' | 'category_9' | 'category_10' | 'category_11' | 'category_12' | 'category_13' | 'category_14' |
  'category_15' | 'category_16' | 'category_17' | 'category_18' | 'category_19' | 'category_20' | 'category_21' |
  'text_lt_default' | 'text_lt_light' | 'text_lt_lighter' | 'text_dk_default' | 'text_dk_light' | 'text_dk_lighter' |
  'card_light' | 'card_dark' | 'data_1' | 'data_2' | 'data_3' | 'data_4' | 'data_5' | 'data_6' | 'data_7' | 'data_8' |
  'border_light' | 'border_dark' | 'success_secondary' | 'error_secondary' | 'info_secondary' | 'warning_secondary' |
  'neutral_secondary' | 'primary_secondary' | 'success_subtle' | 'warning_subtle' | 'error_subtle' | 'info_subtle' | 'neutral_subtle',
  backgroundSize?: ResponsiveProp<string> | 'auto' | 'cover' | 'contain',
  backgroundPosition?: ResponsiveProp<string> | string,
  backgroundRepeat?: ResponsiveProp<string> | 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'space' | 'round' | 'initial' | 'inherit',
  imageUrl?: ResponsiveProp<string> | string,
  children?: React.ReactChild[] | React.ReactNode,
  className?: string,
  customColor?: string,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'tr' | 'th' | 'td' | 'thead' | 'col',
  transition?: 'fade' | 'blur' | 'scale',
} & GlobalProps

type ResponsiveProp<T> = T | {
  xs?: T,
  sm?: T,
  md?: T,
  lg?: T,
  xl?: T,
  default?: T
};

const breakpoints: {[key: string]: string} = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 991px)',
  lg: '(min-width: 992px) and (max-width: 1199px)',
  xl: '(min-width: 1200px)',
};

const getResponsiveValue = <T extends string | undefined>(prop: ResponsiveProp<T> | undefined): T => {
  if (typeof prop === 'string') {
    return prop;
  }

  // Check for breakpoints
  for (const [bp, value] of Object.entries(prop || {})) {
    if (bp !== 'default' && window.matchMedia(breakpoints[bp]).matches) {
      return value as T;
    }
  }

  // Return the default value if provided, otherwise undefined
  return prop?.default || undefined;
};

const Background = (props: BackgroundProps): React.ReactElement => {
  const {
    alt = '',
    aria = {},
    backgroundColor = 'light',
    backgroundPosition = '',
    backgroundRepeat = 'initial',
    backgroundSize = 'cover',
    children,
    className,
    customColor,
    data = {},
    htmlOptions = {},
    id,
    imageUrl = '',
    tag = 'div',
    transition = '',
  } = props
  
  const [responsiveProps, setResponsiveProps] = useState({
    backgroundSize: getResponsiveValue(backgroundSize),
    backgroundPosition: getResponsiveValue(backgroundPosition),
    backgroundRepeat: getResponsiveValue(backgroundRepeat),
    backgroundColor: getResponsiveValue(backgroundColor),
    imageUrl: getResponsiveValue(imageUrl),
  });

  // Update responsive values on window resize.
  useEffect(() => {
    const updateResponsiveProps = () => {
      setResponsiveProps({
        backgroundSize: getResponsiveValue(props.backgroundSize),
        backgroundPosition: getResponsiveValue(props.backgroundPosition),
        backgroundRepeat: getResponsiveValue(props.backgroundRepeat),
        backgroundColor: getResponsiveValue(props.backgroundColor),
        imageUrl: getResponsiveValue(props.imageUrl),
      });
    };
    window.addEventListener('resize', updateResponsiveProps);
    return () => window.removeEventListener('resize', updateResponsiveProps);
  }, [props]);


  // Extract currently applicable responsive values.
  const {
    backgroundColor: resBackgroundColor,
    backgroundPosition: resBackgroundPosition,
    backgroundRepeat: resBackgroundRepeat,
    backgroundSize: resBackgroundSize,
    imageUrl: resImageUrl,
  } = responsiveProps;


  // Build CSS classes and styles using responsive values.
  const classes = classnames(
    buildCss('pb_background_kit'),
    'lazyload',
    globalProps(props),
    transition,
    {
      [`pb_background_color_${resBackgroundColor}`]: resBackgroundColor && !customColor,
      [`pb_background_custom_color`]: !!customColor,
    },
    className
  );

  const backgroundStyle = {
    backgroundImage: resImageUrl ? `url(${resImageUrl})` : undefined,
    backgroundRepeat: resBackgroundRepeat || undefined,
    backgroundSize: resBackgroundSize || undefined,
    backgroundPosition: resBackgroundPosition || undefined,
    backgroundColor: customColor || undefined,
  };

  const Tag: React.ReactElement | any = `${tag}`;
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  
  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        alt={alt}
        className={classes}
        id={id}
        style={backgroundStyle}
    >
      {children}
    </Tag>
  
  )
}

export default Background
