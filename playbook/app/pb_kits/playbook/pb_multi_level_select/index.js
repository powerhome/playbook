import PbEnhancedElement from "../pb_enhanced_element"
import {
  kitRequiresPortaledFloatingUi,
  positionFloatingShellToInput,
  resolveFloatingOwnerId,
  resolvePortaledKitHost,
  setFloatingOwnerAttribute,
  subscribeFloatingKitReposition,
} from "../utilities/floatingPortalHosts"
import {
  addCheckedAndParentProperty,
  cloneTree,
  filterFormattedDataById,
  findByFilter,
  getAncestorsOfUnchecked,
  getCheckedItems,
  getDefaultCheckedItems,
  getExpandedItems,
  modifyRecursive,
  modifyValue,
  recursiveCheckParent,
} from "./tree_helpers"

const SELECTOR = "[data-pb-multi-level-select]"

const isTrue = (value) => value === true || value === "true"

export default class PbMultiLevelSelect extends PbEnhancedElement {
  static get selector() {
    return SELECTOR
  }

  connect() {
    this.cacheElements()
    this.readConfig()

    this.isDropdownClosed = true
    this.optionsDirty = true
    this.filterItem = ""
    this.formattedData = addCheckedAndParentProperty(
      this.treeData,
      this.variant === "single" ? [this.selectedIds[0]] : this.selectedIds,
      {
        returnAllSelected: this.returnAllSelected,
        variant: this.variant,
      }
    )
    this.expanded = new Set(
      getExpandedItems(
        this.treeData,
        this.selectedIds,
        this.showCheckedChildren
      )
    )
    this.singleSelectedItem = this.initialSingleSelectedItem()
    this.syncSelectedCollections()

    this.portalHost = null
    this.useMenuPortal = false
    this.floatingOwnerId = null
    this._floatingResolved = false
    this.portalShell = null
    this._portalParent = null
    this._portalNext = null
    this._unsubscribePortalReposition = null

    this.bindEventListeners()
    this.observeRogueErrorInsideInnerContainer()
    this.bindClearApi()
    this.render()
  }

  disconnect() {
    this.unmountPortalMenu()
    this.unbindEventListeners()
    this.rogueErrorObserver?.disconnect()
    this.unbindClearApi()
  }

  cacheElements() {
    this.wrapper = this.element.querySelector("[data-pb-mls-wrapper]")
    this.inputWrapper = this.element.querySelector("[data-pb-mls-input-wrapper]")
    this.innerContainer = this.element.querySelector("[data-pb-mls-inner]")
    this.searchInput = this.element.querySelector("[data-pb-mls-search]")
    this.menu = this.element.querySelector("[data-pb-mls-menu]")
    this.arrowDown = this.element.querySelector("[data-pb-mls-arrow-down]")
    this.arrowUp = this.element.querySelector("[data-pb-mls-arrow-up]")
    this.labelEl = this.element.querySelector("[data-pb-mls-label]")
    this.checkboxRowTemplate = this.element.querySelector(
      '[data-pb-mls-template="checkbox-row"]'
    )
    this.radioRowTemplate = this.element.querySelector(
      '[data-pb-mls-template="radio-row"]'
    )
    this.hideRadioRowTemplate = this.element.querySelector(
      '[data-pb-mls-template="hide-radio-row"]'
    )
    this.chevronDownTemplate = this.element.querySelector(
      '[data-pb-mls-template="chevron-down"]'
    )
    this.chevronRightTemplate = this.element.querySelector(
      '[data-pb-mls-template="chevron-right"]'
    )
    this.pillTemplate = this.element.querySelector(
      '[data-pb-mls-template="pill"]'
    )
  }

  readConfig() {
    const { dataset } = this.element
    this.treeData = this.parseJson(dataset.treeData, [])
    this.selectedIds = this.parseJson(dataset.selectedIds, [])
    this.returnAllSelected = isTrue(dataset.returnAllSelected)
    this.inputDisplay = dataset.inputDisplay || "pills"
    this.inputName = dataset.inputName || ""
    this.variant = dataset.variant || "multi"
    this.disabled = isTrue(dataset.disabled)
    this.required = isTrue(dataset.required)
    this.fieldName = dataset.name || ""
    this.placeholderText = dataset.placeholder || "Start typing..."
    this.showCheckedChildren = dataset.showCheckedChildren !== "false"
    this.kitId = this.element.id
    this.labelForId = this.searchInput?.id || "multiselect_input"
    this.arrowDownId = this.arrowDown?.id
    this.arrowUpId = this.arrowUp?.id
  }

  parseJson(value, fallback) {
    if (!value) return fallback
    try {
      return JSON.parse(value)
    } catch (_err) {
      return fallback
    }
  }

  initialSingleSelectedItem() {
    if (this.variant !== "single") {
      return { id: [], value: "", item: [] }
    }
    if (!this.selectedIds?.length) {
      return { id: [], value: "", item: [] }
    }
    const selectedItem = filterFormattedDataById(
      this.formattedData,
      this.selectedIds[0]
    )
    if (!selectedItem.length) {
      return { id: [], value: "", item: [] }
    }
    const { id, label } = selectedItem[0]
    return { id: [id], value: label, item: selectedItem }
  }

  syncSelectedCollections() {
    if (this.returnAllSelected) {
      this.returnedArray = getCheckedItems(this.formattedData) || []
      this.defaultReturn = []
    } else if (this.variant === "single") {
      this.returnedArray = []
      this.defaultReturn = this.singleSelectedItem.item
    } else {
      this.returnedArray = []
      this.defaultReturn = getDefaultCheckedItems(this.formattedData)
    }
  }

  currentSelected() {
    if (this.returnAllSelected) return this.returnedArray
    return this.defaultReturn
  }

  bindEventListeners() {
    this.handleInputWrapperClick = this.handleInputWrapperClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleSearchFocus = this.handleSearchFocus.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handleMenuChange = this.handleMenuChange.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleLabelClick = this.handleLabelClick.bind(this)
    this.handleInvalid = this.handleInvalid.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleInnerContainerClick = this.handleInnerContainerClick.bind(this)

    this.inputWrapper?.addEventListener("click", this.handleInputWrapperClick)
    this.searchInput?.addEventListener("input", this.handleSearchChange)
    this.searchInput?.addEventListener("click", this.handleSearchClick)
    this.searchInput?.addEventListener("focus", this.handleSearchFocus)
    this.searchInput?.addEventListener("invalid", this.handleInvalid)
    this.searchInput?.addEventListener("blur", this.handleBlur)
    this.menu?.addEventListener("click", this.handleMenuClick)
    this.menu?.addEventListener("change", this.handleMenuChange)
    this.labelEl?.addEventListener("click", this.handleLabelClick)
    this.innerContainer?.addEventListener("click", this.handleInnerContainerClick)
  }

  unbindEventListeners() {
    this.inputWrapper?.removeEventListener("click", this.handleInputWrapperClick)
    this.searchInput?.removeEventListener("input", this.handleSearchChange)
    this.searchInput?.removeEventListener("click", this.handleSearchClick)
    this.searchInput?.removeEventListener("focus", this.handleSearchFocus)
    this.searchInput?.removeEventListener("invalid", this.handleInvalid)
    this.searchInput?.removeEventListener("blur", this.handleBlur)
    this.menu?.removeEventListener("click", this.handleMenuClick)
    this.menu?.removeEventListener("change", this.handleMenuChange)
    this.portalShell?.removeEventListener("click", this.handleMenuClick)
    this.portalShell?.removeEventListener("change", this.handleMenuChange)
    this.labelEl?.removeEventListener("click", this.handleLabelClick)
    this.innerContainer?.removeEventListener("click", this.handleInnerContainerClick)
    window.removeEventListener("click", this.handleClickOutside)
  }

  bindClearApi() {
    if (!this.kitId) return
    this.clearSelection = this.clearSelection.bind(this)
    window[`clearMultiLevelSelect_${this.kitId}`] = this.clearSelection
  }

  unbindClearApi() {
    if (!this.kitId) return
    delete window[`clearMultiLevelSelect_${this.kitId}`]
  }

  handleLabelClick(event) {
    event.stopPropagation()
    this.searchInput?.focus()
    this.openDropdown()
  }

  handleSearchClick() {
    if (this.disabled) return
    this.openDropdown()
  }

  handleSearchFocus() {
    if (this.disabled) return
    this.openDropdown()
  }

  handleInputWrapperClick(event) {
    if (
      event.target.id === this.labelForId ||
      event.target.classList.contains("pb_form_pill_tag") ||
      this.disabled
    ) {
      return
    }
    if (event.target.closest("[data-pb-mls-pill]")) {
      return
    }
    this.toggleDropdown()
  }

  handleInnerContainerClick(event) {
    const close = event.target.closest(".pb_form_pill_close")
    if (!close) return
    const pill = close.closest("[data-pb-mls-pill]")
    const itemId = pill?.dataset.itemId
    if (itemId) this.handlePillClose(event, itemId)
  }

  handleSearchChange(event) {
    const inputText = event.target.value
    if (this.variant === "single") {
      modifyRecursive(this.formattedData, false)
      this.defaultReturn = []
      this.singleSelectedItem = { id: [], value: inputText, item: [] }
      this.filterItem = inputText
    } else {
      this.filterItem = inputText
    }
    this.renderSelectionUi()
    if (this.isDropdownClosed) {
      this.optionsDirty = true
      return
    }
    this.renderOptions()
  }

  handleClickOutside(event) {
    if (this.labelEl?.contains(event.target)) return

    const inPortaledMenu =
      this.portalShell?.contains(event.target) ?? false

    if (
      this.wrapper &&
      !this.wrapper.contains(event.target) &&
      !inPortaledMenu &&
      event.target.id !== this.arrowDownId &&
      event.target.id !== this.arrowUpId
    ) {
      this.closeDropdown()
    }
  }

  handleMenuClick(event) {
    const pillClose = event.target.closest(".pb_form_pill_close")
    if (pillClose) return

    const toggle = event.target.closest("[data-pb-mls-toggle-slot]")
    if (toggle) {
      event.preventDefault()
      event.stopPropagation()
      if (toggle.querySelector(".toggle_icon")) return
      const itemId = toggle.closest("[data-name]")?.dataset.name
      if (itemId) this.handleToggleClick(itemId)
    }
  }

  handleMenuChange(event) {
    const input = event.target
    if (!(input instanceof HTMLInputElement)) return
    const itemId = input.closest("[data-name]")?.dataset.name
    if (!itemId) return

    if (input.type === "radio") {
      this.handleRadioButtonClick(itemId, input.value)
      return
    }
    if (input.type === "checkbox") {
      this.handledropdownItemClick(itemId, input.checked)
    }
  }

  handleToggleClick(id) {
    const clickedItem = filterFormattedDataById(this.formattedData, id)
    if (!clickedItem[0]) return

    const clickedId = clickedItem[0].id
    if (this.expanded.has(clickedId)) {
      this.expanded.delete(clickedId)
    } else {
      this.expanded.add(clickedId)
    }
    this.renderOptions()
  }

  handledropdownItemClick(clickedItemId, check) {
    this.filterItem = ""
    const filtered = filterFormattedDataById(this.formattedData, clickedItemId)
    if (!filtered[0]) return
    const updatedTree = this.changeItem(filtered[0], check)
    this.formattedData = updatedTree
    this.syncSelectedCollections()
    this.render()
    this.emitChange()
  }

  handleRadioButtonClick(selectedItemID, inputText) {
    const clickedItem = filterFormattedDataById(
      this.formattedData,
      selectedItemID
    )
    if (clickedItem.length > 0 && clickedItem[0].disabled) {
      return
    }

    const treeWithNoSelections = modifyRecursive(this.formattedData, false)
    const treeWithSelectedItem = modifyValue(
      selectedItemID,
      treeWithNoSelections,
      true,
      "single"
    )
    const selectedItem = filterFormattedDataById(
      treeWithSelectedItem,
      selectedItemID
    )

    this.formattedData = treeWithSelectedItem
    this.singleSelectedItem = {
      id: [selectedItemID],
      value: inputText,
      item: selectedItem,
    }
    this.filterItem = ""
    this.syncSelectedCollections()
    this.closeDropdown()
    this.render()
    this.emitChange()
  }

  handlePillClose(event, itemId) {
    event.stopPropagation()
    const clickedItem = filterFormattedDataById(this.formattedData, itemId)
    if (!clickedItem[0]) return
    const updatedTree = this.changeItem(clickedItem[0], false)
    this.formattedData = updatedTree
    this.syncSelectedCollections()
    this.render()
    this.emitChange()
  }

  changeItem(item, check) {
    const tree = cloneTree(this.formattedData)
    if (this.returnAllSelected) {
      return modifyValue(item.id, tree, check, this.variant)
    }
    if (check) {
      const checkedTree = modifyValue(item.id, tree, true, this.variant)
      return recursiveCheckParent(item, checkedTree)
    }
    const uncheckedTree = modifyValue(item.id, tree, false, this.variant)
    return getAncestorsOfUnchecked(uncheckedTree, item)
  }

  clearSelection() {
    const resetData = modifyRecursive(this.formattedData, false)
    this.formattedData = resetData
    this.returnedArray = []
    this.defaultReturn = []
    this.singleSelectedItem = { id: [], value: "", item: [] }
    this.filterItem = ""
    this.render()
    this.emitChange()
  }

  emitChange() {
    this.clearError()
    this.element.dispatchEvent(
      new CustomEvent("pb-multi-level-select-change", {
        bubbles: true,
        detail: { name: this.fieldName, value: this.currentSelected() },
      })
    )
  }

  toggleDropdown() {
    if (this.isDropdownClosed) {
      this.openDropdown()
    } else {
      this.closeDropdown()
    }
  }

  openDropdown() {
    if (this.disabled || !this.isDropdownClosed) return
    this.isDropdownClosed = false
    this.mountPortalMenu()
    this.updateOpenUi()
    if (this.optionsDirty) {
      this.renderOptions()
      this.optionsDirty = false
    }
    this.repositionPortal()
    window.addEventListener("click", this.handleClickOutside)
  }

  closeDropdown() {
    if (this.isDropdownClosed) return
    this.isDropdownClosed = true
    this.unmountPortalMenu()
    this.updateOpenUi()
    window.removeEventListener("click", this.handleClickOutside)
  }

  updateOpenUi() {
    const closed = this.isDropdownClosed
    this.menu?.classList.toggle("close", closed)
    this.menu?.classList.toggle("open", !closed)
    if (this.arrowDown) this.arrowDown.style.display = closed ? "" : "none"
    if (this.arrowUp) this.arrowUp.style.display = closed ? "none" : ""
  }

  isTreeRowExpanded(item) {
    return this.expanded.has(item.id)
  }

  render() {
    this.renderSelectionUi()
    this.updateOpenUi()
    if (this.isDropdownClosed) {
      this.optionsDirty = true
      return
    }
    this.renderOptions()
    this.optionsDirty = false
    this.repositionPortal()
  }

  renderSelectionUi() {
    if (!this.innerContainer || !this.searchInput) return

    this.innerContainer
      .querySelectorAll("[data-pb-mls-hidden], [data-pb-mls-pill], .mls-pill-break")
      .forEach((node) => node.remove())

    const selected = this.currentSelected()
    const fragment = document.createDocumentFragment()

    selected.forEach((item) => {
      const hidden = document.createElement("input")
      hidden.type = "hidden"
      hidden.dataset.pbMlsHidden = "true"
      hidden.name = this.fieldName ? `${this.fieldName}[]` : ""
      hidden.value = item.id
      if (this.disabled) hidden.disabled = true
      if (this.required) hidden.required = true
      fragment.appendChild(hidden)
    })

    if (
      this.variant !== "single" &&
      this.inputDisplay === "pills" &&
      selected.length
    ) {
      selected.forEach((item) => {
        const pill = this.buildPill(item)
        if (pill) fragment.appendChild(pill)
      })
      const br = document.createElement("br")
      br.className = "mls-pill-break"
      fragment.appendChild(br)
    }

    this.innerContainer.insertBefore(fragment, this.searchInput)

    if (this.variant === "single") {
      this.searchInput.value = this.singleSelectedItem.value || this.filterItem
    } else {
      this.searchInput.value = this.filterItem
    }

    const count = selected.length
    this.searchInput.placeholder =
      this.inputDisplay === "none" && count
        ? `${count} ${count === 1 ? "item" : "items"} selected`
        : this.placeholderText
  }

  buildPill(item) {
    if (!this.pillTemplate) return null
    const node = this.pillTemplate.content.cloneNode(true)
    const pill = node.querySelector("[class*='pb_form_pill']")
    if (!pill) return null
    pill.dataset.pbMlsPill = "true"
    pill.dataset.itemId = item.id
    const tag = pill.querySelector(".pb_form_pill_tag")
    if (tag) tag.textContent = item.label
    return pill
  }

  renderOptions() {
    if (!this.menu) return
    const items = this.filterItem
      ? findByFilter(this.formattedData, this.filterItem)
      : this.formattedData
    this.menu.replaceChildren(this.buildOptionsList(items))
    this.optionsDirty = false
  }

  buildOptionsList(items) {
    const list = document.createElement("ul")
    list.className = "pb_multi_level_select_options"
    if (!Array.isArray(items)) return list

    items.forEach((item) => {
      list.appendChild(this.buildOptionRow(item))
    })
    return list
  }

  buildOptionRow(item) {
    const template = this.rowTemplateFor(item)
    const fragment = template.content.cloneNode(true)
    const wrapper = fragment.firstElementChild
    const li = wrapper.querySelector(".dropdown_item")
    li.dataset.name = item.id

    this.fillToggle(wrapper, item)
    this.fillControl(wrapper, item)
    this.fillNested(wrapper, item)
    return wrapper
  }

  rowTemplateFor(item) {
    if (this.variant === "single") {
      return item.hideRadio ? this.hideRadioRowTemplate : this.radioRowTemplate
    }
    return this.checkboxRowTemplate
  }

  fillToggle(wrapper, item) {
    const slot = wrapper.querySelector("[data-pb-mls-toggle-slot]")
    if (!slot) return

    const showToggle = item.parent_id || item.children
    if (!showToggle) {
      slot.remove()
      return
    }

    const expanded = this.isTreeRowExpanded(item)
    const chevronTemplate = expanded
      ? this.chevronDownTemplate
      : this.chevronRightTemplate
    slot.appendChild(chevronTemplate.content.cloneNode(true))

    if (!(item.children && item.children.length > 0)) {
      const buttonKit = slot.querySelector("[class*='pb_circle_icon_button']")
      buttonKit?.classList.add("toggle_icon")
    }
  }

  fillControl(wrapper, item) {
    if (this.variant === "single" && item.hideRadio) {
      const body = wrapper.querySelector(".dropdown_item_checkbox_row [class*='pb_body']")
      if (body) body.textContent = item.label
      return
    }

    if (this.variant === "single") {
      const radio = wrapper.querySelector("input[type='radio']")
      const label = wrapper.querySelector("[class*='pb_radio'] [class*='pb_body']")
      if (radio) {
        radio.id = item.id
        radio.value = item.label
        radio.checked = Boolean(item.checked)
        radio.disabled = Boolean(item.disabled)
        radio.name = this.inputName || `mls_radio_${this.kitId || this.labelForId}`
      }
      if (label) label.textContent = item.label
      return
    }

    const checkbox = wrapper.querySelector("input[type='checkbox']")
    const kit = wrapper.querySelector("[class*='pb_checkbox_kit']")
    const label = wrapper.querySelector(".pb_checkbox_label [class*='pb_body']")
    if (checkbox) {
      checkbox.id = item.id
      checkbox.name = item.label
      checkbox.value = item.label
      checkbox.checked = Boolean(item.checked)
      checkbox.disabled = Boolean(item.disabled)
    }
    if (kit) {
      kit.classList.toggle("pb_checkbox_kit_on", Boolean(item.checked))
      kit.classList.toggle("pb_checkbox_kit_off", !item.checked)
    }
    if (label) label.textContent = item.label
  }

  fillNested(wrapper, item) {
    const nested = wrapper.querySelector("[data-pb-mls-nested]")
    if (!nested) return
    const showChildren =
      this.isTreeRowExpanded(item) &&
      item.children &&
      item.children.length > 0 &&
      (this.variant === "single" || !this.filterItem)

    if (!showChildren) {
      nested.remove()
      return
    }
    nested.appendChild(this.buildOptionsList(item.children))
  }

  ensureFloatingPortalConfig() {
    if (!this._floatingResolved) {
      const needsPortal = kitRequiresPortaledFloatingUi(this.element)
      this.portalHost = needsPortal
        ? resolvePortaledKitHost(this.element, null)
        : null
      this.useMenuPortal = Boolean(this.portalHost)
      this._floatingResolved = true
    }
    this.floatingOwnerId = resolveFloatingOwnerId(this.element)
  }

  mountPortalMenu() {
    this.ensureFloatingPortalConfig()
    if (!this.useMenuPortal || !this.portalHost || !this.menu) return
    if (this.menu.dataset.pbMlsPortaled === "true") return

    this._portalParent = this.menu.parentNode
    this._portalNext = this.menu.nextSibling

    const shell = document.createElement("div")
    const shellClasses = [
      "pb_multi_level_select",
      "pb_multi_level_select_floating_shell",
    ]
    if (this.element.classList.contains("dark")) shellClasses.push("dark")
    shell.className = shellClasses.join(" ")
    shell.style.margin = "0"
    setFloatingOwnerAttribute(shell, this.floatingOwnerId)

    this.menu.removeEventListener("click", this.handleMenuClick)
    this.menu.removeEventListener("change", this.handleMenuChange)
    shell.appendChild(this.menu)
    shell.addEventListener("click", this.handleMenuClick)
    shell.addEventListener("change", this.handleMenuChange)
    this.portalHost.appendChild(shell)
    this.portalShell = shell
    this.menu.dataset.pbMlsPortaled = "true"

    this.boundApplyPortalPosition = () => this.repositionPortal()
    this._unsubscribePortalReposition = subscribeFloatingKitReposition(
      this.boundApplyPortalPosition
    )
  }

  unmountPortalMenu() {
    this._unsubscribePortalReposition?.()
    this._unsubscribePortalReposition = null

    if (!this.menu || this.menu.dataset.pbMlsPortaled !== "true") return

    this.portalShell?.removeEventListener("click", this.handleMenuClick)
    this.portalShell?.removeEventListener("change", this.handleMenuChange)
    delete this.menu.dataset.pbMlsPortaled
    this.clearPortalPanelStyles(this.portalShell)

    if (this.menu.parentNode === this.portalShell && this._portalParent) {
      if (this._portalNext && this._portalNext.parentNode === this._portalParent) {
        this._portalParent.insertBefore(this.menu, this._portalNext)
      } else {
        this._portalParent.appendChild(this.menu)
      }
    }
    this.menu.addEventListener("click", this.handleMenuClick)
    this.menu.addEventListener("change", this.handleMenuChange)

    this._portalParent = null
    this._portalNext = null
    this.portalShell?.remove()
    this.portalShell = null
  }

  clearPortalPanelStyles(panel) {
    if (!panel) return
    ;["position", "left", "top", "width", "margin", "pointer-events", "z-index"].forEach(
      (prop) => panel.style.removeProperty(prop)
    )
    this.menu?.style.removeProperty("max-height")
    this.menu?.style.removeProperty("overflow")
  }

  repositionPortal() {
    if (
      this.isDropdownClosed ||
      !this.portalHost ||
      !this.portalShell ||
      !this.wrapper
    ) {
      return
    }
    const rect = this.wrapper.getBoundingClientRect()
    const maxH = Math.max(120, window.innerHeight - rect.bottom - 8)
    positionFloatingShellToInput({
      shell: this.portalShell,
      inputViewportRect: rect,
      menuEl: this.menu,
      maxMenuHeightPx: maxH,
      positionHost: this.portalHost,
    })
  }

  get target() {
    return this.element.querySelector(".pb_body_kit_negative")
  }

  handleInvalid() {
    this.handleErrorLabel(300)
  }

  handleBlur() {
    this.justBlurred = true
    setTimeout(() => {
      this.justBlurred = false
    }, 300)
  }

  handleErrorLabel(delay, attempts = 0) {
    if (attempts > 20) return
    setTimeout(() => {
      const errorLabelElement = this.target
      if (errorLabelElement) {
        errorLabelElement.remove()
        if (this.wrapper) {
          this.wrapper.querySelector(".pb_body_kit_negative")?.remove()
          this.wrapper.appendChild(errorLabelElement)
        }
        this.element.classList.add("error")
      } else {
        this.handleErrorLabel(100, attempts + 1)
      }
    }, delay)
  }

  observeRogueErrorInsideInnerContainer() {
    if (!this.innerContainer || !this.required) return

    this.rogueErrorObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains("pb_body_kit_negative")
          ) {
            if (this.justBlurred) {
              node.remove()
            }
          }
        }
      }
    })

    this.rogueErrorObserver.observe(this.innerContainer, {
      childList: true,
      subtree: true,
    })
  }

  clearError() {
    const errorLabelElement = this.target
    if (errorLabelElement) {
      errorLabelElement.remove()
      this.element.classList.remove("error")
    }
  }
}
