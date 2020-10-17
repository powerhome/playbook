#!/usr/bin/env groovy

library identifier: 'ci-kubed@v4.0.0', retriever: modernSCM([
  $class: 'GitSCMSource',
  remote: 'git@github.com:powerhome/ci-kubed.git',
  credentialsId: 'powerci-github-ssh-key'
])

app.build(
  resources: [
    requestCpu: '1',
    limitCpu: '2',
    requestMemory: '2Gi',
    limitMemory: '4Gi',
  ]
) {
  def scmVars
  def appImage

  stage('Code Checkout') {
    scmVars = checkout scm
    appImage = "quay.io/powerhome/playbook:${git.triggeringCommit(scmVars)}"
  }

  app.dockerStage('Build Doc App') {
    buildDocApp(scmVars, appImage)
  }

  app.dockerStage('Test') {
    testDocApp(appImage)
  }
}

def buildDocApp(scmVars, appImage) {
  dir("playbook") {
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
}

def testDocApp(appImage) {
  dir("playbook") {
    sh "docker run --tty --rm ${appImage} bin/test"
  }
}
