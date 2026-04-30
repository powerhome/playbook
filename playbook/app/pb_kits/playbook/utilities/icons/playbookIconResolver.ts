import iconAliasesJson from "@powerhome/playbook-icons/aliases.json";

const iconAliases = iconAliasesJson.aliases || {};
const aliasCache = new Map<string, string>();
const availabilityCache = new Map<string, boolean>();

const normalizeIconName = (iconName: string): string => {
  if (aliasCache.has(iconName)) return aliasCache.get(iconName) as string;

  const normalizedName = iconAliases[iconName as keyof typeof iconAliases] || iconName;
  aliasCache.set(iconName, normalizedName);

  return normalizedName;
};

const buildPlaybookIconClass = (iconName: string) => `playbook-${iconName}`;

const getMaskValue = (styles: CSSStyleDeclaration) => {
  return styles.getPropertyValue("mask-image") || styles.getPropertyValue("-webkit-mask-image");
};

const hasRenderedPlaybookIconClass = (iconName: string) => {
  if (typeof document === "undefined" || typeof window === "undefined") return false;
  if (navigator?.userAgent?.includes("jsdom") && !(window.getComputedStyle as any)?._isMockFunction) return false;

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

export const resolvePlaybookIconName = (iconName: string): string => {
  return normalizeIconName(iconName);
};

export const getPlaybookIconClassName = (iconName: string): string => {
  return buildPlaybookIconClass(normalizeIconName(iconName));
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
};
