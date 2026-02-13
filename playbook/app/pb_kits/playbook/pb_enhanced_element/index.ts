// eslint-disable-next-line
// @ts-nocheck
import ElementObserver from './element_observer'

export default class PbEnhancedElement {
  static _elements: Map<Element, PbEnhancedElement>
  static _observer: ElementObserver
  element: Element

  constructor(element?: Element) {
    this.element = element
  }

  static get elements(): Map<Element, PbEnhancedElement> {
    return this._elements = (this._elements || new Map)
  }

  static get observer(): ElementObserver {
    return this._observer = (this._observer || new ElementObserver(this))
  }

  static get selector(): string {
    // eslint-disable-next-line no-console
    console.warn('Define a static property for selector or redefine the matches function in a subclass.', this)
    return null
  }

  static matches(node: Element): Array<Element> {
    if (!this.selector) return []

    const matches = []
    if (node.nodeType === Node.ELEMENT_NODE && node.matches(this.selector)) matches.push(node)
    matches.push(...node.querySelectorAll(this.selector))

    return (matches)
  }

  static addMatch(element: Element): void {
    if (element._pbEnhanced || this.elements.has(element)) return

    const enhansedElement = new this(element)
    enhansedElement.connect()
    this.elements.set(element, enhansedElement)
    element._pbEnhanced = enhansedElement
  }

  static removeMatch(element: Element): void {
    if (!this.elements.has(element)) return

    const enhansedElement = this.elements.get(element)
    enhansedElement.disconnect()
    this.elements.delete(element)
    delete element._pbEnhanced
  }

  static start(): void {
    this.observer.start()
  }

  static stop(): void {
    this.observer.stop()
  }

  connect(): void {
    // eslint-disable-next-line no-console
    console.warn('Redefine the connect function in a subclass.', this)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect(): void {}
}
