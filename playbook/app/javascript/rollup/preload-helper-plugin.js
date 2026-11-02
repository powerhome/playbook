// Vite wraps dynamic import() calls in its __vitePreload helper. Shipped inside our prebuilt dist,
// that helper collides with the one a consumer's Vite injects when it re-bundles the file (its
// duplicate check looks for `const __vitePreload =`, which minification breaks), failing the build
// with `Identifier "__vitePreload" has already been declared`. Renaming ours lets the consumer's
// bundler wrap the plain import() calls with its own helper and chunk paths. The new name keeps the
// same length so source map columns stay accurate.
function preloadHelper() {
    return {
        name: 'preloadHelper',
        generateBundle: {
          order: 'post',
          handler(_options, bundle) {
            Object.values(bundle).forEach((file) => {
              if (file.type === 'chunk') file.code = file.code.replaceAll('__vitePreload', '__pbViPreload')
            })
          },
        },
    }
}

module.exports = preloadHelper
