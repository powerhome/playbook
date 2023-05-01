placeYarnConfig:
	playbook-website/bin/deployer sops --decrypt --output yarn.secrets.dec.env yarn.secrets.env

start:
	docker compose up

build: placeYarnConfig
	docker compose build

bundle:
	docker compose run web bundle

yarn: placeYarnConfig
	docker compose run web yarn

install:
	make yarn && make bundle

it:
	make install && make start

test: placeYarnConfig
	docker compose run web bin/test

shell: placeYarnConfig
	docker compose run web /bin/bash --login

console: placeYarnConfig
	docker compose run web bin/rails console

stop:
	docker compose down

clean:
	docker compose down --rmi all --volumes

changelog: placeYarnConfig
	docker compose run web bundle exec github_changelog_generator

reviewRailsConsole:
	playbook-website/bin/deployer bash -lc "playbook-website/bin/remote_exec --time-to-live $(time-to-live) --cluster $(review_cluster) --namespace nitro-web-pr$(pr) bundle exec rails console"
