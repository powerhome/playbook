#!/usr/bin/env groovy

library 'github.com/powerhome/ci-kubed@v6.0.0'

app.build(
  resources: [
    requestCpu: '1',
    limitCpu: '2',
    requestMemory: '10Gi',
    limitMemory: '10Gi',
  ]
) {
  app.composeBuild(
    appRepo: "image-registry.powerapp.cloud/playbook/playbook",
    files: ["docker-compose.yml", "docker-compose.ci.yml"]
  ) { compose ->
    stage('Image Build') {
      withCredentials([
        usernamePassword(
          credentialsId: 'playbook-ci-build-aws-creds',
          usernameVariable: 'AWS_ACCESS_KEY_ID',
          passwordVariable: 'AWS_SECRET_ACCESS_KEY'
        )
      ]) {
        sh "mkdir -p ~/.kube"
        sh "playbook-website/bin/deployer sops --decrypt --output yarn.secrets.dec.env yarn.secrets.env"
      }

      compose.buildAndPush()
    }

    stage('Test') {
      compose.command "run --workdir /home/app/src/playbook web ./test.sh"
    }
  }
}
