# Playbook Website - Development Makefile
# Quick commands for common development tasks

.PHONY: help build start stop restart logs shell console db_reset clean test

help: ## Show this help message
	@echo "Playbook Website Development Commands"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

build: ## Build Docker images
	@bin/docker_dev build

start: ## Start development environment
	@bin/docker_dev start

stop: ## Stop development environment
	@bin/docker_dev stop

restart: ## Restart development environment
	@bin/docker_dev restart

logs: ## Show container logs
	@bin/docker_dev logs

shell: ## Open bash shell in web container
	@bin/docker_dev shell

console: ## Open Rails console
	@bin/docker_dev rails console

db_reset: ## Reset database (drop, create, migrate)
	@bin/docker_dev db_reset

db_console: ## Open MySQL console
	@bin/docker_dev db_console

migrate: ## Run database migrations
	@bin/docker_dev rails db:migrate

test: ## Run test suite
	@bin/docker_dev rails spec

clean: ## Remove containers and volumes
	@bin/docker_dev clean

# Convenience aliases
up: start ## Alias for start
down: stop ## Alias for stop

