const PLATFORM_STORAGE_KEY = "playbook-platform";
export const VALID_PLATFORMS = ["react", "rails"] as const;
export const DEFAULT_PLATFORM = "rails" as const;

export type Platform = (typeof VALID_PLATFORMS)[number];

export const isValidPlatform = (
  value: string | null | undefined,
): value is Platform => VALID_PLATFORMS.includes(value as Platform);

/** Map legacy swift platform requests to rails. */
export const normalizePlatform = (
  value: string | null | undefined,
): Platform | null => {
  if (value === "swift") return DEFAULT_PLATFORM;
  return isValidPlatform(value) ? value : null;
};

export const readStoredPlatform = (): Platform | null => {
  try {
    const stored = localStorage.getItem(PLATFORM_STORAGE_KEY);
    const normalized = normalizePlatform(stored);
    if (stored === "swift" && normalized) {
      localStorage.setItem(PLATFORM_STORAGE_KEY, normalized);
    }
    return normalized;
  } catch {
    return null;
  }
};

export const writeStoredPlatform = (platform: string) => {
  const normalized = normalizePlatform(platform);
  if (!normalized) return;
  try {
    localStorage.setItem(PLATFORM_STORAGE_KEY, normalized);
  } catch {
    // Ignore quota / private-mode failures
  }
};

export const getPlatformFromPath = (pathname: string): Platform | null => {
  const match = pathname.match(
    /^\/kits\/(?:advanced_table\/)?[^/]+\/(react|rails|swift)$/,
  )?.[1];
  return normalizePlatform(match);
};

export const getPlatformFromSearch = (search: string): Platform | null => {
  const type = new URLSearchParams(search).get("type");
  return normalizePlatform(type);
};

export const resolvePlatform = (
  pathname: string,
  search: string,
  loaderType?: string,
): Platform =>
  getPlatformFromPath(pathname) ||
  getPlatformFromSearch(search) ||
  readStoredPlatform() ||
  normalizePlatform(loaderType) ||
  DEFAULT_PLATFORM;

export const syncStoredPlatformFromLocation = (
  pathname: string,
  search: string,
) => {
  const explicit =
    getPlatformFromPath(pathname) || getPlatformFromSearch(search);
  if (explicit) writeStoredPlatform(explicit);
};

/** Rewrite legacy /swift kit URLs to /rails. Does not affect changelog/guides. */
export const rewriteLegacySwiftPath = (pathname: string): string | null => {
  if (
    /^\/kits\/[^/]+\/swift$/.test(pathname) ||
    /^\/kits\/advanced_table\/[^/]+\/swift$/.test(pathname)
  ) {
    return pathname.replace(/\/swift$/, `/${DEFAULT_PLATFORM}`);
  }
  return null;
};
