TTY:=$(shell [ -t 0 ] && echo 1)

ifdef TTY
	INTERACTIVE = --interactive
endif

RUN_DEPLOYER = docker run --tty ${INTERACTIVE} --rm --volume ~/.kube:/root/.kube --volume ~/.gnupg/secring.gpg:/root/.gnupg/secring.gpg --volume ~/.gnupg/pubring.gpg:/root/.gnupg/pubring.gpg --volume ~/.gnupg/private-keys-v1.d:/root/.gnupg/private-keys-v1.d --volume $(shell pwd):/app
DEPLOYER_IMAGE = docker-registry.powerhrg.com/platform/deployer:master-6cf477240dd6b4f180f0f8da980805ddf6fc4fe0-18

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
