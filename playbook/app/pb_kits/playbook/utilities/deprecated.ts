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

  // In browser environments, check if we're on localhost/dev
  if (typeof window !== 'undefined') {
    const hostname = window.location?.hostname;
    const isLocalDev = hostname === 'localhost' || 
                       hostname === '127.0.0.1' ||
                       hostname?.endsWith('.local') ||
                       hostname?.includes('local.') ||
                       !hostname; // file:// protocol
    
    // Only show warnings in local development
    if (!isLocalDev) {
      return;
    }
  }

  // Only warn once per kit per page load
  if (warnedKits.has(kitName)) {
    return;
  }

  // Mark this kit as warned
  warnedKits.add(kitName);

  // Build the warning message
  const baseMessage = `PLAYBOOK DEPRECATION WARNING
  ----------------------------
  The "${kitName}" kit is deprecated and will be removed in a future version.`;
  
  const fullMessage = message 
    ? `${baseMessage} ${message}`
    : `${baseMessage} Please migrate to the recommended alternative
 
  `;
  
  console.warn(fullMessage);
};

/**
 * Resets the warned kits tracker (useful for testing)
 * @internal
 */
export const resetDeprecationWarnings = (): void => {
  warnedKits.clear();
};
