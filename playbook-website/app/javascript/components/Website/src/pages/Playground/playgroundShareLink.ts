import {
  displayPropType,
  getAllPropDefinitionsWithGlobals,
  getConfiguredChildren,
  getFirstPreset,
  getRuntimeProps,
  getStructureModeProps,
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
// `dangerouslySetInnerHTML` / `__html` are blocked as defense-in-depth too —
// the real fix for that specific vector is the prop-name allowlist below
// (buildHtmlProps forwards any key under `props.htmlOptions` straight onto
// the rendered DOM node), but this catches the shape wherever it appears.
const UNSAFE_KEYS = new Set([
  "__playgroundCode",
  "__proto__",
  "constructor",
  "prototype",
  "dangerouslySetInnerHTML",
  "__html",
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

// A JSX expression container (`{...}`) is the *only* way configuredChildren
// can turn into something codegen actually executes — plain markup with
// quoted string attributes just becomes inert React.createElement calls
// with string literals. So rather than reject anything that isn't the
// kit's exact default (which breaks the very common case of someone
// legitimately typing custom content into the "Children" editor — e.g.
// custom Table rows), only reject a bare `{` that isn't inside a quoted
// string. Mirrors the quote-tracking in codeGeneration.ts's
// findTopLevelJsxStart.
const containsBareCurlyBrace = (text: string): boolean => {
  let quote: "'" | "\"" | "`" | null = null;
  let escaped = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === "\"" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") return true;
  }

  return false;
};

// createInstance always fills configuredChildren in with the kit's own
// default template (Card's placeholder text, Table's default JSX, etc. —
// see getConfiguredChildren), so checking against that first (both call
// conventions used across this codebase — createInstance's implicit first
// preset, and the explicit-no-preset form structure-mode changes use)
// covers the common untouched case for free. Anything else falls through
// to the curly-brace check above.
const isSafeConfiguredChildren = (
  kit: PlaygroundKit | undefined,
  structureMode: string | null,
  configuredChildren: string,
): boolean => {
  if (
    kit &&
    (configuredChildren === getConfiguredChildren(kit, structureMode) ||
      configuredChildren === getConfiguredChildren(kit, structureMode, null))
  ) {
    return true;
  }

  return !containsBareCurlyBrace(configuredChildren);
};

// Every prop name this kit's own config could legitimately mark "enabled"
// on an instance: real schema props, plus whatever the kit's data
// presets/structure modes/first preset inject as runtime props (see
// createInstance/getInitialInstanceState — those go through the same
// enabledProps=true path as a user-toggled prop, so they're legitimate even
// though they aren't always literally in kit_schema.props). Nothing outside
// this set — most importantly framework-level escape hatches like
// `htmlOptions`, `className`, `data`, `aria` — is ever a real prop a kit
// exposes, so any of those showing up in a share payload is exactly the
// forged-key attack this allowlist exists to catch, not a legitimate share.
const getKnownPropNames = (
  kit: PlaygroundKit | undefined,
  instance: BuilderInstance,
  globalProps: Record<string, PropDefinition> | undefined,
): Set<string> => {
  const names = new Set(
    Object.keys(getAllPropDefinitionsWithGlobals(kit, globalProps)),
  );

  Object.keys(getRuntimeProps(kit, instance.dataPresetKey)).forEach((name) =>
    names.add(name),
  );
  Object.keys(getStructureModeProps(kit, instance.structureMode)).forEach(
    (name) => names.add(name),
  );
  Object.keys((kit && getFirstPreset(kit)?.props) || {}).forEach((name) =>
    names.add(name),
  );

  return names;
};

// Unlike configuredChildren, a function-typed prop's value is *supposed* to
// be executable code (an onClick/onSortChange-style callback) — there's no
// syntactic tell that separates a legitimate demo callback from a
// malicious one, since valid JS doesn't need braces at all
// (`() => fetch('evil')`). So this can't be validated as "safe" the way
// configuredChildren can; it can only be trusted from the same session
// that typed it, never from a share link. Rejecting the *entire* share
// over one such prop (or one forged prop name, or one non-default
// configuredChildren) is also too blunt — most of a shared canvas is
// still perfectly renderable JSON data. So this sanitizes in place:
// strip exactly the unsafe piece and keep everything else, rather than
// failing the whole import.
const sanitizeShareConfiguredChildren = (
  instance: BuilderInstance,
  kit: PlaygroundKit | undefined,
): string | null => {
  if (!instance.configuredChildren) return instance.configuredChildren;

  if (
    isSafeConfiguredChildren(
      kit,
      instance.structureMode,
      instance.configuredChildren,
    )
  ) {
    return instance.configuredChildren;
  }

  // eslint-disable-next-line no-console
  console.warn(
    `[playground share] stripped: configuredChildren on kit "${instance.kitName}" contained a JSX expression ("{...}") outside a quoted string — falling back to the kit's default instead of rejecting the whole share.`,
  );
  return null;
};

const sanitizeShareProps = (
  instance: BuilderInstance,
  kit: PlaygroundKit | undefined,
  globalProps: Record<string, PropDefinition> | undefined,
): { props: Record<string, unknown>; enabledProps: Record<string, boolean> } => {
  const propDefinitions = getAllPropDefinitionsWithGlobals(kit, globalProps);
  const knownPropNames = getKnownPropNames(kit, instance, globalProps);
  const props: Record<string, unknown> = {};
  const enabledProps: Record<string, boolean> = {};

  Object.entries(instance.props).forEach(([name, value]) => {
    if (!knownPropNames.has(name)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[playground share] stripped: prop "${name}" on kit "${instance.kitName}" isn't in the known-prop allowlist (e.g. htmlOptions, className, data, aria are never real kit props).`,
      );
      return;
    }

    const type = displayPropType(propDefinitions[name]);
    const isFunctionTyped = type.includes("function") || type.includes("=>");
    if (isFunctionTyped && typeof value === "string" && value.trim()) {
      // eslint-disable-next-line no-console
      console.warn(
        `[playground share] stripped: prop "${name}" on kit "${instance.kitName}" is function-typed with a raw string value — that's exactly the code codegen would execute, and can't be told apart from a real callback.`,
      );
      return;
    }

    if (containsUnsafeValue(value)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[playground share] stripped: prop "${name}" on kit "${instance.kitName}" contained an unsafe key (e.g. __playgroundCode, __proto__, dangerouslySetInnerHTML).`,
      );
      return;
    }

    props[name] = value;
    enabledProps[name] = true;
  });

  return { props, enabledProps };
};

const sanitizeShareInstances = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  globalProps: Record<string, PropDefinition> | undefined,
): BuilderInstance[] =>
  instances.map((instance) => {
    const kit = kitsByName[instance.kitName];
    const { props, enabledProps } = sanitizeShareProps(
      instance,
      kit,
      globalProps,
    );

    return {
      ...instance,
      configuredChildren: sanitizeShareConfiguredChildren(instance, kit),
      props,
      enabledProps,
      children: sanitizeShareInstances(
        instance.children,
        kitsByName,
        globalProps,
      ),
    };
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
    if (!Array.isArray(parsed)) {
      // eslint-disable-next-line no-console
      console.warn(
        "[playground share] rejected: decoded payload isn't an array.",
        { parsed },
      );
      return { status: "invalid" };
    }

    const expanded = parsed.map(fromCompactInstance);
    const instances = sanitizeInstances(expanded, validKitNames);
    if (instances.length === 0) {
      // eslint-disable-next-line no-console
      console.warn(
        "[playground share] rejected: no instances survived sanitizeInstances — check kit names against validKitNames.",
        { expanded, validKitNames: Array.from(validKitNames) },
      );
      return { status: "invalid" };
    }

    const sanitized = sanitizeShareInstances(instances, kitsByName, globalProps);

    return { status: "ok", instances: sanitized };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[playground share] rejected: decode/parse threw.", err);
    return { status: "invalid" };
  }
};

export const clearPlaygroundShareParam = (): void => {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(SHARE_PARAM)) return;

  url.searchParams.delete(SHARE_PARAM);
  window.history.replaceState(window.history.state, "", url.toString());
};
