import PbEnhancedElement from '../pb_enhanced_element'
import { debounce } from 'lodash'

export default class PbTypeahead extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-typeahead-kit]'
  }

  connect() {
    this.element.addEventListener('keydown', (event) => this.handleKeydown(event))
    this.searchInput.addEventListener('focus', () => this.debouncedSearch())
    this.searchInput.addEventListener('input', () => this.debouncedSearch())
    this.resultsElement.addEventListener('click', (event) => this.optionSelected(event))
  }

  handleKeydown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      this.focusPreviousOption()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      this.focusNextOption()
    }
  }

  search() {
    if (this.searchTerm.length < this.searchTermMinimumLength) return this.clearResults()
    if (this.resultsOptionCache.has(this.searchTerm)) return this.showResults()

    const searchTerm = this.searchTerm
    const search = {
      searchingFor: searchTerm,
      setResults: (results) => {
        this.resultsCacheUpdate(searchTerm, results)
      },
    }

    this.element.dispatchEvent(new CustomEvent('pb-typeahead-kit-search', { bubbles: true, detail: search }))
  }

  resultsCacheUpdate(searchTerm, results) {
    if (this.resultsOptionCache.has(searchTerm)) this.resultsOptionCache.delete(searchTerm)
    if (this.resultsOptionCache.size > 32) this.resultsOptionCache.delete(this.resultsOptionCache.keys[0])

    this.resultsOptionCache.set(searchTerm, results)
    this.showResults()
  }

  resultsCacheClear() {
    this.resultsOptionCache.clear()
  }

  get debouncedSearch() {
    return this._debouncedSearch = (
      this._debouncedSearch ||
        debounce(this.search, this.searchDebounceTimeout).bind(this)
    )
  }

  showResults() {
    if (!this.resultsOptionCache.has(this.searchTerm)) return

    this.clearResults()
    for (const result of this.resultsOptionCache.get(this.searchTerm)) {
      this.resultsElement.appendChild(this.newResultOption(result.cloneNode(true)))
    }
    for (const result of this.resultsElement.querySelectorAll('[data-result-option-item]')) {
      result.addEventListener('mousedown', (event) => this.optionSelected(event))
    }
  }

  optionSelected(event) {
    const resultOption = event.target.closest('[data-result-option-item]')
    if (!resultOption) return

    this.resultsCacheClear()
    this.searchInputClear()
    this.clearResults()

    this.element.dispatchEvent(new CustomEvent('pb-typeahead-kit-result-option-selected', { bubbles: true, detail: { selected: resultOption, typeahead: this } }))
  }

  clearResults() {
    this.resultsElement.innerHTML = ''
  }

  newResultOption(content) {
    const resultOption = this.resultOptionTemplate.content.cloneNode(true)
    resultOption.querySelector('slot[name="content"]').replaceWith(content)
    return resultOption
  }

  focusPreviousOption() {
    const currentIndex = this.resultOptionItems.indexOf(this.currentSelectedResultOptionItem)
    const previousIndex = currentIndex - 1
    const previousOptionItem = (
      this.resultOptionItems[previousIndex] ||
        this.resultOptionItems[this.resultOptionItems.length - 1]
    )
    previousOptionItem.focus()
  }

  focusNextOption() {
    const currentIndex = this.resultOptionItems.indexOf(this.currentSelectedResultOptionItem)
    const nextIndex = currentIndex + 1
    const nextOptionItem = (
      this.resultOptionItems[nextIndex] ||
        this.resultOptionItems[0]
    )
    nextOptionItem.focus()
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

  searchInputClear() {
    this.searchInput.value = ''
  }

  get searchTermMinimumLength() {
    return this.element.dataset.pbTypeaheadKitSearchTermMinimumLength
  }

  get searchDebounceTimeout() {
    return this.element.dataset.pbTypeaheadKitSearchDebounceTimeout
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
}
