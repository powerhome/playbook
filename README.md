[![npm version](https://badge.fury.io/js/playbook-ui.svg)](https://badge.fury.io/js/playbook-ui)
[![Gem Version](https://badge.fury.io/rb/playbook_ui.svg)](https://badge.fury.io/rb/playbook_ui)

# Playbook Design System

Playbook is the first design system built for both Rails & React interfaces. Inspired by [Velocity](https://www.invisionapp.com/inside-design/design-resources/design-system-dashboard-ui-kit/), Playbook takes a modern design approach, and applies it in a way that makes it easy to support bleeding edge, or legacy systems. Playbook is built & maintained by the User Experience & Development teams at Power Home Remodeling, the largest home remodeler in the US.

## Requirements

- Docker 17.09 or later
- Docker Compose 1.17.1 or later

## Getting started

1. run `yarn && bundle`
1. Install overcommit hooks `bin/overcommit`
1. run `bin/rails s`
1. run `./bin/webpack-dev-server`
3. open [http://localhost:3000](http://localhost:3000)

<details><summary>Making changes to the Gemfile:</summary>
<p>

* Kill the `rails` Ctrl + C
* `bundle`
* Re-start the server with `bin/rails s`

To run the tests, do `bin/test`.

</p>
</details>

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
1.  Inside of your Playbook repository, run `yarn link`. 
2.  Inside of the directory you want to test with playbook, run `yarn link playbook-ui`.
3.  Run `yarn hmr` in your directory you want to test with playbook, and hard refresh (command + shift + R) your browser.
4.  Test all the things!
5.  When finished, inside of the directory you want to test with playbook, run `yarn unlink playbook-ui`.
6.  Inside of your Playbook repository, run `yarn unlink`. 

#### Jest & React-Testing-Library for Writing Tests

We are currently backfilling test cases for React kit test coverage using Jest and React Testing Library. More additions and enhancements
to the testing libraries are currently in the works. In the meantime, please take a look at these resources:

- https://github.com/testing-library/jest-dom#usage for useage and examples
- https://jestjs.io/docs/en/using-matchers

When a new kit is generated, a placeholder React kit test will also be created. You can run all the tests with `yarn test`.

### Important Note

Keep in mind: Styles are brought in from playbook through the rails gem, so you will not be able to test scss updates with yarn linking.
