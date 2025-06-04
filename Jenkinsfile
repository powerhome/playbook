#!/usr/bin/env groovy

library 'github.com/powerhome/ci-kubed@v9.0.0'

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
    files: ["docker-compose.yml", "docker-compose.ci.yml"]
  ) { compose ->
    stage('Image Build') {
      compose.bake(bakeFiles: ['docker-bake.hcl'], remoteConfig: [
        resourceQuota: [
            requests: [
                cpu: '2',
                memory: '10Gi',
            ],
            limits: [
                memory: '10Gi',
            ]
        ],
        storageConfig: [
          size: '15Gi',
        ],
      ])
    }

    stage('Test') {
      shell "docker compose run --workdir /home/app/src/playbook web ./test.sh"
    }
  }
}
