import PbEnhancedElement from '../pb_enhanced_element'
import { debounce } from 'lodash'

export default class PbTypeahead extends PbEnhancedElement {
  _searchInput: HTMLInputElement
  _resultsElement: HTMLElement
  _debouncedSearch: () => void
  _resultsLoadingIndicator: HTMLElement
  _resultOptionTemplate: HTMLElement
  _resultsOptionCache: Map<string, Array<DocumentFragment>>
  _searchContext: string

  static get selector(): string {
    return '[data-pb-typeahead-kit]'
  }

  connect(): void {
    this.element.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeydown(event))
    this.searchInput.addEventListener('focus', () => this.debouncedSearch)
    this.searchInput.addEventListener('input', () => this.debouncedSearch)
    this.resultsElement.addEventListener('click', (event: MouseEvent) => this.optionSelected(event))
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      this.focusPreviousOption()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      this.focusNextOption()
    }
  }

  search(): void {
    if (this.searchTerm.length < parseInt(this.searchTermMinimumLength)) return this.clearResults()

    this.toggleResultsLoadingIndicator(true)
    this.showResults()

    const searchTerm = this.searchTerm
    const searchContext = this.searchContext
    const search = {
      searchingFor: searchTerm,
      searchingContext: searchContext,
      setResults: (results: Array<DocumentFragment>) => {
        this.resultsCacheUpdate(searchTerm, searchContext, results)
      },
    }
    this.element.dispatchEvent(new CustomEvent('pb-typeahead-kit-search', { bubbles: true, detail: search }))
  }

  resultsCacheUpdate(searchTerm: string, searchContext: string, results: Array<DocumentFragment>): void {
    const searchTermAndContext = this.cacheKeyFor(searchTerm, searchContext)
    if (this.resultsOptionCache.has(searchTermAndContext)) this.resultsOptionCache.delete(searchTermAndContext)
    if (this.resultsOptionCache.size > 32) this.resultsOptionCache.delete(this.resultsOptionCache.keys().next().value)

    this.resultsOptionCache.set(searchTermAndContext, results)
    this.showResults()
  }

  resultsCacheClear(): void {
    this.resultsOptionCache.clear()
  }

  get debouncedSearch(): void {
    return this._debouncedSearch = (
      this._debouncedSearch ||
      debounce(this.search, parseInt(this.searchDebounceTimeout)).bind(this)
    )
  }

  showResults(): void {
    if (!this.resultsOptionCache.has(this.searchTermAndContext)) return

    this.toggleResultsLoadingIndicator(false)
    this.clearResults()
    for (const result of this.resultsOptionCache.get(this.searchTermAndContext)) {
      this.resultsElement.appendChild(this.newResultOption(result.cloneNode(true)))
    }
    for (const result of this.resultsElement.querySelectorAll('[data-result-option-item]')) {
      result.addEventListener('mousedown', (event: MouseEvent) => this.optionSelected(event))
    }
  }

  optionSelected(event: MouseEvent): void {
    const resultOption = (event.target as Element).closest('[data-result-option-item]')
    if (!resultOption) return

    this.resultsCacheClear()
    this.searchInputClear()
    this.clearResults()

    this.element.dispatchEvent(new CustomEvent('pb-typeahead-kit-result-option-selected', { bubbles: true, detail: { selected: resultOption, typeahead: this } }))
  }

  clearResults(): void {
    this.resultsElement.innerHTML = ''
  }

  newResultOption(content: DocumentFragment) {
    const resultOption = (this.resultOptionTemplate as HTMLTemplateElement).content.cloneNode(true) as Element
    resultOption.querySelector('slot[name="content"]').replaceWith(content)
    return resultOption
  }

  focusPreviousOption(): void {
    const currentIndex = this.resultOptionItems.indexOf(this.currentSelectedResultOptionItem)
    const previousIndex = currentIndex - 1
    const previousOptionItem = (
      this.resultOptionItems[previousIndex] ||
      this.resultOptionItems[this.resultOptionItems.length - 1]
    );
    (previousOptionItem as HTMLElement).focus()
  }

  focusNextOption(): void {
    const currentIndex = this.resultOptionItems.indexOf(this.currentSelectedResultOptionItem)
    const nextIndex = currentIndex + 1
    const nextOptionItem = (
      this.resultOptionItems[nextIndex] ||
      this.resultOptionItems[0]
    );
    (nextOptionItem as HTMLElement).focus()
  }

  get resultOptionItems(): HTMLElement[] {
    return Array.from(this.resultsElement.querySelectorAll('[data-result-option-item]'))
  }

  get currentSelectedResultOptionItem(): HTMLElement | null {
    return document.activeElement.closest('[data-result-option-item]')
  }

  get searchInput(): HTMLInputElement | null {
    return this._searchInput = (this._searchInput || this.element.querySelector('input[type="search"]'))
  }

  get searchTerm(): string {
    return this.searchInput.value
  }

  get searchContext(): string | null {
    if (this._searchContext) return this._searchContext

    const selector = (this.element as HTMLElement).dataset.searchContextValueSelector
    if (selector) return ((
      this.element.parentNode.querySelector(selector) ||
      this.element.closest(selector)
    ) as HTMLInputElement).value

    return null
  }

  set searchContext(value: string) {
    this._searchContext = value
  }

  get searchTermAndContext(): string {
    return this.cacheKeyFor(this.searchTerm, this.searchContext)
  }

  cacheKeyFor(searchTerm: string, searchContext: string): string {
    return [searchTerm, JSON.stringify(searchContext)].join()
  }

  searchInputClear(): void {
    this.searchInput.value = ''
  }

  get searchTermMinimumLength(): string | undefined {
    return (this.element as HTMLElement).dataset.pbTypeaheadKitSearchTermMinimumLength
  }

  get searchDebounceTimeout(): string | undefined {
    return (this.element as HTMLElement).dataset.pbTypeaheadKitSearchDebounceTimeout
  }

  get resultsElement(): HTMLElement | null {
    return this._resultsElement = (this._resultsElement || this.element.querySelector('[data-pb-typeahead-kit-results]'))
  }

  get resultOptionTemplate(): HTMLElement | null {
    return this._resultOptionTemplate = (
      this._resultOptionTemplate ||
      this.element.querySelector('template[data-pb-typeahead-kit-result-option]')
    )
  }

  get resultsOptionCache() {
    return this._resultsOptionCache = (
      this._resultsOptionCache ||
      new Map
    )
  }

  get resultsLoadingIndicator(): HTMLElement | null {
    return this._resultsLoadingIndicator = (
      this._resultsLoadingIndicator ||
      this.element.querySelector('[data-pb-typeahead-kit-loading-indicator]')
    )
  }

  toggleResultsLoadingIndicator(visible: boolean): void {
    let visibilityProperty = '0'
    if (visible) visibilityProperty = '1'
    this.resultsLoadingIndicator.style.opacity = visibilityProperty
  }
}
