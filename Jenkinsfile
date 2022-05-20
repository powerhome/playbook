#!/usr/bin/env groovy

library identifier: 'ci-kubed@v5.0.0', retriever: modernSCM([
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
  def application = "playbook"
  def registry = "image-registry.powerapp.cloud"
  def scmVars
  def appImage

  stage('Code Checkout') {
    scmVars = checkout scm
    tag = "${env.BRANCH_NAME.replaceAll('/', '_')}-${scmVars.GIT_COMMIT}-${env.BUILD_ID}"
    appImage = "${registry}/${application}/${application}:${tag}"
  }


  app.dockerStage('Build Docker Image') {
    buildDockerImage(scmVars, appImage, registry)
  }

  app.dockerStage('Test') {
    testLibrary(appImage)
  }
}

def buildDockerImage(scmVars, appImage, registry) {
  try {
    github.setImageBuildState(scmVars, 'PENDING')
    sh "docker build -t ${appImage} -t {app-image}-master ."
    sh "docker push ${appImage}"
    sh "docker push ${registry}:${scmVars.GIT_COMMIT}"
    github.setImageBuildState(scmVars, 'SUCCESS')
  } catch(e) {
    github.setImageBuildState(scmVars, 'FAILURE')
    throw e
  }
}

def testLibrary(appImage) {
  sh "docker run --tty --rm -w=/home/app/src/playbook ${appImage} ./test.sh"
}
