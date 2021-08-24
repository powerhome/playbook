[![npm version](https://badge.fury.io/js/playbook-ui.svg)](https://badge.fury.io/js/playbook-ui)
[![Gem Version](https://badge.fury.io/rb/playbook_ui.svg)](https://badge.fury.io/rb/playbook_ui)

# Playbook Design System

Playbook is the first design system built for both Rails & React interfaces. Inspired by [Velocity](https://www.invisionapp.com/inside-design/design-resources/design-system-dashboard-ui-kit/), Playbook takes a modern design approach and applies it in a way that makes it easy to support bleeding edge or legacy systems. Playbook is built & maintained by the User Experience & Development teams at [Power Home Remodeling](https://www.techatpower.com/), the largest home remodeler in the US.

## Development

### Requirements

- [asdf](https://github.com/asdf-vm/asdf)
- Install language tools: `asdf install`
- `asdf plugin add ruby`
- `asdf plugin add yarn`
- `asdf plugin add nodejs`

### Getting Started and Running Playbook for Development

1. After cloning the repo, you should have the following nested folders among other files. It will be important to pay attention to which folder we are in as we get playbook running:
    ```
    playbook
    │   playbook
    │   playbook-website
    ```
2. From the top-level playbook folder run: `yarn install && yarn prepare`
4. cd into the playbook-website folder: `cd playbook-website`
5. From the playbook-website folder run: `bundle install`
6. From the playbook folder run: `bundle install
    **n.b.:** If you receive a bundle(r) related error, be sure that bundler is installed first. See the BUNDLED WITH section of `playbook-website/Gemfile.lock` for the exact version to install.
7. For example, if the version from above is `2.2.11` then you would run `gem install bundler -v 2.2.11` then proceed with `bundle install` afterwards.
7. cd back into the top-level playbook folder: `cd ..`
8. From the top-level playbook folder run `yarn start-dev` This may take a little while.
9. Once it says "compiled successfully", navigate to [http://localhost:3000](http://localhost:3000) and you should see the playbook website.

### Running Library Tests

1. `cd playbook && ./test.sh`

---

## Additional Resources

### Adding NPM Dependencies

1. You need to be working in `playbook/playbook` or `playbook/playbook-website` subdirectory
1. run `yarn workspace playbook-website add <lib name>` to add to the website
1. run `yarn workspace playbook-ui add <lib name>` to add to the kit source
1. run `yarn workspace playbook-project add <lib name>` to add to the main project

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
