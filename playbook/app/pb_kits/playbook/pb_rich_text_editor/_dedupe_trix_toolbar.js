if (window?.customElements) {
  const customElemDef = window.customElements.define
  window.customElements.define = (name, cl, conf) => {
    if (!customElements.get(name)) customElemDef.call(window.customElements, name, cl, conf)
  }
}
