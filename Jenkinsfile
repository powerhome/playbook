#!/usr/bin/env groovy

library 'github.com/powerhome/ci-kubed@v10.6.0'

app.build(
  buildCacheVolumeSize: '20Gi',
  resources: [
    requestCpu: '2',
    requestMemory: '10Gi',
    limitMemory: '10Gi',
  ],
  timeout: 40,
) {
  app.composeBuild(
    appRepo: "image-registry.powerapp.cloud/playbook/playbook",
    files: ["docker-compose.yml", "docker-compose.ci.yml"]
  ) { compose ->
    stage('Image Build') {
      compose.bake(bakeFiles: ['docker-bake.hcl'])
    }

    stage('Test (Rails 8.1)') {
      shell "docker compose run --workdir /home/app/src/playbook web ./test.sh"
    }

    stage('Rails 7.2 Compatibility') {
      shell "docker compose run --workdir /home/app/src/playbook web bin/test-rails-compatibility"
    }

    stage('Website Test') {
      shell "docker compose run --workdir /home/app/src/playbook-website web bin/test"
    }
  }
}
