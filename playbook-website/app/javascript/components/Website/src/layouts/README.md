# Layouts Folder

The `layouts` folder contains the persistent website shell pieces used around
the route-level pages: `Header`, `Sidebar`, `LayoutRight`, and `Footer`.

`LayoutRight` owns the main content scroll container. Its element uses the
`pb--page--content--main` class and scrolls to top when `location.pathname`
changes. Code that needs to scroll within a page, including kit-doc deep links,
should target that container instead of assuming `window` is the scrollport.

`Header` and `Sidebar` receive route loader data from the root website shell and
should stay focused on navigation/search/platform context rather than page
content.
