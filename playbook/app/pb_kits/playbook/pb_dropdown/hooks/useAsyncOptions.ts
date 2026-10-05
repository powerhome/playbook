import { useCallback, useEffect, useRef, useState } from "react";
import { GenericObject } from "../../types";

export type LoadOptions = (
  term: string,
  callback: (options: GenericObject[]) => void,
) => void | Promise<GenericObject[]>;

export default function useAsyncOptions(enabled: boolean, loadOptions: LoadOptions | undefined, minimum: number, debounce: number, defaultOptions: boolean | GenericObject[] = false, cacheOptions = false, cacheKey?: string | number): {
  options: GenericObject[];
  status: string;
  search: (term: string) => void;
  cancel: () => void;
  clear: () => void;
} {
  const [options, setOptions] = useState<GenericObject[]>(Array.isArray(defaultOptions) ? defaultOptions : []);
  const [status, setStatus] = useState("");
  const cache = useRef(new Map<string, GenericObject[]>());
  const sequence = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const watchdog = useRef<ReturnType<typeof setTimeout>>();
  const loader = useRef(loadOptions);
  loader.current = loadOptions;

  const invalidate = useCallback(() => {
    sequence.current += 1;
    clearTimeout(timer.current);
    clearTimeout(watchdog.current);
  }, []);

  const cancel = useCallback(() => {
    invalidate();
    setStatus("");
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
    setStatus("");
    if (!enabled || (!initial && term.length < minimum)) return;
    const cached = cacheOptions ? cache.current.get(term) : undefined;
    if (cached) {
      setOptions(cached);
      setStatus(cached.length ? "" : "No results found");
      return;
    }
    const request = sequence.current;
    setStatus("Loading…");
    timer.current = setTimeout(() => {
      let settled = false;
      const finish = (results: GenericObject[], failed = false) => {
        if (settled || request !== sequence.current) return;
        settled = true;
        clearTimeout(watchdog.current);
        if (cacheOptions && !failed) {
          // Bound per-instance memory, including empty successful searches.
          cache.current.delete(term);
          if (cache.current.size >= 100) cache.current.delete(cache.current.keys().next().value);
          cache.current.set(term, results);
        }
        setOptions(results);
        setStatus(failed ? "Unable to load options" : results.length ? "" : "No results found");
      };
      watchdog.current = setTimeout(() => finish([], true), 15000);
      try {
        if (!loader.current) return finish([], true);
        const result = loader.current(term, (results) => finish(results));
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
