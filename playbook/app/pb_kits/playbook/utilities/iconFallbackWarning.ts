/**
 * Tracks which icons have already logged fallback warnings in this session
 * to ensure we only log once per page load per icon
 */
const warnedIcons = new Set<string>()

/**
 * Logs a warning when a Playbook icon falls back to Font Awesome
 * - Only logs once per icon per page load (prevents spam on re-renders)
 * - Only logs in local development (not in production, QA, or test environments)
 * 
 * @param iconName - The name of the icon that wasn't found in Playbook icons
 * 
 * @example
 * if (!PowerIcon) {
 *   warnFontAwesomeFallback('my-icon')
 * }
 */
export const warnFontAwesomeFallback = (iconName: string): void => {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
    return
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location?.hostname
    const isLocalDev = hostname === 'localhost' ||
                       hostname === '127.0.0.1' ||
                       hostname?.endsWith('.local') ||
                       hostname?.includes('local.') ||
                       !hostname
    
    if (!isLocalDev) {
      return
    }
  }

  if (warnedIcons.has(iconName)) {
    return
  }

  warnedIcons.add(iconName)

  console.warn(
    `[Playbook] Icon '${iconName}' not found in Playbook icons. ` +
    `Falling back to Font Awesome. ` +
    `Font Awesome will be removed from Nitro in the future. Please use Playbook Icons instead. See https://playbook.powerapp.cloud/playbook_icons for available icons.`
  )
}

/**
 * Resets the warned icons tracker (useful for testing)
 * @internal
 */
export const resetIconFallbackWarnings = (): void => {
  warnedIcons.clear()
}
