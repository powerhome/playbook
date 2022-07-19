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
  def appRepo = "image-registry.powerapp.cloud/playbook/playbook"
  def commitHash, scmVars, tag

  stage('Code Checkout') {
    scmVars = checkout scm
    commitHash = git.triggeringCommit(scmVars)
    tag = "${env.BRANCH_NAME.replaceAll('/', '_')}-${commitHash}-${env.BUILD_ID}"
  }

  app.dockerStage('Build Docker Image') {
    try {
      github.setImageBuildState(scmVars, 'PENDING')
      sh "docker build --tag ${appRepo}:${tag} --tag ${appRepo}:${commitHash} ."
      sh "docker push ${appRepo}:${tag}"
      sh "docker push ${appRepo}:${commitHash}"
      github.setImageBuildState(scmVars, 'SUCCESS')
    } catch(e) {
      github.setImageBuildState(scmVars, 'FAILURE')
      throw e
    }
  }

  app.dockerStage('Test') {
    sh "docker run --tty --rm -w=/home/app/src/playbook ${appRepo}:${tag} ./test.sh"
  }
}
