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
  // Skip in test environments (Jest sets NODE_ENV to 'test')
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
    return;
  }

  // Skip if production mode was set at build time
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
    return;
  }

  // Skip if this looks like a production build (minified, no sourcemaps in browser)
  // This helps catch cases where the package was built for production but consumed in dev
  if (typeof window !== 'undefined') {
    // Check for common production indicators
    const isMinified = !new Error().stack?.includes('.ts:') && !new Error().stack?.includes('.tsx:');
    // Allow warnings even in built packages when consumed locally (localhost)
    const isLocalhost = window.location?.hostname === 'localhost' || 
                        window.location?.hostname === '127.0.0.1' ||
                        window.location?.hostname === '';
    
    // Only skip if it's minified AND not on localhost
    if (isMinified && !isLocalhost) {
      return;
    }
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
