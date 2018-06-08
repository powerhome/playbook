#!/usr/bin/env groovy

node('docker') {
  def appImage
  def tag

  stage('Build') {
    def scmVars = checkout scm
    tag = "${env.BRANCH_NAME.replaceAll('/', '_')}-${scmVars.GIT_COMMIT}-${env.BUILD_ID}"
    appImage = docker.build("quay.io/powerhome/playbook:${tag}")
  }

  stage('Test') {
    // sh "docker run --tty --rm ${appImage.id} bin/rake"
  }

  stage('Deploy') {
    appImage.push()
    sh "helm lint --strict ./charts/playbook || true"
    withCredentials([usernamePassword(
      credentialsId: 'jenkins-app-deploy-aws-access-key',
      usernameVariable: 'AWS_ACCESS_KEY_ID',
      passwordVariable: 'AWS_SECRET_ACCESS_KEY'
    )]) {
      if (env.BRANCH_NAME == 'master') {
        appImage.push('latest')
        sh "make deploy environment=staging tag=${tag}"
        sh "make deploy environment=production tag=${tag}"
      } else {
        sh "make deploydiff environment=staging tag=${tag}"
        sh "make deploydiff environment=production tag=${tag}"
      }
    }
  }
}
