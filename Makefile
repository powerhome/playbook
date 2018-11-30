TTY:=$(shell [ -t 0 ] && echo 1)

ifdef TTY
	INTERACTIVE = --interactive
endif

DEPLOYER_IMAGE = quay.io/powerhome/deployer:master-6be5bc480c8afa8a1036cea4679616e2a97ebc6a-231
DEPLOYER_MOUNTS = --mount type=bind,source=$(HOME)/.kube,destination=/root/.kube --mount type=bind,source=$(shell pwd),destination=/app --env BUILD_DEPS_AND_PACKAGE=false
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
	${RUN_DEPLOYER} helm-wrapper upgrade --install --wait playbook-$(environment) /app/charts/playbook --namespace playbook-$(environment) -f /app/config/deploy/$(environment)/secrets.yaml -f /app/config/deploy/$(environment)/values.yaml --set image.tag=$(tag) --kube-context=$(cluster)

deploydiff:
	${RUN_DEPLOYER} helm-wrapper diff upgrade playbook-$(environment) /app/charts/playbook -f /app/config/deploy/$(environment)/secrets.yaml -f /app/config/deploy/$(environment)/values.yaml --set image.tag=$(tag) --kube-context=$(cluster) --allow-unreleased

secrets:
	${RUN_DEPLOYER} bash --login
