#!/usr/bin/env groovy

library identifier: 'ci-kubed@20220718-docker-compose', retriever: modernSCM([
  $class: 'GitSCMSource',
  remote: 'git@github.com:powerhome/ci-kubed.git',
  credentialsId: 'powerci-github-ssh-key'
])

app.build(
  resources: [
    requestCpu: '1',
    limitCpu: '2',
    requestMemory: '5Gi',
    limitMemory: '8Gi',
  ]
) {
  app.composeBuild(
    workflow: this,
    projectName: "playbook",
    appRepo: "image-registry.powerapp.cloud/playbook/playbook",
    files: ["docker-compose.yml", "docker-compose.ci.yml"]
  ) { compose ->
    stage('Image Build') {
      compose.buildAndPush()
    }

    stage('Test') {
      compose.up()
      compose.exec "web", "./test.sh"
    }
  }
}
