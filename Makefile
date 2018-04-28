TTY:=$(shell [ -t 0 ] && echo 1)

ifdef TTY
	INTERACTIVE = --interactive
endif

RUN_DEPLOYER = docker run --tty ${INTERACTIVE} --rm --volume ~/.kube:/root/.kube --volume ~/.gnupg/secring.gpg:/root/.gnupg/secring.gpg --volume ~/.gnupg/pubring.gpg:/root/.gnupg/pubring.gpg --volume ~/.gnupg/private-keys-v1.d:/root/.gnupg/private-keys-v1.d --volume $(shell pwd):/app --env BUILD_DEPS_AND_PACKAGE=false
DEPLOYER_IMAGE = docker-registry.powerhrg.com/platform/deployer:master-44a3637009207ba2a319a6284b3c20f8c2d62f60-77

start:
	docker-compose up --build

build:
	docker-compose build

bundle:
	docker-compose run web bundle

test:
	docker-compose run web rake

shell:
	docker-compose run web /bin/bash --login

console:
	docker-compose run web bin/rails console

stop:
	docker-compose down

clean:
	docker-compose down --rmi all --volumes

deploy:
	${RUN_DEPLOYER} --entrypoint /bin/gpg-agent-background ${DEPLOYER_IMAGE} helm-wrapper upgrade --install --wait playbook-$(environment) /app/charts/playbook --namespace playbook-$(environment) -f /app/config/deploy/$(environment)/secrets.yaml -f /app/config/deploy/$(environment)/values.yaml --set image.tag=$(tag)

secrets:
	${RUN_DEPLOYER} --entrypoint /bin/gpg-agent-background ${DEPLOYER_IMAGE} bash --login

addKeyToRing:
	gpg --export $(fingerprint) | gpg --no-default-keyring --keyring=config/secrets.keys --import

grantSecretAccess:
	gpg --import config/secrets.keys
	$(foreach file,$(wildcard config/deploy/*/secrets.yaml),[[ $(file) == *"production"* ]] || ${RUN_DEPLOYER} --entrypoint /bin/gpg-agent-background ${DEPLOYER_IMAGE} sops --rotate --in-place --add-pgp $(fingerprint) /app/$(file) ;)
