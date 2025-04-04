import PbEnhancedElement from '../pb_enhanced_element'
import { debounce } from '../utilities/object'

export default class PbTypeahead extends PbEnhancedElement {
  _searchInput: HTMLInputElement
  _resultsElement: HTMLElement
  _debouncedSearch: () => void
  _resultsLoadingIndicator: HTMLElement
  _resultOptionTemplate: HTMLElement
  _resultsOptionCache: Map<string, Array<DocumentFragment>>
  _searchContext: string
  _validSelection: boolean

  static get selector() {
    return '[data-pb-typeahead-kit]'
  }

  connect() {
    this.element.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeydown(event))
    this.searchInput.addEventListener('focus', () => this.debouncedSearch())
    this.searchInput.addEventListener('input', () => this.debouncedSearch())
    this.resultsElement.addEventListener('click', (event: MouseEvent) => this.optionSelected(event))

    if (this.clearOnContextChange && this.searchContextElement) {
      this.searchContextElement.addEventListener('change', () => {
        this.searchInputClear()
        this.resultsCacheClear()
        this.clearResults()
      })
    }
  }

  get optionsByContext() {
    return (this.element as HTMLElement).dataset.pbTypeaheadKitOptionsByContext
      ? JSON.parse((this.element as HTMLElement).dataset.pbTypeaheadKitOptionsByContext)
      : null
  }

  get searchContextElement() {
    const selector = (this.element as HTMLElement).dataset.pbTypeaheadKitSearchContextSelector
    if (!selector) return null

    const found = this.element.parentNode?.querySelector(`#${selector}`)
      || this.element.closest(selector)

    return found || null
  }

  get clearOnContextChange() {
    return (this.element as HTMLElement).dataset.pbTypeaheadKitClearOnContextChange === 'true'
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      this.focusPreviousOption()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      this.focusNextOption()
    }
  }

  search() {
    if (this.searchTerm.length < parseInt(this.searchTermMinimumLength)) return this.clearResults()

    this.toggleResultsLoadingIndicator(true)
    this.showResults()

    const searchTerm = this.searchTerm
    const searchContext = this.searchContext

    if (this.optionsByContext && Object.keys(this.optionsByContext).length > 0) {
      const contextArray = this.optionsByContext[searchContext] || []

      const filteredResults = contextArray.filter((obj: { label: string, value: string }) => {
        return obj.label
          && obj.label.toLowerCase().includes(searchTerm.toLowerCase())
      })

       const optionFragments = filteredResults.map((obj: { label: string, value: string }) => {
      const singleOption = document.createDocumentFragment()
      singleOption.appendChild(document.createTextNode(obj.label))
      return singleOption
    })

      this.resultsCacheUpdate(searchTerm, searchContext, optionFragments)
    } else {
      const search = {
        searchingFor: searchTerm,
        searchingContext: searchContext,
        setResults: (results: Array<DocumentFragment>) => {
          this.resultsCacheUpdate(searchTerm, searchContext, results)
        },
      }
      this.element.dispatchEvent(new CustomEvent('pb-typeahead-kit-search', { bubbles: true, detail: search }))
    }
  }

  resultsCacheUpdate(searchTerm: string, searchContext: string, results: Array<DocumentFragment>) {
    const searchTermAndContext = this.cacheKeyFor(searchTerm, searchContext)
    if (this.resultsOptionCache.has(searchTermAndContext)) this.resultsOptionCache.delete(searchTermAndContext)
    if (this.resultsOptionCache.size > 32) this.resultsOptionCache.delete(this.resultsOptionCache.keys().next().value)

    this.resultsOptionCache.set(searchTermAndContext, results)
    this.showResults()
  }

  resultsCacheClear() {
    this.resultsOptionCache.clear()
  }

  get debouncedSearch() {
    return this._debouncedSearch = (
      this._debouncedSearch ||
      debounce(this.search, parseInt(this.searchDebounceTimeout)).bind(this)
    )
  }

  showResults() {
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

  optionSelected(event: MouseEvent) {
    const resultOption = (event.target as Element).closest('[data-result-option-item]')
    if (!resultOption) return

    const selectedText = resultOption.textContent.trim()

    this._validSelection = true
    this.removeValidationError()

    if (this.searchContextElement) this.searchInput.value = selectedText

    this.resultsCacheClear()
    if (!this.searchContextElement) this.searchInputClear()
    this.clearResults()

    this.element.dispatchEvent(new CustomEvent('pb-typeahead-kit-result-option-selected', { bubbles: true, detail: { selected: resultOption, typeahead: this } }))
  }

  removeValidationError() {
    const inputWrapper = this.searchInput.closest('.text_input_wrapper')
    if (inputWrapper) {
      const errorMessage = inputWrapper.querySelector('.pb_body_kit_negative') as HTMLElement
      if (errorMessage) {
        errorMessage.style.display = 'none'
      }
      this.searchInput.classList.remove('error')
    }
  }

  showValidationError() {
    const inputWrapper = this.searchInput.closest('.text_input_wrapper')
    if (inputWrapper) {
      const errorMessage = inputWrapper.querySelector('.pb_body_kit_negative') as HTMLElement
      if (errorMessage) {
        errorMessage.style.display = 'block'
      }
      this.searchInput.classList.add('error')
    }
  }

  clearResults() {
    this.resultsElement.innerHTML = ''
  }

  newResultOption(content: DocumentFragment) {
    const resultOption = (this.resultOptionTemplate as HTMLTemplateElement).content.cloneNode(true) as Element
    resultOption.querySelector('slot[name="content"]').replaceWith(content)
    return resultOption
  }

  focusPreviousOption() {
    const currentIndex = this.resultOptionItems.indexOf(this.currentSelectedResultOptionItem)
    const previousIndex = currentIndex - 1
    const previousOptionItem = (
      this.resultOptionItems[previousIndex] ||
      this.resultOptionItems[this.resultOptionItems.length - 1]
    );
    (previousOptionItem as HTMLElement).focus()
  }

  focusNextOption() {
    const currentIndex = this.resultOptionItems.indexOf(this.currentSelectedResultOptionItem)
    const nextIndex = currentIndex + 1
    const nextOptionItem = (
      this.resultOptionItems[nextIndex] ||
      this.resultOptionItems[0]
    );
    (nextOptionItem as HTMLElement).focus()
  }

  get resultOptionItems() {
    return Array.from(this.resultsElement.querySelectorAll('[data-result-option-item]'))
  }

  get currentSelectedResultOptionItem() {
    return document.activeElement.closest('[data-result-option-item]')
  }

  get searchInput() {
    return this._searchInput = (this._searchInput || this.element.querySelector('input[type="search"]'))
  }

  get searchTerm() {
    return this.searchInput.value
  }

  get searchContext() {
    if (this._searchContext) return this._searchContext

    const selector = (this.element as HTMLElement).dataset.searchContextValueSelector
    if (selector) return ((
      this.element.parentNode.querySelector(selector) ||
      this.element.closest(selector)
    ) as HTMLInputElement).value
    else if (this.searchContextElement) {
      return (this.searchContextElement as HTMLInputElement).value
    }

    return null
  }

  set searchContext(value) {
    this._searchContext = value
  }

  get searchTermAndContext() {
    return this.cacheKeyFor(this.searchTerm, this.searchContext)
  }

  cacheKeyFor(searchTerm: string, searchContext: string) {
    return [searchTerm, JSON.stringify(searchContext)].join()
  }

  searchInputClear() {
    this.searchInput.value = ''
  }

  get searchTermMinimumLength() {
    return (this.element as HTMLElement).dataset.pbTypeaheadKitSearchTermMinimumLength
  }

  get searchDebounceTimeout() {
    return (this.element as HTMLElement).dataset.pbTypeaheadKitSearchDebounceTimeout
  }

  get resultsElement() {
    return this._resultsElement = (this._resultsElement || this.element.querySelector('[data-pb-typeahead-kit-results]'))
  }

  get resultOptionTemplate() {
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

  get resultsLoadingIndicator() {
    return this._resultsLoadingIndicator = (
      this._resultsLoadingIndicator ||
      this.element.querySelector('[data-pb-typeahead-kit-loading-indicator]')
    )
  }

  toggleResultsLoadingIndicator(visible: boolean) {
    let visibilityProperty = '0'
    if (visible) visibilityProperty = '1'
    this.resultsLoadingIndicator.style.opacity = visibilityProperty
  }
}
