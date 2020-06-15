#!/usr/bin/env groovy

library identifier: 'ci-kubed@v4.0.0', retriever: modernSCM([
  $class: 'GitSCMSource',
  remote: 'git@github.com:powerhome/ci-kubed.git',
  credentialsId: 'powerci-github-ssh-key'
])

app.build(
  resources: [
    requestCpu: '2',
    limitCpu: '3',
    requestMemory: '4Gi',
    limitMemory: '8Gi',
  ]
) {
  def scmVars
  def appImage

  stage('Code Checkout') {
    scmVars = checkout scm
    appImage = "quay.io/powerhome/playbook:${git.triggeringCommit(scmVars)}"
  }

  app.dockerStage('Container Build') {
    try {
      github.setImageBuildState(scmVars, 'PENDING')
      sh "docker build -t ${appImage} ."
      sh "docker push ${appImage}"
      github.setImageBuildState(scmVars, 'SUCCESS')
    } catch(e) {
      github.setImageBuildState(scmVars, 'FAILURE')
      throw e
    }
  }

  app.dockerStage('Test') {
    sh "docker run --tty --rm ${appImage} bin/test"
  }
}
