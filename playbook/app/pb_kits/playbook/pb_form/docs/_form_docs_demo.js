window.PbFormDocsDemo = window.PbFormDocsDemo || function (demoId) {
  var root = document.querySelector('[data-form-docs-demo="' + demoId + '"]')
  if (!root || root.dataset.pbFormDocsReady === "true") return
  root.dataset.pbFormDocsReady = "true"

  var dataOutput = root.querySelector("[data-form-docs-output]")
  var emptyState = root.querySelector("[data-form-docs-empty]")
  var codeOutput = root.querySelector("[data-form-docs-code]")
  var validate = root.getAttribute("data-form-docs-validate") === "true"
  var scope = root.getAttribute("data-form-docs-scope") || demoId
  var formOpen = validate
    ? '<%= pb_form_with(scope: :' + scope + ', url: "", method: :get, validate: true) do |form| %>'
    : '<%= pb_form_with(scope: :' + scope + ', url: "", method: :get) do |form| %>'
  var formClose = [
    "  <%= form.actions do |action| %>",
    "    <%= action.submit %>",
    '    <%= action.button props: { type: "reset", text: "Cancel", variant: "secondary" } %>',
    "  <% end %>",
    "<% end %>",
  ].join("\n")

  function clearSubmittedData() {
    if (dataOutput) {
      dataOutput.textContent = ""
      dataOutput.style.display = "none"
    }
    if (emptyState) emptyState.style.display = ""
  }

  function setPillActive(pillEl, active) {
    var kit = pillEl.querySelector("[class*='pb_pill_kit_']")
    if (!kit) return
    kit.className = kit.className
      .replace(/pb_pill_kit_primary_/g, "pb_pill_kit_TEMP_")
      .replace(/pb_pill_kit_neutral_/g, active ? "pb_pill_kit_primary_" : "pb_pill_kit_neutral_")
      .replace(/pb_pill_kit_TEMP_/g, active ? "pb_pill_kit_primary_" : "pb_pill_kit_neutral_")
  }

  function setPanelEnabled(panel, enabled) {
    panel.style.display = enabled ? "" : "none"
    panel.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.disabled = !enabled
    })
  }

  function selectedKeys() {
    var keys = []
    root.querySelectorAll("[data-form-docs-pill]").forEach(function (pillEl) {
      var kit = pillEl.querySelector("[class*='pb_pill_kit_primary_']")
      if (kit) keys.push(pillEl.getAttribute("data-form-docs-pill"))
    })
    return keys
  }

  function updateCodeSnippet(keys) {
    if (!codeOutput) return

    // Match visible panel order (fixed kit order), not click/selection order.
    var selected = {}
    keys.forEach(function (key) { selected[key] = true })

    var fieldSnippets = []
    root.querySelectorAll("[data-form-docs-panel]").forEach(function (panel) {
      var key = panel.getAttribute("data-form-docs-panel")
      if (!selected[key]) return
      var snippetEl = panel.querySelector("[data-form-docs-snippet]")
      if (snippetEl) fieldSnippets.push(snippetEl.textContent.replace(/^\n+|\n+$/g, ""))
    })

    codeOutput.textContent = [formOpen].concat(fieldSnippets).concat([formClose]).join("\n")
  }

  function syncSelection(keys) {
    root.querySelectorAll("[data-form-docs-pill]").forEach(function (pillEl) {
      var key = pillEl.getAttribute("data-form-docs-pill")
      setPillActive(pillEl, keys.indexOf(key) !== -1)
    })
    root.querySelectorAll("[data-form-docs-panel]").forEach(function (panel) {
      var key = panel.getAttribute("data-form-docs-panel")
      setPanelEnabled(panel, keys.indexOf(key) !== -1)
    })
    updateCodeSnippet(keys)
    clearSubmittedData()
  }

  function toggleKey(key) {
    var keys = selectedKeys()
    var index = keys.indexOf(key)
    if (index === -1) {
      keys.push(key)
    } else if (keys.length > 1) {
      keys.splice(index, 1)
    }
    syncSelection(keys)
  }

  function assignFormValue(result, key, value) {
    var path = []
    var asArray = false
    var rest = key
    var bareMatch = rest.match(/^([^[\]]+)/)

    if (!bareMatch) {
      result[key] = value
      return
    }

    path.push(bareMatch[1])
    rest = rest.slice(bareMatch[1].length)

    while (rest.length > 0) {
      if (rest.indexOf("[]") === 0) {
        asArray = true
        rest = rest.slice(2)
        break
      }

      var bracketMatch = rest.match(/^\[([^\]]+)\]/)
      if (!bracketMatch) {
        result[key] = value
        return
      }

      path.push(bracketMatch[1])
      rest = rest.slice(bracketMatch[0].length)
    }

    if (rest.length > 0) {
      result[key] = value
      return
    }

    var cursor = result
    for (var i = 0; i < path.length - 1; i++) {
      var segment = path[i]
      if (!cursor[segment] || typeof cursor[segment] !== "object" || Array.isArray(cursor[segment])) {
        cursor[segment] = {}
      }
      cursor = cursor[segment]
    }

    var last = path[path.length - 1]
    if (asArray) {
      if (!Array.isArray(cursor[last])) cursor[last] = []
      cursor[last].push(value)
    } else if (Object.prototype.hasOwnProperty.call(cursor, last)) {
      if (!Array.isArray(cursor[last])) cursor[last] = [cursor[last]]
      cursor[last].push(value)
    } else {
      cursor[last] = value
    }
  }

  function formDataToObject(form) {
    var result = {}
    var formData = new FormData(form)

    formData.forEach(function (value, key) {
      if (key === "authenticity_token" || key === "utf8" || key === "_method") return
      assignFormValue(result, key, value)
    })

    return result
  }

  function showSubmittedData(data) {
    if (emptyState) emptyState.style.display = "none"
    if (dataOutput) {
      dataOutput.style.display = ""
      dataOutput.textContent = JSON.stringify(data, null, 2)
    }
  }

  root.querySelectorAll("[data-form-docs-pill]").forEach(function (pillEl) {
    pillEl.addEventListener("click", function () {
      toggleKey(pillEl.getAttribute("data-form-docs-pill"))
    })
    pillEl.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return
      event.preventDefault()
      toggleKey(pillEl.getAttribute("data-form-docs-pill"))
    })
  })

  root.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault()
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return
      showSubmittedData(formDataToObject(form))
    })

    form.addEventListener("reset", function () {
      setTimeout(clearSubmittedData, 0)
    })
  })

  syncSelection(selectedKeys())
}
