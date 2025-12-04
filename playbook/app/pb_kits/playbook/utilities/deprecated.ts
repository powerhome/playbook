/**
 * Tracks which deprecated kits have already logged warnings in this session
 * to ensure we only log once per page load per kit
 */
const warnedKits = new Set<string>();

/**
 * Logs a deprecation warning for a Playbook kit
 * - Only logs once per kit per page load (prevents spam on re-renders)
 * - Only logs in development mode (not in production or test environments)
 * 
 * @param kitName - The name of the deprecated kit (e.g., 'BarGraph', 'RichTextEditor')
 * @param message - Optional custom deprecation message. If not provided, uses a default message.
 * 
 * @example
 * // In your kit component:
 * useEffect(() => {
 *   deprecatedKitWarning('BarGraph');
 * }, []);
 */
export const deprecatedKitWarning = (
  kitName: string,
  message?: string
): void => {
  // Only run in development mode, not in production or test
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    return;
  }

  // Only warn once per kit per page load
  if (warnedKits.has(kitName)) {
    return;
  }

  // Mark this kit as warned
  warnedKits.add(kitName);

  // Log the warning
  const defaultMessage = `[PLAYBOOK] The "${kitName}" kit is deprecated and will be removed in a future version. Please migrate to the recommended alternative.`;
  
  console.warn(message || defaultMessage);
};

/**
 * Resets the warned kits tracker (useful for testing)
 * @internal
 */
export const resetDeprecationWarnings = (): void => {
  warnedKits.clear();
};
