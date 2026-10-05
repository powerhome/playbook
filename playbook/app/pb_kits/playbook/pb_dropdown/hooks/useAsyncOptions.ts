import { useCallback, useEffect, useRef, useState } from "react";
import { GenericObject } from "../../types";

export type LoadOptions = (
  term: string,
  callback: (options: GenericObject[]) => void,
) => void | Promise<GenericObject[]>;

export default function useAsyncOptions(enabled: boolean, loadOptions: LoadOptions | undefined, minimum: number, debounce: number): {
  options: GenericObject[];
  status: string;
  search: (term: string) => void;
  cancel: () => void;
  clear: () => void;
} {
  const [options, setOptions] = useState<GenericObject[]>([]);
  const [status, setStatus] = useState("");
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

  const search = (term: string) => {
    invalidate();
    setOptions([]);
    setStatus("");
    if (!enabled || term.length < minimum) return;
    const request = sequence.current;
    setStatus("Loading…");
    timer.current = setTimeout(() => {
      let settled = false;
      const finish = (results: GenericObject[], failed = false) => {
        if (settled || request !== sequence.current) return;
        settled = true;
        clearTimeout(watchdog.current);
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
    }, Math.max(0, debounce));
  };

  return { options, status, search, cancel, clear };
}
