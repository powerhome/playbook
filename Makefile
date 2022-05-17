TTY:=$(shell [ -t 0 ] && echo 1)

ifdef TTY
	INTERACTIVE = --interactive
	AWS_CREDS_MOUNT = --mount type=bind,source=$(HOME)/.aws/credentials,destination=/root/.aws/credentials,readonly
endif

DEPLOYER_IMAGE = image-registry.powerapp.cloud/app/deployer:master-467d8015ffc91fc62c347367db792bb6de0eeea8-1439
DEPLOYER_MOUNTS = ${AWS_CREDS_MOUNT} --mount type=bind,source=$(HOME)/.kube,destination=/root/.kube --mount type=bind,source=$(shell pwd),destination=/app --env BUILD_DEPS_AND_PACKAGE=false
RUN_DEPLOYER = docker run --tty ${INTERACTIVE} --env AWS_ACCESS_KEY_ID --env AWS_SECRET_ACCESS_KEY --rm --env BUILD_DEPS_AND_PACKAGE=false ${DEPLOYER_MOUNTS} ${DEPLOYER_IMAGE}

start:
	docker-compose up

build:
	docker-compose build

bundle:
	docker-compose run web bundle

yarn:
	docker-compose run web yarn

install:
	make yarn && make bundle

it:
	make install && make start

test:
	docker-compose run web bin/test

shell:
	docker-compose run web /bin/bash --login

console:
	docker-compose run web bin/rails console

stop:
	docker-compose down

clean:
	docker-compose down --rmi all --volumes

deploy:
	${RUN_DEPLOYER} /app/bin/deploy ${environment} ${revision} ${tag} ${cluster}

secrets:
	${RUN_DEPLOYER} bash --login

changelog:
	docker-compose run web bundle exec github_changelog_generator