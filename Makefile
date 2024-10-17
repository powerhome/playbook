SHELL=/bin/bash -o pipefail
namespace ?= playbook-${environment}

cluster=${shell playbook-website/bin/deployer playbook-website/bin/cluster_for_review_stack $(environment)}
cluster_short_name=${shell playbook-website/bin/deployer playbook-website/bin/cluster_for_review_stack $(environment) short}
review_cluster = ${shell playbook-website/bin/deployer playbook-website/bin/cluster_for_review_stack pr$(pr)}

start:
	docker compose up

build:
	docker compose build

bundle:
	docker compose run web bundle

yarn:
	docker compose run web yarn

install:
	make yarn && make bundle

it:
	make install && make start

test:
	docker compose run web bin/test

shell:
	docker compose run web /bin/bash --login

time-to-live ?= 3h
reviewShell: ## Opens a shell in the given environment (i.e.: make reviewShell pr=14166)
	./playbook-website/bin/deployer bash -lc "./playbook-website/bin/remote_exec --time-to-live $(time-to-live) --cluster $(review_cluster) --namespace playbook-pr$(pr) bash --login"

console:
	docker compose run web bin/rails console

stop:
	docker compose down

clean:
	docker compose down --rmi all --volumes

changelog:
	docker compose run web bundle exec github_changelog_generator

db:
	docker compose up -d db

time-to-live ?= 3h
review_cluster = ${shell ./playbook-website/bin/deployer ./playbook-website/bin/cluster_for_review_stack pr$(pr)}

reviewRailsConsole:
	./playbook-website/bin/deployer bash -lc "./playbook-website/bin/remote_exec --time-to-live $(time-to-live) --cluster $(review_cluster) --namespace playbook-pr$(pr) ./playbook-website/bin/rails console"
