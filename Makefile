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

console:
	docker compose run web bin/rails console

stop:
	docker compose down

clean:
	docker compose down --rmi all --volumes

changelog:
	docker compose run web bundle exec github_changelog_generator
