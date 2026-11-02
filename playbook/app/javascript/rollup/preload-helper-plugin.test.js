const preloadHelper = require("./preload-helper-plugin");

const renameChunks = (bundle) => {
  const plugin = preloadHelper();
  plugin.generateBundle.handler({}, bundle);
  return bundle;
};

describe("preloadHelper", () => {
  test("runs after Vite injects its preload helper", () => {
    expect(preloadHelper().generateBundle.order).toBe("post");
  });

  test("renames __vitePreload in every chunk so a consumer Vite build does not redeclare it", () => {
    const bundle = {
      "playbook-rails.js": {
        type: "chunk",
        code: "const __vitePreload = () => {}; __vitePreload(() => import('./chunks/index.js'))",
      },
      "chunks/index.js": {
        type: "chunk",
        code: "export const ready = __vitePreload",
      },
    };

    renameChunks(bundle);

    expect(bundle["playbook-rails.js"].code).toBe(
      "const __pbViPreload = () => {}; __pbViPreload(() => import('./chunks/index.js'))"
    );
    expect(bundle["chunks/index.js"].code).toBe("export const ready = __pbViPreload");
    expect(JSON.stringify(bundle)).not.toContain("__vitePreload");
  });

  test("leaves assets alone", () => {
    const bundle = {
      "playbook.css": {
        type: "asset",
        source: "/* __vitePreload */",
      },
    };

    renameChunks(bundle);

    expect(bundle["playbook.css"].source).toBe("/* __vitePreload */");
  });

  test("keeps the new name the same length so source map columns stay aligned", () => {
    const bundle = {
      "entry.js": {
        type: "chunk",
        code: "__vitePreload",
      },
    };

    renameChunks(bundle);

    expect(bundle["entry.js"].code).toHaveLength("__vitePreload".length);
    expect(bundle["entry.js"].code).not.toBe("__vitePreload");
  });
});
