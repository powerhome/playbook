[![npm version](https://badge.fury.io/js/playbook-ui.svg)](https://badge.fury.io/js/playbook-ui)
[![Gem Version](https://badge.fury.io/rb/playbook_ui.svg)](https://badge.fury.io/rb/playbook_ui)

# Playbook Design System

Playbook is the first design system built for both Rails & React interfaces. Inspired by [Velocity](https://www.invisionapp.com/inside-design/design-resources/design-system-dashboard-ui-kit/), Playbook takes a modern design approach and applies it in a way that makes it easy to support bleeding edge or legacy systems. Playbook is built & maintained by the User Experience & Development teams at [Power Home Remodeling](https://www.techatpower.com/), the largest home remodeler in the US.

## Development

### Requirements

- [asdf](https://github.com/asdf-vm/asdf)
- `asdf install`
- Install overcommit hooks `bin/overcommit`

### Getting started

1. `yarn install` to install all projects dependencies
1. `yarn watch-all` to start watchers

### Running the website

1. From another terminal, go to `playbook-webiste`
1. `bundle install`
1. `rails server`
1. open [http://localhost:3000](http://localhost:3000)

### Running tests

Run `test.sh` from the `playbook` directory.

## Additional resources

### Upgrading between versions

See [docs/upgrade-guide](./docs/upgrade-guide)

### Releases

* [Playbook Releases](https://github.com/powerhome/playbook/wiki/Playbook-Releases)

### Development Environment

* [Common Errors & Solutions](https://github.com/powerhome/playbook/wiki/Common-Errors-&-Solutions)

### Building Playbook Kits

* [Generating a Kit](https://github.com/powerhome/playbook/wiki/Generating-a-Kit)
* [Rails Kit](https://github.com/powerhome/playbook/wiki/Rails-Kit)
* [Rails Kit Helpers](https://github.com/powerhome/playbook/wiki/Rails-Kit-Helpers)
* [Using a Kit within a Kit](https://github.com/powerhome/playbook/wiki/Using-a-Kit-within-a-Kit)
* [Understanding Rails Kit HTML Wrapper](https://github.com/powerhome/playbook/wiki/Understanding-Rails-Kit-HTML-Wrapper)
* [Kit Stylesheet](https://github.com/powerhome/playbook/wiki/Kit-Stylesheet)

### Testing Playbook Kits Locally

#### Testing React Kits locally

1.  From inside the `playbook-ui` directory, run `yarn link`;
1.  From Inside the project you want to test with `playbook-ui`, run `yarn link playbook-ui`;
1.  Rebuild the project now using this version of `playbook-ui`;
1.  Test all the things!
1.  When finished, from inside the project you were testing with `playbook-ui`, run `yarn unlink playbook-ui`;
1.  From Inside the `playbook-ui` directory, run `yarn unlink`;

#### Jest & React-Testing-Library for Writing Tests

We are currently backfilling test cases for React kit test coverage using Jest and React Testing Library. More additions and enhancements
to the testing libraries are currently in the works. In the meantime, please take a look at these resources:

- https://github.com/testing-library/jest-dom#usage for useage and examples
- https://jestjs.io/docs/en/using-matchers

When a new kit is generated, a placeholder React kit test will also be created. You can run all the tests with `yarn test`.

### Important Note

Keep in mind: Styles are brought in from playbook through the rails gem, so you will not be able to test scss updates with yarn linking.
