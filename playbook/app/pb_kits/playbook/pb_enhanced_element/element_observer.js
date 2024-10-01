export default class ElementObserver {
  constructor(matchDelegate, target = document) {
    this.matchDelegate = matchDelegate
    this.target = target
  }

  start() {
    this.mutationObserver.observe(this.target, { attributes: true, childList: true, subtree: true })
    this.catchup()
  }

  stop() {
    this.mutationObserverdisconnect()
  }

  catchup() {
    this.handleAdditions(this.matchDelegate.matches(this.target))
  }

  processMutationList(mutationList) {
    for (const mutation of mutationList) {
      if (mutation.type == 'attributes') {
        this.processAttributeChange(mutation.target)
      } else if (mutation.type == 'childList') {
        this.processRemovedNodes(Array.from(mutation.removedNodes))
        this.processAddedNodes(Array.from(mutation.addedNodes))
      }
    }
  }

  processAttributeChange(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return

    const matches = this.matchDelegate.matches(node)

    if (matches.length === 0) return this.matchDelegate.removeMatch(node)

    this.handleAdditions(matches)
  }

  processRemovedNodes(nodes) {
    for (const node of nodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue
      this.handleRemovals(this.matchDelegate.matches(node))
    }
  }

  processAddedNodes(nodes) {
    for (const node of nodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue
      this.handleAdditions(this.matchDelegate.matches(node))
    }
  }

  handleRemovals(elements) {
    for (const element of elements) this.matchDelegate.removeMatch(element)
  }

  handleAdditions(elements) {
    for (const element of elements) this.matchDelegate.addMatch(element)
  }

  get mutationObserver() {
    return this._mutationObserver =
      this._mutationObserver || new MutationObserver((mutationList) => this.processMutationList(mutationList))
  }
}
