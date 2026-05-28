# Pages Folder

The `pages` folder contains route-level views for the React Router website app.
Routes are defined in [`../app.tsx`](../app.tsx), not in legacy packs. Page
components receive data through the loaders in [`../hooks/loaders.ts`](../hooks/loaders.ts)
and compose shared UI from `src/components`.

Important pages:

- `Home` renders the website landing experience.
- `ComponentList` and `CategoryShow` render kit index/category routes.
- `KitShow` renders individual kit docs, props, and currently hidden playground
  surfaces.
- `Changelog` renders web, Swift, and Figma changelogs with shared markdown
  rendering.
- `GettingStarted`, `GuidePage`, and `DesignGuidelines` render guide content.
- `IconList` and the icons route render Playbook icon documentation.

## Kit Show Anchors

`KitShow/Tabs/DocsTab.tsx` gives each doc example a DOM id from
`example.example_key`. The link icon next to an example title copies a URL with
that hash and updates the current URL. When a copied URL is opened,
`KitShow/anchors.ts` scrolls the internal website scroll container to the
matching example after the docs have rendered.

The right-side docs nav (`KitShow/RightSideNav`) is only an in-page scroll
control. It intentionally does not create or mutate shareable URLs.
