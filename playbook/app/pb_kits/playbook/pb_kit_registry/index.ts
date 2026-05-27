// eslint-disable-next-line
// @ts-nocheck
import PbEnhancedElement from "../pb_enhanced_element";

type KitClass = typeof PbEnhancedElement;

class PbKitRegistry {
  private static instance: PbKitRegistry;

  // array to avoid overwriting if multiple kits share a selector
  private kits: Map<string, KitClass[]> = new Map();

  private mutationObserver: MutationObserver | null = null;
  private initialized = false;

  // rAF batching to reduce jank during heavy DOM churn
  private queued = false;
  private pendingMutations: MutationRecord[] = [];

  static getInstance(): PbKitRegistry {
    if (!PbKitRegistry.instance) {
      PbKitRegistry.instance = new PbKitRegistry();
    }
    return PbKitRegistry.instance;
  }

  register(kit: KitClass): void {
    const selector = kit.selector;
    if (!selector) {
      console.warn("[PbKitRegistry] Kit missing selector:", kit.name);
      return;
    }

    const list = this.kits.get(selector) || [];
    list.push(kit);
    this.kits.set(selector, list);
  }

  start(): void {
    if (this.initialized) return;
    this.initialized = true;

    const target = document.documentElement || document;

    // Single MutationObserver for ALL kits
    // attributes OFF
    this.mutationObserver = new MutationObserver((muts) => this.onMutations(muts));

    this.mutationObserver.observe(target, {
      childList: true,
      subtree: true,
      // attributes: false by omission
    });

    // Initial scan of document
    this.scan(document);
  }

  stop(): void {
    if (!this.initialized) return;

    this.mutationObserver?.disconnect();
    this.mutationObserver = null;

    // Disconnect all kit instances safely (snapshot keys first)
    this.kits.forEach((kitsForSelector) => {
      kitsForSelector.forEach((kit) => {
        if (!kit.elements) return;
        const els = Array.from(kit.elements.keys());
        els.forEach((el) => kit.removeMatch(el));
      });
    });

    this.pendingMutations = [];
    this.queued = false;
    this.initialized = false;
  }

  // ---- Mutation batching ----

  private onMutations(muts: MutationRecord[]): void {
    this.pendingMutations.push(...muts);

    if (this.queued) return;
    this.queued = true;

    requestAnimationFrame(() => {
      this.queued = false;
      const batch = this.pendingMutations;
      this.pendingMutations = [];
      this.processMutations(batch);
    });
  }

  private processMutations(mutations: MutationRecord[]): void {
    // We only care about added nodes here.
    // Removals handled by cleanupDisconnected() (no selector queries on removed subtrees)
    const addedRoots: Element[] = [];

    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;

      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          addedRoots.push(node as Element);
        }
      });
    }

    // Enhance anything newly inserted
    if (addedRoots.length) {
      for (const root of addedRoots) {
        this.scan(root);
      }
    }

    // Handle removals cheaply: only look at already-enhanced elements
    this.cleanupDisconnected();
  }

  // ---- Scanning / enhancing ----

  private scan(root: ParentNode): void {
    // For each selector, query within root once and attach all kits registered to it
    this.kits.forEach((kitsForSelector, selector) => {
      let matches: NodeListOf<Element>;
      try {
        // querySelectorAll doesn’t include root itself, so we handle that below too
        matches = (root as any).querySelectorAll
          ? (root as any).querySelectorAll(selector)
          : document.querySelectorAll(selector);
      } catch (error) {
        console.debug(`[PbKitRegistry] Invalid selector "${selector}"`, error);
        return;
      }

      if (matches && matches.length) {
        matches.forEach((el) => {
          kitsForSelector.forEach((kit) => kit.addMatch(el));
        });
      }

      // Include root itself if it matches
      if ((root as any).matches?.(selector)) {
        kitsForSelector.forEach((kit) => kit.addMatch(root as any));
      }
    });
  }

  // No selector queries on removals
  // We just remove instances whose elements are no longer in the DOM
  private cleanupDisconnected(): void {
    this.kits.forEach((kitsForSelector) => {
      kitsForSelector.forEach((kit) => {
        if (!kit.elements) return;

        // Snapshot keys to avoid mutate-while-iterating
        const els = Array.from(kit.elements.keys());
        for (const el of els) {
          if (!el.isConnected) {
            kit.removeMatch(el);
          }
        }
      });
    });
  }

  // Debug helpers
  getRegisteredSelectors(): string[] {
    return Array.from(this.kits.keys());
  }

  // Optional: manually rescan a subtree (useful if some page toggles data-* after insertion)
  rescan(root: ParentNode = document): void {
    if (!this.initialized) return;
    this.scan(root);
  }
}

export default PbKitRegistry.getInstance();
