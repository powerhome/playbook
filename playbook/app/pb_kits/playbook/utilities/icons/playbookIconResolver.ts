import iconAliasesJson from "@powerhome/playbook-icons/aliases.json";
import playbookIconPathIndex from "./generated/playbookIconPathIndex";

const iconAliases = iconAliasesJson.aliases || {};
const aliasCache = new Map<string, string>();
const availabilityCache = new Map<string, boolean>();
const svgMarkupCache = new Map<string, string | null>();
const inflightSvgRequests = new Map<string, Promise<string | null>>();

declare global {
  interface Window {
    PB_ICON_BASE_URL?: string
  }
}

const isJsdom = () => {
  return typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom");
};

const buildPlaybookIconClass = (iconName: string) => {
  // The published Playbook icon CSS uses legacy `playbook-*` selectors to apply the
  // shared pseudo-element layout styles, while the per-icon mask rules live under
  // `iconoir-*`. We need both classes for the stylesheet to render an icon.
  return `playbook-${iconName} iconoir-${iconName}`;
};

const getMaskValue = (styles: CSSStyleDeclaration) => {
  return styles.getPropertyValue("mask-image") || styles.getPropertyValue("-webkit-mask-image");
};

const hasRenderedPlaybookIconClass = (iconName: string) => {
  if (typeof document === "undefined" || typeof window === "undefined") return false;
  if (isJsdom() && !(window.getComputedStyle as any)?._isMockFunction) return false;

  const probe = document.createElement("span");
  probe.className = buildPlaybookIconClass(iconName);
  probe.style.position = "absolute";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";

  document.body.appendChild(probe);

  try {
    const beforeStyles = window.getComputedStyle(probe, "::before");
    const maskValue = getMaskValue(beforeStyles).trim();
    const contentValue = beforeStyles.getPropertyValue("content").trim();

    return contentValue !== "none" && contentValue !== "" && maskValue !== "none" && maskValue !== "";
  } catch (_error) {
    return false;
  } finally {
    document.body.removeChild(probe);
  }
};

const hasIconPath = (iconName: string) => {
  return Boolean(playbookIconPathIndex[iconName]);
};

const normalizeIconName = (iconName: string): string => {
  if (aliasCache.has(iconName)) return aliasCache.get(iconName) as string;

  const aliasValue = iconAliases[iconName as keyof typeof iconAliases] as string | string[] | undefined;
  let normalizedName = iconName;

  if (Array.isArray(aliasValue)) {
    normalizedName = aliasValue.find((candidate: string) => hasIconPath(candidate)) || aliasValue[0] || iconName;
  } else if (typeof aliasValue === "string") {
    normalizedName = aliasValue;
  }

  aliasCache.set(iconName, normalizedName);

  return normalizedName;
};

const joinUrlSegments = (basePath: string, relativePath: string) => {
  const normalizedBasePath = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  return `${normalizedBasePath}/${relativePath}`;
};

export const resolvePlaybookIconName = (iconName: string): string => {
  return normalizeIconName(iconName);
};

export const getPlaybookIconClassName = (iconName: string): string => {
  return buildPlaybookIconClass(normalizeIconName(iconName));
};

export const getPlaybookIconRelativePath = (iconName: string): string | null => {
  const normalizedName = normalizeIconName(iconName);
  return playbookIconPathIndex[normalizedName] || null;
};

export const getPlaybookIconBaseUrl = (): string => {
  if (typeof window !== "undefined" && window.PB_ICON_BASE_URL) return window.PB_ICON_BASE_URL;
  return "/playbook/icons";
};

export const getPlaybookIconRequestUrl = (iconName: string): string | null => {
  const normalizedName = resolvePlaybookIconName(iconName);
  if (!getPlaybookIconRelativePath(normalizedName)) return null;

  return joinUrlSegments(getPlaybookIconBaseUrl(), `${normalizedName}.svg`);
};

export const supportsPlaybookIconFetch = (iconName: string): boolean => {
  if (typeof window === "undefined" || typeof fetch !== "function" || isJsdom()) return false;
  return Boolean(getPlaybookIconRelativePath(iconName));
};

export const loadPlaybookIconSvg = async (iconName: string): Promise<string | null> => {
  const requestUrl = getPlaybookIconRequestUrl(iconName);
  if (!requestUrl) return null;

  if (svgMarkupCache.has(requestUrl)) return svgMarkupCache.get(requestUrl) as string | null;
  if (inflightSvgRequests.has(requestUrl)) return inflightSvgRequests.get(requestUrl) as Promise<string | null>;

  const request = fetch(requestUrl)
    .then((response) => {
      if (!response.ok) return null;
      return response.text();
    })
    .then((markup) => {
      svgMarkupCache.set(requestUrl, markup);
      inflightSvgRequests.delete(requestUrl);
      return markup;
    })
    .catch(() => {
      svgMarkupCache.set(requestUrl, null);
      inflightSvgRequests.delete(requestUrl);
      return null;
    });

  inflightSvgRequests.set(requestUrl, request);
  return request;
};

export const supportsPlaybookIcon = (iconName: string): boolean => {
  const normalizedName = normalizeIconName(iconName);

  if (availabilityCache.has(normalizedName)) return availabilityCache.get(normalizedName) as boolean;

  const isSupported = hasRenderedPlaybookIconClass(normalizedName);
  availabilityCache.set(normalizedName, isSupported);

  return isSupported;
};

export const resetPlaybookIconResolverCache = () => {
  aliasCache.clear();
  availabilityCache.clear();
  svgMarkupCache.clear();
  inflightSvgRequests.clear();
};
