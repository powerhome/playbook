// eslint-disable-next-line
// @ts-nocheck
import PbEnhancedElement from "./index"

export default class ElementObserver {
  matchDelegate: PbEnhancedElement
  target: Document
  _mutationObserver: MutationObserver

  constructor(matchDelegate: PbEnhancedElement, target = document) {
    this.matchDelegate = matchDelegate
    this.target = target
  }

  get mutationObserver(): MutationObserver {
    return this._mutationObserver =
      this._mutationObserver || new MutationObserver((mutationList) => this.processMutationList(mutationList))
  }

  start(): void {
    this.mutationObserver.observe(this.target, { attributes: true, childList: true, subtree: true })
    this.catchup()
  }

  stop(): void {
    this.mutationObserver.disconnect()
  }

  catchup(): void {
    this.handleAdditions(this.matchDelegate.matches(this.target as unknown as Element))
  }

  processMutationList(mutationList: Array<MutationRecord>): void {
    for (const mutation of mutationList) {
      if (mutation.type == 'attributes') {
        this.processAttributeChange(mutation.target as Element)
      } else if (mutation.type == 'childList') {
        this.processRemovedNodes(Array.from(mutation.removedNodes) as Array<Element>)
        this.processAddedNodes(Array.from(mutation.addedNodes) as Array<Element>)
      }
    }
  }

  processAttributeChange(node: Element): void | Array<Element> {
    if (node.nodeType !== Node.ELEMENT_NODE) return

    const matches = this.matchDelegate.matches(node)

    if (matches.length === 0) return this.matchDelegate.removeMatch(node)

    this.handleAdditions(matches)
  }

  processRemovedNodes(nodes: Array<Element>): void {
    for (const node of nodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue
      this.handleRemovals(this.matchDelegate.matches(node))
    }
  }

  processAddedNodes(nodes: Array<Element>): void {
    for (const node of nodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue
      this.handleAdditions(this.matchDelegate.matches(node))
    }
  }

  handleRemovals(elements: Array<Element>): void {
    for (const element of elements) this.matchDelegate.removeMatch(element)
  }

  handleAdditions(elements: Array<Element>): void {
    for (const element of elements) this.matchDelegate.addMatch(element)
  }
}
