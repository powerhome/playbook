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

// `__playgroundCode` is an internal escape hatch (see PropControl.tsx and
// codeGeneration.ts) that lets a prop value carry a raw JS expression, which
// codegen splices verbatim into the source the react-live preview evaluates.
// That's fine for props a user typed into their own session, but a share
// link is untrusted cross-user input — allowing it through here would let a
// crafted link run arbitrary JS in whoever opens it. `__proto__` /
// `constructor` / `prototype` are blocked too as defense-in-depth against
// prototype pollution in anything that later merges these parsed objects.
const UNSAFE_KEYS = new Set([
  "__playgroundCode",
  "__proto__",
  "constructor",
  "prototype",
]);
const MAX_SCAN_DEPTH = 50;

const containsUnsafeValue = (value: unknown, depth = 0): boolean => {
  if (depth > MAX_SCAN_DEPTH) return true;

  if (Array.isArray(value)) {
    return value.some((item) => containsUnsafeValue(item, depth + 1));
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).some(
      ([key, entryValue]) =>
        UNSAFE_KEYS.has(key) || containsUnsafeValue(entryValue, depth + 1),
    );
  }

  return false;
};

const hasUnsafeProps = (instances: BuilderInstance[]): boolean =>
  instances.some(
    (instance) =>
      containsUnsafeValue(instance.props) ||
      hasUnsafeProps(instance.children),
  );

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
    if (instances.length === 0 || hasUnsafeProps(instances)) {
      return { status: "invalid" };
    }

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
