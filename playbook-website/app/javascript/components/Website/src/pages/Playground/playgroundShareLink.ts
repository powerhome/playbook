import {
  displayPropType,
  getAllPropDefinitionsWithGlobals,
  getConfiguredChildren,
} from "./kitUtils";
import { sanitizeInstances } from "./playgroundStorage";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "./types";

// This workspace's TypeScript (4.3.5) predates CompressionStream/
// DecompressionStream in the bundled DOM lib types, so declare them
// ourselves rather than bumping the shared tsconfig `lib` target.
declare const CompressionStream: any;
declare const DecompressionStream: any;

const SHARE_PARAM = "state";

// Format markers prefixed onto the encoded payload so a reader always knows
// how to decode it, regardless of which path the writer's browser took.
const FORMAT_GZIP = "g";
const FORMAT_PLAIN = "p";

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();

const supportsCompression = () =>
  typeof CompressionStream === "function" &&
  typeof DecompressionStream === "function";

const bytesToBase64Url = (bytes: Uint8Array): string => {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const base64UrlToBytes = (value: string): Uint8Array => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = window.atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const gzipCompress = async (text: string): Promise<Uint8Array> => {
  const stream = new Blob([utf8Encoder.encode(text)])
    .stream()
    .pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
};

const gzipDecompress = async (bytes: Uint8Array): Promise<string> => {
  const stream = new Blob([bytes])
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));
  return utf8Decoder.decode(await new Response(stream).arrayBuffer());
};

// A BuilderInstance carries every prop the kit schema defines (defaulted in
// at creation time — see createInstance/getInitialInstanceState), even
// though only the "enabled" ones affect rendering. Serializing that whole
// object bloats the share link with props nobody turned on. This compact
// form keeps only what's needed to reproduce the rendered result: enabled
// props (enabledProps itself is dropped and rebuilt from that key set on
// read), short field names, and omitted empty/null fields. On top of that,
// the JSON itself is gzip-compressed before it's base64url-encoded into the
// URL (falling back to plain base64url on browsers without
// Compression/DecompressionStream).
type CompactInstance = {
  id: string;
  k: string;
  c?: CompactInstance[];
  d?: string;
  p?: Record<string, unknown>;
  s?: string;
  x?: string;
};

const toCompactInstance = (instance: BuilderInstance): CompactInstance => {
  const enabledProps = Object.fromEntries(
    Object.entries(instance.props).filter(
      ([name]) => instance.enabledProps[name],
    ),
  );
  const compact: CompactInstance = { id: instance.id, k: instance.kitName };

  if (Object.keys(enabledProps).length > 0) compact.p = enabledProps;
  if (instance.structureMode) compact.s = instance.structureMode;
  if (instance.dataPresetKey) compact.d = instance.dataPresetKey;
  // codegen/preview prefer nested child instances over configuredChildren
  // whenever both are present (see getTemplateChildren / renderInstanceCode),
  // so it's dead weight once there are real children — including the wrap
  // feature's wrapper, which still carries createInstance's default
  // configuredChildren even though it's never actually used.
  if (instance.children.length > 0) {
    compact.c = instance.children.map(toCompactInstance);
  } else if (instance.configuredChildren) {
    compact.x = instance.configuredChildren;
  }

  return compact;
};

const isCompactInstance = (value: unknown): value is CompactInstance =>
  Boolean(value) &&
  typeof value === "object" &&
  typeof (value as Record<string, unknown>).id === "string" &&
  typeof (value as Record<string, unknown>).k === "string";

// Expands the compact wire shape back into something sanitizeInstances can
// validate — a pure format conversion, not a trust decision. Anything
// malformed here just fails that validation afterward.
const fromCompactInstance = (value: unknown): unknown => {
  if (!isCompactInstance(value)) return value;

  const props =
    value.p && typeof value.p === "object" ? value.p : ({} as Record<string, unknown>);
  const enabledProps = Object.fromEntries(
    Object.keys(props).map((name) => [name, true]),
  );

  return {
    id: value.id,
    kitName: value.k,
    structureMode: typeof value.s === "string" ? value.s : null,
    dataPresetKey: typeof value.d === "string" ? value.d : null,
    configuredChildren: typeof value.x === "string" ? value.x : null,
    props,
    enabledProps,
    children: Array.isArray(value.c) ? value.c.map(fromCompactInstance) : [],
  };
};

export const buildPlaygroundShareUrl = async (
  instances: BuilderInstance[],
): Promise<string> => {
  const compact = instances.map(toCompactInstance);
  const json = JSON.stringify(compact);
  const useGzip = supportsCompression();
  const bytes = useGzip
    ? await gzipCompress(json)
    : utf8Encoder.encode(json);
  const marker = useGzip ? FORMAT_GZIP : FORMAT_PLAIN;
  const encoded = marker + bytesToBase64Url(bytes);

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

// configuredChildren is always spliced as literal JSX/code (see
// renderInstanceCode / getTemplateChildren), so a user-typed value there is
// just as dangerous as __playgroundCode. But createInstance always fills it
// in with the kit's own default template (Card's placeholder text, Table's
// default JSX, etc. — see getConfiguredChildren), so most shared instances
// legitimately carry it even though nobody typed anything. Comparing
// against the kit's actual computed default (checking both call
// conventions used across this codebase — createInstance's implicit first
// preset, and the explicit-no-preset form structure-mode changes use)
// distinguishes that first-party config from a real edit.
const isDefaultConfiguredChildren = (
  kit: PlaygroundKit | undefined,
  structureMode: string | null,
  configuredChildren: string,
): boolean => {
  if (!kit) return false;

  return (
    configuredChildren === getConfiguredChildren(kit, structureMode) ||
    configuredChildren === getConfiguredChildren(kit, structureMode, null)
  );
};

// codeGeneration.ts's formatCodeValue splices a function-typed prop's value
// verbatim as raw code with no __playgroundCode wrapper required — a string
// value for an onClick-style prop IS the code that runs. Checked against the
// kit's real schema so this matches exactly what codegen is actually
// willing to treat as code.
const hasUnsafeCode = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  globalProps: Record<string, PropDefinition> | undefined,
): boolean =>
  instances.some((instance) => {
    const kit = kitsByName[instance.kitName];

    if (
      instance.configuredChildren &&
      !isDefaultConfiguredChildren(
        kit,
        instance.structureMode,
        instance.configuredChildren,
      )
    ) {
      return true;
    }

    const propDefinitions = getAllPropDefinitionsWithGlobals(kit, globalProps);

    const hasUnsafeProp = Object.entries(instance.props).some(
      ([name, value]) => {
        const type = displayPropType(propDefinitions[name]);
        const isFunctionTyped =
          type.includes("function") || type.includes("=>");
        if (isFunctionTyped && typeof value === "string" && value.trim()) {
          return true;
        }

        return containsUnsafeValue(value);
      },
    );

    return (
      hasUnsafeProp || hasUnsafeCode(instance.children, kitsByName, globalProps)
    );
  });

export type PlaygroundShareReadResult =
  | { status: "ok"; instances: BuilderInstance[] }
  | { status: "invalid" }
  | { status: "none" };

export const readPlaygroundShareState = async (
  validKitNames: Set<string>,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>,
): Promise<PlaygroundShareReadResult> => {
  const encoded = new URLSearchParams(window.location.search).get(
    SHARE_PARAM,
  );
  if (!encoded) return { status: "none" };

  try {
    const marker = encoded[0];
    const bytes = base64UrlToBytes(encoded.slice(1));
    const json =
      marker === FORMAT_GZIP
        ? await gzipDecompress(bytes)
        : utf8Decoder.decode(bytes);

    const parsed = JSON.parse(json);
    const expanded = Array.isArray(parsed)
      ? parsed.map(fromCompactInstance)
      : parsed;
    const instances = sanitizeInstances(expanded, validKitNames);
    if (
      instances.length === 0 ||
      hasUnsafeCode(instances, kitsByName, globalProps)
    ) {
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
