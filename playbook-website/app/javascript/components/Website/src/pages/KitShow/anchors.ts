// Main scroll column for the website shell (`website_new.scss` / `LayoutRight`).
export const MAIN_CONTENT_SCROLL_SELECTOR = ".pb--page--content--main";

export function hashForAnchor(id: string): string {
  return `#${encodeURIComponent(id)}`;
}

export function anchorIdFromLocationHash(): string {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return "";

  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

export function setLocationHash(id: string) {
  const nextHash = hashForAnchor(id);
  if (window.location.hash === nextHash) return;

  window.history.pushState(null, "", nextHash);
}

export function urlForAnchor(id: string): string {
  const url = new URL(window.location.href);
  url.hash = hashForAnchor(id);

  return url.toString();
}

export function scrollToAnchor(id: string, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id);
  if (!element) return false;

  const scrollContainer = document.querySelector<HTMLElement>(
    MAIN_CONTENT_SCROLL_SELECTOR,
  );

  if (scrollContainer) {
    const elementTop = element.getBoundingClientRect().top;
    const containerTop = scrollContainer.getBoundingClientRect().top;
    const nextTop = scrollContainer.scrollTop + elementTop - containerTop;

    scrollContainer.scrollTo({ top: nextTop, behavior });
  } else {
    element.scrollIntoView({ behavior, block: "start" });
  }

  return true;
}
