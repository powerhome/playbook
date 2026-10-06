import { useCallback, useEffect, useRef, useState } from "react";
import { GenericObject } from "../../types";

export type LoadOptions = (
  term: string,
  callback: (options: GenericObject[]) => void,
) => void | Promise<GenericObject[]>;

export default function useAsyncOptions(enabled: boolean, loadOptions: LoadOptions | undefined, defaultOptions: boolean | GenericObject[] = false, cacheOptions = false): {
  options: GenericObject[];
  status: "idle" | "loading" | "success" | "empty" | "error";
  search: (term: string) => void;
  cancel: () => void;
  resume: (term?: string) => void;
  clear: () => void;
} {
  const [options, setOptions] = useState<GenericObject[]>(Array.isArray(defaultOptions) ? defaultOptions : []);
  // Results shown for an empty query: the defaultOptions array, or what the defaultOptions preload returned.
  const preloaded = useRef<GenericObject[]>([]);
  const initialOptions = useRef<GenericObject[]>([]);
  initialOptions.current = Array.isArray(defaultOptions) ? defaultOptions : defaultOptions ? preloaded.current : [];
  // Last list a search actually settled (or the defaultOptions list). A new search clears the visible list first.
  const settledOptions = useRef<GenericObject[]>(Array.isArray(defaultOptions) ? defaultOptions : []);
  const cleared = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "empty" | "error">("idle");
  const cache = useRef(new Map<string, GenericObject[]>());
  const sequence = useRef(0);
  const pendingSearch = useRef<{ term: string; initial: boolean } | null>(null);
  const interruptedSearch = useRef<{ term: string; initial: boolean } | null>(null);
  const interrupted = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const watchdog = useRef<ReturnType<typeof setTimeout>>();
  const loader = useRef(loadOptions);
  loader.current = loadOptions;

  const invalidate = useCallback(() => {
    sequence.current += 1;
    clearTimeout(timer.current);
    clearTimeout(watchdog.current);
  }, []);

  const remember = useCallback((next: GenericObject[]) => {
    cleared.current = false;
    settledOptions.current = next;
    setOptions(next);
  }, []);

  const cancel = useCallback(() => {
    // A settled error or empty result stays as it is. Only an unfinished search is rolled back.
    if (!pendingSearch.current && !cleared.current) return;
    interrupted.current = true;
    if (pendingSearch.current) interruptedSearch.current = pendingSearch.current;
    invalidate();
    if (cleared.current) {
      cleared.current = false;
      setOptions(settledOptions.current);
    }
    setStatus("idle");
  }, [invalidate]);

  const clear = useCallback(() => {
    cancel();
    pendingSearch.current = null;
    interruptedSearch.current = null;
    interrupted.current = false;
    cleared.current = false;
    remember(initialOptions.current);
    setStatus("idle");
  }, [cancel, remember]);

  useEffect(() => invalidate, [enabled, invalidate]);

  useEffect(() => {
    cache.current.clear();
    cancel();
  }, [cacheOptions, cancel]);

  const search = useCallback((term: string, initial = false) => {
    invalidate();
    pendingSearch.current = null;
    interruptedSearch.current = null;
    interrupted.current = false;
    setStatus("idle");
    if (!enabled || (!initial && !term)) {
      remember(initialOptions.current);
      return;
    }
    cleared.current = true;
    setOptions([]);
    const cached = cacheOptions ? cache.current.get(term) : undefined;
    if (cached) {
      remember(cached);
      setStatus(cached.length ? "success" : "empty");
      return;
    }
    pendingSearch.current = { term, initial };
    const request = sequence.current;
    setStatus("loading");
    timer.current = setTimeout(() => {
      let settled = false;
      const finish = (results: GenericObject[], failed = false) => {
        if (settled || request !== sequence.current) return;
        failed = failed || !Array.isArray(results);
        if (failed) results = [];
        settled = true;
        pendingSearch.current = null;
        clearTimeout(watchdog.current);
        if (cacheOptions && !failed) {
          // Bound per-instance memory, including empty successful searches.
          cache.current.delete(term);
          if (cache.current.size >= 100) cache.current.delete(cache.current.keys().next().value);
          cache.current.set(term, results);
        }
        if (initial && !failed) preloaded.current = results;
        if (failed) {
          cleared.current = false;
          setOptions([]);
        } else {
          remember(results);
        }
        setStatus(failed ? "error" : results.length ? "success" : "empty");
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
    }, 0);
  }, [enabled, cacheOptions, invalidate, remember]);

  const resume = useCallback((term?: string) => {
    if (!enabled || !interrupted.current) return;
    const pending = interruptedSearch.current;
    if (term === undefined) {
      if (pending) search(pending.term, pending.initial);
      return;
    }
    if (pending && term === pending.term) {
      search(pending.term, pending.initial);
      return;
    }
    search(term);
  }, [enabled, search]);

  const preload = defaultOptions === true;
  const latestSearch = useRef(search);
  latestSearch.current = search;
  useEffect(() => {
    if (enabled && preload && !interrupted.current) latestSearch.current("", true);
  }, [enabled, preload, cacheOptions]);

  return { options, status, search, cancel, resume, clear };
}
