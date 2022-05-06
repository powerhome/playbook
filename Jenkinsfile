#!/usr/bin/env groovy

library identifier: 'ci-kubed@v4.0.1', retriever: modernSCM([
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
  def scmVars
  def appImage

  stage('Code Checkout') {
    scmVars = checkout scm
    appImage = "image-registry.powerapp.cloud/playbook/playbook:${git.triggeringCommit(scmVars)}"
  }

  app.dockerStage('Build Docker Image') {
    buildDockerImage(scmVars, appImage)
  }

  app.dockerStage('Test') {
    testLibrary(appImage)
  }
}

def buildDockerImage(scmVars, appImage) {
  withCredentials([
    usernamePassword(
      credentialsId: 'app-registry-global',
      usernameVariable: 'APP_REGISTRY_USERNAME',
      passwordVariable: 'APP_REGISTRY_PASSWORD'
    )
  ]) {
    // https://issues.jenkins.io/browse/JENKINS-59777
    sh "docker login https://image-registry.powerapp.cloud -u $APP_REGISTRY_USERNAME -p $APP_REGISTRY_PASSWORD"
  }
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

def testLibrary(appImage) {
  sh "docker run --tty --rm -w=/home/app/src/playbook ${appImage} ./test.sh"
}
