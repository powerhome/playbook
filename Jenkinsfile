#!/usr/bin/env groovy

library identifier: 'ci-kubed@v2.6.0', retriever: modernSCM([
  $class: 'GitSCMSource',
  remote: 'git@github.com:powerhome/ci-kubed.git',
  credentialsId: 'powerci-github-ssh-key'
])

def application = "playbook"
def cluster = "APP-HQ"
def deployerVersion = "master-c94bf553840b07335fbb8904d5a9963dd5ffce00-336"
def resources = [
  requestCpu: '1',
  limitCpu: '2',
  requestMemory: '4Gi',
  limitMemory: '6Gi',
]

app.build(application: application, cluster: cluster, deployerVersion: deployerVersion, resources: resources) {
  def appImage
  def tag
  def scmVars

  stage('Code Checkout') {
    scmVars = checkout scm
    tag = "${env.BRANCH_NAME.replaceAll('/', '_')}-${scmVars.GIT_COMMIT}-${env.BUILD_ID}"
    appImage = "quay.io/powerhome/${application}:${tag}"
  }

  app.dockerStage('Container Build') {
    try {
      sh "docker build -t ${appImage} ."
      sh "docker push ${appImage}"
      github.setImageBuildState(scmVars.GIT_COMMIT, scmVars.GIT_URL, 'SUCCESS')
    } catch(e) {
      github.setImageBuildState(scmVars.GIT_COMMIT, scmVars.GIT_URL, 'FAILURE')
      throw e
    }
  }

  app.dockerStage('Test') {
    sh "docker run --tty --rm ${appImage} bin/test"
  }

  app.deployerStage('Deploy', cluster) {
    withCredentials([usernamePassword(
      credentialsId: 'jenkins-app-deploy-aws-access-key',
      usernameVariable: 'AWS_ACCESS_KEY_ID',
      passwordVariable: 'AWS_SECRET_ACCESS_KEY'
    )]) {
      if (env.BRANCH_NAME == 'master') {
        sh "bin/deploy staging ${scmVars.GIT_COMMIT} ${tag} ${cluster}"
        sh "bin/deploy production ${scmVars.GIT_COMMIT} ${tag} ${cluster}"
      }
    }
  }
}
