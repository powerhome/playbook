#!/usr/bin/env groovy

library 'github.com/powerhome/ci-kubed@v5.8.1'

app.build(
  resources: [
    requestCpu: '1',
    limitCpu: '2',
    requestMemory: '10Gi',
    limitMemory: '10Gi',
  ]
) {
  app.composeBuild(
    workflow: this,
    projectName: "playbook",
    appRepo: "image-registry.powerapp.cloud/playbook/playbook",
    files: ["docker-compose.yml", "docker-compose.ci.yml"]
  ) { compose ->

    withCredentials([
      usernamePassword(
        credentialsId: 'playbook-ci-build-aws-creds',
        usernameVariable: 'AWS_ACCESS_KEY_ID',
        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
      )
    ]) {
      sh "mkdir -p ~/.kube"
      sh "bin/container/deployer sops --config .sops.yaml --decrypt ./config/ci/secrets.yaml > ./config/ci/secrets.dec.yaml"
    }

    stage('Image Build') {
      compose.buildAndPush()
    }

    stage('Test') {
      compose.command "run --workdir /home/app/src/playbook web ./test.sh"
    }
  }
}
