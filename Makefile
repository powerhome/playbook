TTY:=$(shell [ -t 0 ] && echo 1)

ifdef TTY
	INTERACTIVE = --interactive
	AWS_CREDS_MOUNT = --mount type=bind,source=$(HOME)/.aws/credentials,destination=/root/.aws/credentials,readonly
endif

DEPLOYER_IMAGE = quay.io/powerhome/deployer:master-c94bf553840b07335fbb8904d5a9963dd5ffce00-336
DEPLOYER_MOUNTS = ${AWS_CREDS_MOUNT} --mount type=bind,source=$(HOME)/.kube,destination=/root/.kube --mount type=bind,source=$(shell pwd),destination=/app --env BUILD_DEPS_AND_PACKAGE=false
RUN_DEPLOYER = docker run --tty ${INTERACTIVE} --env AWS_ACCESS_KEY_ID --env AWS_SECRET_ACCESS_KEY --rm --env BUILD_DEPS_AND_PACKAGE=false ${DEPLOYER_MOUNTS} ${DEPLOYER_IMAGE}

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
	${RUN_DEPLOYER} /app/bin/deploy ${environment} ${revision} ${tag} ${cluster}

secrets:
	${RUN_DEPLOYER} bash --login
