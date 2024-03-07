#!/usr/bin/env groovy

library 'github.com/powerhome/ci-kubed@v6.10.1'

app.build(
  resources: [
    requestCpu: '2',
    requestMemory: '10Gi',
    limitMemory: '10Gi',
  ],
  timeout: 40,
) {
  app.composeBuild(
    appRepo: "image-registry.powerapp.cloud/playbook/playbook",
    files: ["docker-compose.yml", "docker-compose.ci.yml"],
    bakeFiles: ['docker-bake.hcl']
  ) { compose ->
    stage('Image Build') {
      compose.bake()
    }

    stage('Test') {
      compose.command "run --workdir /home/app/src/playbook web ./test.sh"
    }
  }
}
