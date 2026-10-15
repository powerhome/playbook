export type PropsTabId = "kit" | "global" | "globalEvent"

type PropEntry = {
  platforms?: string[]
}

/**
 * Global Event Props are React-only and opt-in per kit via kit.schema.json.
 */
export const shouldShowGlobalEventPropsTab = (
  schema: { globalEventProps?: boolean } | null | undefined,
  platform: string
): boolean => Boolean(schema?.globalEventProps) && platform === "react"

export const filterKitPropsForPropsTab = (
  props: Record<string, PropEntry>,
  globalPropNames: string[],
  globalEventPropNames: string[],
  platform: string,
  optedIntoGlobalEventProps = false
): Record<string, PropEntry> => {
  const kitProps: Record<string, PropEntry> = {}

  for (const propName in props) {
    const prop = props[propName]
    const isGlobalProp = globalPropNames.includes(propName)
    const isGlobalEventProp =
      optedIntoGlobalEventProps && globalEventPropNames.includes(propName)
    const platforms = prop.platforms || []
    const isForPlatform =
      platforms.length === 0 || platforms.includes(platform)

    if (!isGlobalProp && !isGlobalEventProp && isForPlatform) {
      kitProps[propName] = prop
    }
  }

  return kitProps
}
