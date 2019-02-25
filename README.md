# UI Playbook

UIX Styleguide & Documentation

#### Demo
[View Demo](http://afternoon-refuge-87160.herokuapp.com/)

## Requirements

- Docker 17.09 or later
- Docker Compose 1.17.1 or later

## Getting started

1. Run `make start`
1. Bootstrap the database: `docker-compose run web bin/rails db:setup`
1. open [http://localhost:8080](http://localhost:8080)

When making changes to the Gemfile:

* Stop the `make start` process
* Run `make bundle` to (un-)install gems and update the `Gemfile.lock`
* Re-start the server with `make start`

To run the tests, do `make test`. To launch a shell in the container run `make shell`, or to launch a Rails console run `make console`

To clean up this project from your local machine, run `make stop`, which will drop all containers and networks associated with this project. To purge all resources, do `make clean`, which also removes images and volumes for a blank slate.

### Configuration

The application is configured through a set of environment variables which can be tweaked in the `.env` file for local development; these should not be committed unless they are generally applicable.

## Deployments

* A staging environment is automatically deployed on every master build. Manual deployments are possible (via `make deploy environment=staging tag=PR-X-$SHA1-$BUILDNUMBER`) but are discouraged.
* A production environment that is automatically deployed on every master build. Manual deployments are strongly discouraged.

These environments are deployed from the same container used for local development, which is built by CI on every commit.

In order to work with these, you'll need to have [setup APP access](https://github.com/powerhome/APP#getting-access).

### Configuring the application deployed to APP

The Helm chart stored in `charts/playbook` defines the resource types deployed to the application platform as templates which are customised with specific values for each environment. The standard values are held in `charts/playbook/values.yaml`, while per-environment overrides (including secrets) are stored in `config/deploy/[environment]/[values|secrets].yaml`. Standard values are in plain text, while secrets (API keys etc) are encrypted (more below). These templates and values may be modified to affect the deployment, but attention must be given to any template or defaults changes to ensure they apply correctly to all environments, and also to minimizing the differences between environments where possible.

The most common changes expected to be required are to the set of environment variables passed to the app at runtime. These values are passed to the app via the `spec -> template -> spec -> containers -> env` entry in the deployment template, where the values are extracted from those provided to the template or from a Kubernetes Secret. In the plain-text case, the values simply need to be defined in a values.yaml to be interpolated. In the case of secrets, they must be first passed into the secret template. Examples of both exist and should be followed.

#### Dealing with encrypted secrets

Encrypted secrets are perhaps the most complex part of the deployment setup. These secrets must be known to the app at runtime, for example to connect to the Nitro API, and must be included in the application repository in order to simplify coordination of configuration changes, but must not be stored at rest in plain text. They are thus encrypted in `secrets.yaml` files in the git repository, in such a way that developers can decrypt them (to make changes) and Jenkins can decrypt them (to pass to Helm for deployment). The encryption is done using GPG keys using [`helm-secrets`](https://github.com/futuresimple/helm-secrets) and [`sops`](https://github.com/mozilla/sops).

To begin managing secrets, one must install these dependencies (for local use) or use the `make secrets` container to manage them. An example of usage of the container:

```
[Thu Feb 22 08:59:09]$ make secrets
docker run --tty --interactive --rm --volume ~/.kube:/root/.kube --volume ~/.gnupg/secring.gpg:/root/.gnupg/secring.gpg --volume ~/.gnupg/pubring.gpg:/root/.gnupg/pubring.gpg --volume ~/.gnupg/private-keys-v1.d:/root/.gnupg/private-keys-v1.d --volume /Users/garettarrowood/Power/playbook:/app --entrypoint /bin/gpg-agent-background docker-registry.powerhrg.com/platform/deployer:master-6cf477240dd6b4f180f0f8da980805ddf6fc4fe0-18 bash --login
root@4ead1d121f65:/app# helm secrets view config/deploy/staging/secrets.yaml
```

#### Common tasks:

##### Requesting access to secrets

1. Find your GPG key fingerprint using `gpg --list-secret-keys`. Generate a key if you don't already have one (see https://help.github.com/articles/generating-a-new-gpg-key/).
1. Add your key to the keyring: `make addKeyToRing fingerprint=[FINGERPRINT]`
1. Include your key fingerprint in `.sops.yaml`.
1. Submit a PR including these changes.
1. Ask someone who already has access to follow the grant routine below.

##### Granting access to secrets

1. Checkout the access request PR.
1. Run `make grantSecretAccess fingerprint=[THE REQUESTED FINGERPRINT]`.
1. Commit the changes to `secrets.yaml` files that result and push to the PR.
1. Ask the requester to confirm they can read the secrets, then merge the PR.

##### Reading secrets

Run `helm secrets view config/deploy/[ENVIRONMENT]/secrets.yaml`.

##### Editing secrets

1. Run `helm secrets edit config/deploy/[ENVIRONMENT]/secrets.yaml`.
1. Make your changes and save the file.
1. Commit the modified secrets file.



---

# Old Storybook

This repo provides the tools to implement view components which make up the visual appearance of Nitro.

* Stylesheets for the app navigation and general appearance
* Self-contained React components for use in building views

The intent of this repo is to provide a base on which other UIs can be built such that they maintain visual consistency and the Nitro brand.


- [Quick Start](#quick-start)
- [Local Storybook Development in Nitro-Web](#local-storybook-development-in-nitro-web)
- [Other options for storybook in Nitro-Web](#other-options-for-storybook-in-nitro-web)
- [Getting Your Changes Into Nitro-Web](#getting-your-changes-into-nitro-web)
- [Creating Components](#creating-components)
- [Converting Existing Components](#converting-existing-components)


## Quick Start
From the current project directory, run:

1. ensure you are running proper node version (see `package.json` => `engines`)
2. `yarn install`
3. `yarn run storybook`
4. navigate to [localhost:9001](http://localhost:9001)

---

## Local Storybook Development in Nitro-Web
Its easy to create and test out a component on nitro in real time, even with hot reload. You can point your local storybook folder as you develop it.

##### Update the storybook in the Gemfile to a local path
`gem "playbook", :path => "/path/to/storybook/locally"`

##### Update the storybook in package.json to a local path
`”nitro-storybook": "/path/to/storybook/locally"`

> if you have any problems with assets not showing try running:
`bundle exec rake assets:clobber`


---

## Other options for storybook in Nitro-Web
You’ll need to point to a something published on GitHub when your ready to deploy it. Here are some options for you:

##### Gemfile - Tag
`gem "playbook", git: "git@github.com:powerhome/nitro-styleguide.git", tag: "v1.2.1"`

##### Gemfile - SHA
`gem "playbook", git: "git@github.com:powerhome/nitro-styleguide.git", ref: "4aded"`

##### Gemfile - Branch
`gem "playbook", git: "git@github.com:powerhome/nitro-styleguide.git", branch: "branchname"`

##### package.json - Branch
`"nitro-storybook": "git+ssh://git@github.com/powerhome/nitro-storybook.git#branchname",`


---

## Getting Your Changes Into Nitro-Web

### 1. Increase your version

Check the [releases](https://github.com/powerhome/nitro-storybook/releases) and increase your version by 1 in the following files:

```
lib/playbook/version.rb
package.json
```

Be sure and run the following anytime you version up:

`yarn install && bundle install`


### 2. Prep a Storybook PR

Get your `nitro-storybook` PR approved and merged into the `nitro-storybook`'s `master` branch.

### 3. Create a Tag & Release

Once your merged you need to create a tag so we can reference this version. Here are some easy ways to create and delete tags:

##### Add A Tag
```
git tag v1.0.1
git push origin v1.0.1
```

##### Remove A Tag
```
git tag -d v1.0.1
git push --delete origin v1.0.1
```

### 4. Update references in Nitro Web

##### Package.json
`"nitro-storybook": "git+ssh://git@github.com/powerhome/nitro-storybook.git#v1.9.2",`

##### Gemfile (Usually 4 Spots)
```
gem "playbook", git: "git@github.com:powerhome/nitro-storybook.git", tag: "v1.9.2"
```

If your updated styling doesn’t show up, you may have old assets you need to remove.
`bundle exec rake assets:clobber`

---

## Creating Components

Creation of new components requires a bit of forethought. Ask yourself these questions first:

1. Does the component already exist in `nitro_react` ?
    1. Yes - see [Converting Existing Components](#converting-existing-components)
    1. No - continue
1. Ensure you are familiar with these concepts:
    - using Flow.js (install tooling in your editor/IDE)
    - creating "dumb components" in React - your new component **will not** need to be concerned with XHR requests, servers, ect.
    - ESLint (install tooling in your editor/IDE)
    - CSSModules
    - Composing complex React components/organisms (so that you don't create them here!)
    - [Storybook]()

### New React Component

Here are the steps to creating a new `Foo` component (in order):

1. Create a new directory under `/components` named `Foo`
1. Create `Foo.jsx` inside the directory with the contents:
    ```javascript
    /* @flow */

    import React from 'react'

    type Props = {}

    export default class Foo extends React.Component<Props> {
      static defaultProps = {}
      props: Props
      render() {
        return <span>{`I'm a Foo`}</span>
      }
    }

    ```
1. Create `styles.scss` inside the directory with the contents:
    ```scss
    .foo {}
    ```
1. Add the stylesheet as an import by adding this line:
    ```javascript
    import styles from './styles.scss'
    ```
1. Then make use of the import by adding `styles.foo` as the `className`:
    ```javascript
    render() {
      return <span className={styles.foo}>{`I'm a Foo`}</span>
    }
    ```
1. Add `Foo.jsx` to the component index in `components/index.js`
    ```javascript
    export Foo from './Foo/Foo.jsx'
    ```

#### Create the Story

1. Within the same directory, create a `FooStory.jsx` with the contents:
    ```javascript
    import React from "react"
    import Foo from "./Foo"

    import { text, select, boolean } from "@storybook/addon-knobs"

    export default function FooStory(stories) {
      stories.add("Foo",
        () => {
          let props = {}
          return (
            <Foo {...props}/>
          )
        }
      )
    }
    ```
1. Add the story to the appropriate story index. This will depend on the intent of your component. `Foo` is pretty simply 😁, hence we will add it to `/stories/basic.js` like so:
    ```javascript
    export FooStory from '../components/Foo/FooStory'
    ```
    This will add your `Foo` story to the categoy "Basic Components" in Storybook

---

## Converting Existing Components

Conversion of existing components in `nitro_react` is a little different since we already have a decent class structure in the jsx component. There are, however, a few considerations:

- Use Flow.js types instead of `PropTypes`
- use `class` instead of `function` (see the examples below)
- Try and fix as many eslint and Flow warnings as possible - this is your chance and the time is now! 😬 💀

1. Create a `Props` flow type
    ```javascript
    type Props = {
      children?: Array<React.Node>,
      bold: boolean,
      italic: boolean,
      className: string,
    }
    ```
1. Add the type to your class
    ```javascript
    export default class Foo extends React.Component<Props> {
      static defaultProps = {}
      props: Props
      ...
    ```
1. You can still deconstruct `this.props` in any of your methods in the normal way
    ```javascript
    const {bar} = this.props
    ```
1. Lint your code `yarn run lint`
1. For some lint warning you can `yarn run lint-fix` which will automagically fix things like indentation.
