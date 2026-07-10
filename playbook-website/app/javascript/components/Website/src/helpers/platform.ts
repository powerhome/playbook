const PLATFORM_STORAGE_KEY = "playbook-platform";
export const VALID_PLATFORMS = ["react", "rails", "swift"] as const;
export const DEFAULT_PLATFORM = "rails" as const;

export type Platform = (typeof VALID_PLATFORMS)[number];

export const isValidPlatform = (
  value: string | null | undefined,
): value is Platform => VALID_PLATFORMS.includes(value as Platform);

export const readStoredPlatform = (): Platform | null => {
  try {
    const stored = localStorage.getItem(PLATFORM_STORAGE_KEY);
    return isValidPlatform(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const writeStoredPlatform = (platform: string) => {
  if (!isValidPlatform(platform)) return;
  try {
    localStorage.setItem(PLATFORM_STORAGE_KEY, platform);
  } catch {
    // Ignore quota / private-mode failures
  }
};

export const getPlatformFromPath = (pathname: string): Platform | null => {
  const match = pathname.match(/\/(react|rails|swift)$/)?.[1];
  return isValidPlatform(match) ? match : null;
};

export const getPlatformFromSearch = (search: string): Platform | null => {
  const type = new URLSearchParams(search).get("type");
  return isValidPlatform(type) ? type : null;
};

export const resolvePlatform = (
  pathname: string,
  search: string,
  loaderType?: string,
): string =>
  getPlatformFromPath(pathname) ||
  getPlatformFromSearch(search) ||
  readStoredPlatform() ||
  (isValidPlatform(loaderType) ? loaderType : null) ||
  DEFAULT_PLATFORM;

export const syncStoredPlatformFromLocation = (
  pathname: string,
  search: string,
) => {
  const explicit =
    getPlatformFromPath(pathname) || getPlatformFromSearch(search);
  if (explicit) writeStoredPlatform(explicit);
};
