# Website Folder

This directory contains the React frontend for the Playbook website. It is the
beta/current website experience and owns the app shell, route tree, shared
components, layouts, route loaders, and page-level views used by
`playbook-website`.

The React Router entry is [`src/app.tsx`](./src/app.tsx). It exports `Website`,
which is registered from
[`../../entrypoints/application.js`](../../entrypoints/application.js). The
shell component lives in [`index.tsx`](./index.tsx); it provides platform and
dark-mode context, the header, sidebar, mobile nav, and the main content
scrollport.

See the READMEs of the subfolders:

- [assets](./src/assets/README.md)
- [components](./src/components/README.md)
- [hooks](./src/hooks/README.md)
- [layouts](./src/layouts/README.md)
- [pages](./src/pages/README.md)
