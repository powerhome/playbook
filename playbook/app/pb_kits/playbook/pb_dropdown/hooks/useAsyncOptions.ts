import { useCallback, useEffect, useRef, useState } from "react";
import { GenericObject } from "../../types";

export type LoadOptions = (
  term: string,
  callback: (options: GenericObject[]) => void,
  context: { signal: AbortSignal },
) => void | Promise<GenericObject[]>;

export default function useAsyncOptions(enabled: boolean, loadOptions: LoadOptions | undefined, minimum: number, debounce: number, defaultOptions: boolean | GenericObject[] = false, cacheOptions = false, cacheKey?: string | number): {
  options: GenericObject[];
  status: "idle" | "loading" | "success" | "empty" | "error";
  search: (term: string) => void;
  cancel: () => void;
  clear: () => void;
} {
  const [options, setOptions] = useState<GenericObject[]>(Array.isArray(defaultOptions) ? defaultOptions : []);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "empty" | "error">("idle");
  const controller = useRef<AbortController>();
  const cache = useRef(new Map<string, GenericObject[]>());
  const sequence = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const watchdog = useRef<ReturnType<typeof setTimeout>>();
  const loader = useRef(loadOptions);
  loader.current = loadOptions;

  const invalidate = useCallback(() => {
    sequence.current += 1;
    controller.current?.abort();
    controller.current = undefined;
    clearTimeout(timer.current);
    clearTimeout(watchdog.current);
  }, []);

  const cancel = useCallback(() => {
    invalidate();
    setStatus("idle");
  }, [invalidate]);

  const clear = useCallback(() => {
    cancel();
    setOptions([]);
  }, [cancel]);

  useEffect(() => invalidate, [enabled, invalidate]);

  const previousCacheKey = useRef(cacheKey);
  useEffect(() => {
    cache.current.clear();
    if (previousCacheKey.current !== cacheKey) clear();
    else cancel();
    previousCacheKey.current = cacheKey;
  }, [cacheOptions, cacheKey, cancel, clear]);

  const search = useCallback((term: string, initial = false) => {
    invalidate();
    setOptions([]);
    setStatus("idle");
    if (!enabled || (!initial && term.length < minimum)) return;
    const cached = cacheOptions ? cache.current.get(term) : undefined;
    if (cached) {
      setOptions(cached);
      setStatus(cached.length ? "success" : "empty");
      return;
    }
    const request = sequence.current;
    setStatus("loading");
    timer.current = setTimeout(() => {
      let settled = false;
      const requestController = new AbortController();
      controller.current = requestController;
      const finish = (results: GenericObject[], failed = false) => {
        if (settled || request !== sequence.current) return;
        failed = failed || !Array.isArray(results);
        if (failed) results = [];
        settled = true;
        controller.current = undefined;
        clearTimeout(watchdog.current);
        if (cacheOptions && !failed) {
          // Bound per-instance memory, including empty successful searches.
          cache.current.delete(term);
          if (cache.current.size >= 100) cache.current.delete(cache.current.keys().next().value);
          cache.current.set(term, results);
        }
        setOptions(results);
        setStatus(failed ? "error" : results.length ? "success" : "empty");
      };
      watchdog.current = setTimeout(() => {
        finish([], true);
        requestController.abort();
      }, 15000);
      try {
        if (!loader.current) return finish([], true);
        const result = loader.current(term, (results) => finish(results), { signal: requestController.signal });
        if (result && typeof result.then === "function") {
          result.then((results) => finish(results), () => finish([], true));
        }
      } catch {
        finish([], true);
      }
    }, initial ? 0 : Math.max(0, debounce));
  }, [enabled, minimum, debounce, cacheOptions, invalidate]);

  const preload = defaultOptions === true;
  const latestSearch = useRef(search);
  latestSearch.current = search;
  useEffect(() => {
    if (enabled && preload) latestSearch.current("", true);
  }, [enabled, preload, cacheKey, cacheOptions]);

  return { options, status, search, cancel, clear };
}
