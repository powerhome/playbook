// mcp-ui host resize for opaque-origin srcdoc iframes.
// @mcp-ui/client cannot measure the iframe; it only grows when content posts
// ui-size-change. Loaded as an external script (CSP blocks inline JS).
(function () {
  function reportSize() {
    var h =
      (document.documentElement && document.documentElement.scrollHeight) ||
      (document.body && document.body.scrollHeight) ||
      0;
    if (!h || !window.parent || window.parent === window) return;
    window.parent.postMessage(
      { type: "ui-size-change", payload: { height: h } },
      "*"
    );
  }

  window.addEventListener("load", reportSize);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(reportSize).observe(document.documentElement);
  }
  if (document.readyState === "complete") {
    reportSize();
  } else {
    document.addEventListener("DOMContentLoaded", reportSize);
  }
})();
