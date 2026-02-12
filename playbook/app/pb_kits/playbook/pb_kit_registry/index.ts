// eslint-disable-next-line
// @ts-nocheck
import PbEnhancedElement from '../pb_enhanced_element'

class PbKitRegistry {
  private static instance: PbKitRegistry
  private kits: Map<string, typeof PbEnhancedElement> = new Map()
  private mutationObserver: MutationObserver | null = null
  private initialized = false

  static getInstance(): PbKitRegistry {
    if (!PbKitRegistry.instance) {
      PbKitRegistry.instance = new PbKitRegistry()
    }
    return PbKitRegistry.instance
  }

  register(kit: typeof PbEnhancedElement): void {
    const selector = kit.selector
    if (!selector) {
      console.warn('[PbKitRegistry] Kit missing selector:', kit.name)
      return
    }
    this.kits.set(selector, kit)
  }

  start(): void {
    if (this.initialized) return
    this.initialized = true

    // Single MutationObserver for ALL kits
    this.mutationObserver = new MutationObserver((mutations) => {
      this.processMutations(mutations)
    })

    this.mutationObserver.observe(document, {
      attributes: true,
      childList: true,
      subtree: true
    })

    // Initial scan of document
    this.scanDocument()
  }

  private scanDocument(): void {
    this.kits.forEach((kit, selector) => {
      try {
        const elements = document.querySelectorAll(selector)
        elements.forEach((element) => {
          kit.addMatch(element)
        })
      } catch (error) {
        console.error(`[PbKitRegistry] Error scanning for selector "${selector}":`, error)
      }
    })
  }

  private processMutations(mutations: MutationRecord[]): void {
    const addedNodes = new Set<Element>()
    const removedNodes = new Set<Element>()
    const attributeChangedNodes = new Set<Element>()

    // Collect all changes first to batch process
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            addedNodes.add(node as Element)
          }
        })
        mutation.removedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            removedNodes.add(node as Element)
          }
        })
      } else if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
        // Attribute changes might affect selector matching - needs special handling
        attributeChangedNodes.add(mutation.target as Element)
      }
    }

    // Process removals first
    if (removedNodes.size > 0) {
      this.handleRemovals(removedNodes)
    }

    // Process attribute changes (could be add OR remove)
    if (attributeChangedNodes.size > 0) {
      this.handleAttributeChanges(attributeChangedNodes)
    }

    // Process additions
    if (addedNodes.size > 0) {
      this.handleAdditions(addedNodes)
    }
  }

  private handleAttributeChanges(nodes: Set<Element>): void {
    nodes.forEach(node => {
      this.kits.forEach((kit, selector) => {
        try {
          const currentlyMatches = node.matches?.(selector)
          const hasInstance = kit.elements?.has(node)

          if (currentlyMatches && !hasInstance) {
            // Element now matches but wasn't registered, add it
            kit.addMatch(node)
          } else if (!currentlyMatches && hasInstance) {
            // Element no longer matches but is still registered, remove it
            kit.removeMatch(node)
          }
          // If matches and has instance, or doesn't match and no instance, no action needed
        } catch (error) {
          console.debug(`[PbKitRegistry] Error handling attribute change for "${selector}":`, error)
        }
      })
    })
  }

  private handleRemovals(nodes: Set<Element>): void {
    nodes.forEach(node => {
      this.kits.forEach((kit, selector) => {
        try {
          // Check if the removed node itself matches
          if (node.matches?.(selector)) {
            kit.removeMatch(node)
          }
          // Check descendants
          const descendants = node.querySelectorAll?.(selector)
          descendants?.forEach(el => kit.removeMatch(el))
        } catch (error) {
          // Selector might be invalid or node might be detached
          console.debug(`[PbKitRegistry] Error removing matches for "${selector}":`, error)
        }
      })
    })
  }

  private handleAdditions(nodes: Set<Element>): void {
    nodes.forEach(node => {
      this.kits.forEach((kit, selector) => {
        try {
          // Check if the added node itself matches
          if (node.matches?.(selector)) {
            kit.addMatch(node)
          }
          // Check descendants
          const descendants = node.querySelectorAll?.(selector)
          descendants?.forEach(el => kit.addMatch(el))
        } catch (error) {
          // Selector might be invalid
          console.debug(`[PbKitRegistry] Error adding matches for "${selector}":`, error)
        }
      })
    })
  }

  stop(): void {
    if (!this.initialized) return

    // Disconnect observer
    this.mutationObserver?.disconnect()
    this.mutationObserver = null

    // Disconnect all kit instances
    this.kits.forEach(kit => {
      try {
        const elements = kit.elements
        if (elements) {
          elements.forEach((instance, element) => {
            kit.removeMatch(element)
          })
        }
      } catch (error) {
        console.error('[PbKitRegistry] Error stopping kit:', error)
      }
    })

    this.initialized = false
  }

  // Useful for debugging
  getRegisteredKits(): string[] {
    return Array.from(this.kits.keys())
  }

  // Force re-scan (useful after major DOM changes)
  rescan(): void {
    if (!this.initialized) {
      console.warn('[PbKitRegistry] Cannot rescan - registry not initialized')
      return
    }
    this.scanDocument()
  }
}

export default PbKitRegistry.getInstance()
