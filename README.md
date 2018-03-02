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
