#!/usr/bin/env groovy

node('docker') {
  def appImage
  def tag

  stage('Build') {
    def scmVars = checkout scm
    tag = "${env.BRANCH_NAME.replaceAll('/', '_')}-${scmVars.GIT_COMMIT}-${env.BUILD_ID}"
    appImage = docker.build("docker-registry.powerhrg.com/tools/playbook:${tag}")
  }

  stage('Test') {
    sh "docker run --tty --rm --env-file .env ${appImage.id} bin/rake"
  }

  stage('Deploy') {
    appImage.push()
    withCredentials([file(credentialsId: 'gpg-key', variable: 'PRIVATE_KEY_FILE')]) {
      sh "gpg --import $PRIVATE_KEY_FILE || true"
    }
    sh "helm lint --strict ./charts/playbook || true"
    if (env.BRANCH_NAME == 'master') {
      appImage.push('latest')
      sh "make deploy environment=staging tag=${tag}"
      sh "make deploy environment=production tag=${tag}"
    }
  }
}
