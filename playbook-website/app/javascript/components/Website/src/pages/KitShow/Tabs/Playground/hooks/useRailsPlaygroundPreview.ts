import { useEffect, useRef, useState } from "react";

function getCsrfToken(): string {
  return (
    document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ??
    ""
  );
}

export interface RailsPreviewPayload {
  props: Record<string, unknown>;
  global_props: Record<string, unknown>;
  children?: string;
  structure_mode?: string | null;
}

interface UseRailsPlaygroundPreviewOptions {
  kitName: string;
  payload: RailsPreviewPayload;
  enabled?: boolean;
  debounceMs?: number;
}

interface RailsPlaygroundPreviewState {
  html: string | null;
  error: string | null;
  loading: boolean;
}

export const useRailsPlaygroundPreview = ({
  kitName,
  payload,
  enabled = true,
  debounceMs = 300,
}: UseRailsPlaygroundPreviewOptions): RailsPlaygroundPreviewState => {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const payloadKey = JSON.stringify(payload);

  useEffect(() => {
    if (!enabled || !kitName) return undefined;

    const timeoutId = window.setTimeout(async () => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);
      setHtml(null);

      try {
        const response = await fetch(
          `/kits/${encodeURIComponent(kitName)}/rails/playground/preview`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-CSRF-Token": getCsrfToken(),
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setHtml(null);
          setError(data.error || "Failed to render Rails preview");
          return;
        }

        setHtml(data.html ?? null);
        setError(data.error ?? null);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to render Rails preview",
        );
        setHtml(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      window.clearTimeout(timeoutId);
      abortControllerRef.current?.abort();
    };
  }, [enabled, kitName, payloadKey, debounceMs]);

  return { html, error, loading };
};
