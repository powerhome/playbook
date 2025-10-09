# Playbook Website

Rails application that serves the Playbook Design System documentation and component library.

## Prerequisites

- Docker Desktop (recommended for local development)
- OR: Ruby 3.3.0, Node.js 22.x, Yarn 1.22.x, MySQL 8.0

## Quick Start with Docker (Recommended)

### 1. Build and Start

```bash
# From the project root (playbook/)
cd playbook-website
bin/docker_dev build
bin/docker_dev start
```

The website will be available at **http://localhost:8089**

### 2. View Logs

```bash
bin/docker_dev logs
```

Press `Ctrl+C` to stop viewing logs (containers keep running).

### 3. Stop the Environment

```bash
bin/docker_dev stop
```

## Docker Development Commands

The `bin/docker_dev` script provides convenient commands:

```bash
# Build Docker images
bin/docker_dev build

# Start development environment
bin/docker_dev start

# Stop development environment
bin/docker_dev stop

# Restart environment
bin/docker_dev restart

# View logs (Ctrl+C to exit, containers keep running)
bin/docker_dev logs

# Open bash shell in web container
bin/docker_dev shell

# Run Rails commands
bin/docker_dev rails console
bin/docker_dev rails db:migrate
bin/docker_dev rails routes

# Open MySQL console
bin/docker_dev db_console

# Reset database (drop, create, migrate)
bin/docker_dev db_reset

# Remove containers and volumes
bin/docker_dev clean
```

## Local Development without Docker

### 1. Install Dependencies

```bash
# From project root
./setup.sh

# Or manually:
cd playbook
bundle install
yarn install
yarn release

cd ../playbook-website
bundle install
```

### 2. Setup Database

```bash
# Make sure MySQL is running locally
bin/rails db:create db:migrate
```

### 3. Start the Server

```bash
bin/rails server
```

Visit **http://localhost:3000**

## Development Workflow

### Making Changes

1. Code changes in `app/` are automatically reflected (no restart needed)
2. Changes to routes, initializers, or gems require a restart:
   ```bash
   bin/docker_dev restart
   ```

### Running Tests

```bash
# In Docker
bin/docker_dev rails spec

# Or locally
bundle exec rspec
```

### Database Operations

```bash
# Create migration
bin/docker_dev rails generate migration AddFieldToTable

# Run migrations
bin/docker_dev rails db:migrate

# Rollback
bin/docker_dev rails db:rollback

# Reset and seed
bin/docker_dev db_reset
```

### Rails Console

```bash
# In Docker
bin/docker_dev rails console

# Or if inside the container
bin/docker_dev shell
cd playbook-website
bin/rails console
```

## Project Structure

```
playbook-website/
├── app/
│   ├── components/          # Playbook component implementations
│   ├── controllers/         # Rails controllers
│   ├── helpers/            # View helpers
│   ├── javascript/         # Vite/JS/React code
│   └── views/              # ERB templates
├── config/
│   ├── deploy/             # Kubernetes deployment configs
│   ├── database.yml        # Database configuration
│   └── routes.rb           # Application routes
├── db/                     # Database migrations
├── lib/                    # Library code (PbDocHelper, etc.)
├── bin/
│   ├── docker_dev          # Docker development helper
│   └── setup_docker        # Automated setup script
└── public/                 # Static assets
```

## Configuration

### Environment Variables

The following environment variables can be set in `docker-compose.dev.yml` or your local environment:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_HOST` | MySQL host | `db` (Docker) or `localhost` |
| `DATABASE_USER` | MySQL user | `root` |
| `DATABASE_PASSWORD` | MySQL password | `password` |
| `DATABASE_NAME` | Database name | `playbook_website_dev` |
| `RAILS_ENV` | Rails environment | `development` |
| `SECRET_KEY_BASE` | Secret key | Auto-generated in dev |

### Docker Configuration

- `docker-compose.yml` - Base configuration
- `docker-compose.dev.yml` - Development overrides
- `Dockerfile` - Multi-stage build for production

## Troubleshooting

### Port 8089 already in use

```bash
# Stop the environment
bin/docker_dev stop

# Or change the port in docker-compose.yml
ports:
  - "8090:3000"  # Change 8090 to desired port
```

### Database connection errors

```bash
# Reset the database
bin/docker_dev db_reset

# Or check if MySQL is running
docker compose -f docker-compose.yml -f docker-compose.dev.yml ps
```

### Changes not appearing

```bash
# Restart the environment
bin/docker_dev restart

# Or rebuild if dependencies changed
bin/docker_dev build
bin/docker_dev start
```

### Container won't start

```bash
# Check logs
bin/docker_dev logs

# Clean and rebuild
bin/docker_dev clean
bin/docker_dev build
bin/docker_dev start
```

### Permission errors in Docker

```bash
# The container runs as user 9999 (app)
# If you see permission errors, you may need to fix ownership:
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec web chown -R 9999:9999 /home/app/src
```

## Performance Notes

### Memory Usage

The application can be memory-intensive when rendering kit category pages with many examples. For local development:

- **Recommended:** 4GB+ RAM allocated to Docker Desktop
- **Minimum:** 2GB RAM

If experiencing OOM errors locally, increase Docker Desktop memory allocation in Settings → Resources.

### Build Cache

Docker uses BuildKit caching to speed up builds:
- Gem cache: Persisted across builds
- Yarn cache: Persisted across builds
- First build: ~10-15 minutes
- Subsequent builds: ~2-5 minutes

### Architecture

The Docker images are built for **linux/amd64** (x86_64) architecture for consistency across environments. If you're on Apple Silicon (M1/M2/M3), Docker will automatically use Rosetta emulation.

## Testing in Review Environments

To test changes without pushing to a PR:

1. Build locally with Docker
2. Test thoroughly at http://localhost:8089
3. Optionally run the test suite
4. Push to PR for review environment deployment

## Deployment

Deployment is handled automatically via Jenkins when pushing to:
- `master` branch → Production
- PR branches → Review environments (`playbook-pr####` namespaces)

See `config/deploy/` for Kubernetes configurations.

## Additional Resources

- [Playbook Documentation](https://playbook.powerapp.cloud)
- [Main Playbook README](../playbook/README.md)
- [Deployment Guide](../docs/README.md)

## Ruby Version

This project uses Ruby 3.3.0 (see `.ruby-version`)

## System Dependencies

- MySQL 8.0
- Node.js 22.x
- Yarn 1.22.x
- Bundler 2.5.3

## Getting Help

- Check existing issues in the repository
- Review the Playbook documentation
- Ask in the team's Slack channel
