import ElementObserver from './element_observer.js'

export default class PbEnhancedElement {
  static get elements() {
    return this._elements = (this._elements || new Map)
  }

  static get observer() {
    return this._observer = (this._observer || new ElementObserver(this))
  }

  static get selector() {
    // eslint-disable-next-line no-console
    console.warn('Define a static property for selector or redefine the matches function in a subclass.', this)
    return null
  }

  static matches(node) {
    if (!this.selector) return []

    const matches = []
    if (node.nodeType === Node.ELEMENT_NODE && node.matches(this.selector)) matches.push(node)
    matches.push(...node.querySelectorAll(this.selector))

    return (matches)
  }

  static addMatch(element) {
    if (this.elements.has(element)) return

    const enhansedElement = new this(element)
    enhansedElement.connect()
    this.elements.set(element, enhansedElement)
  }

  static removeMatch(element) {
    if (!this.elements.has(element)) return

    const enhansedElement = this.elements.get(element)
    enhansedElement.disconnect()
    this.elements.delete(element)
  }

  static start() {
    this.observer.start()
  }

  static stop() {
    this.mutationObserver.stop()
  }

  constructor(element) {
    this.element = element
  }

  connect() {
    // eslint-disable-next-line no-console
    console.warn('Redefine the connect function in a subclass.', this)
  }

  disconnect() { }
}
