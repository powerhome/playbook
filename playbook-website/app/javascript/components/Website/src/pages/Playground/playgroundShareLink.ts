import { sanitizeInstances } from "./playgroundStorage";
import type { BuilderInstance } from "./types";

const SHARE_PARAM = "state";

const utf8ToBase64Url = (value: string): string => {
  const utf8Bytes = encodeURIComponent(value).replace(
    /%([0-9A-F]{2})/g,
    (_match, hex) => String.fromCharCode(parseInt(hex, 16)),
  );

  return window
    .btoa(utf8Bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const base64UrlToUtf8 = (value: string): string => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = window.atob(padded);

  return decodeURIComponent(
    Array.from(binary)
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join(""),
  );
};

export const buildPlaygroundShareUrl = (
  instances: BuilderInstance[],
): string => {
  const encoded = utf8ToBase64Url(JSON.stringify(instances));
  const url = new URL(window.location.href);

  url.search = "";
  url.searchParams.set(SHARE_PARAM, encoded);

  return url.toString();
};

export type PlaygroundShareReadResult =
  | { status: "ok"; instances: BuilderInstance[] }
  | { status: "invalid" }
  | { status: "none" };

export const readPlaygroundShareState = (
  validKitNames: Set<string>,
): PlaygroundShareReadResult => {
  const encoded = new URLSearchParams(window.location.search).get(
    SHARE_PARAM,
  );
  if (!encoded) return { status: "none" };

  try {
    const parsed = JSON.parse(base64UrlToUtf8(encoded));
    const instances = sanitizeInstances(parsed, validKitNames);
    if (instances.length === 0) return { status: "invalid" };

    return { status: "ok", instances };
  } catch {
    return { status: "invalid" };
  }
};

export const clearPlaygroundShareParam = (): void => {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(SHARE_PARAM)) return;

  url.searchParams.delete(SHARE_PARAM);
  window.history.replaceState(window.history.state, "", url.toString());
};
