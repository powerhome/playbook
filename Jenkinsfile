#!/usr/bin/env groovy

library identifier: 'ci-kubed@deprecate-deployer-stage-method', retriever: modernSCM([
  $class: 'GitSCMSource',
  remote: 'git@github.com:powerhome/ci-kubed.git',
  credentialsId: 'powerci-github-ssh-key'
])

def cluster = "APP-HQ"
app.build(
  cluster: cluster,
  deployerVersion: "master-e4c01702624ac34f2663f894fbdb68a369b09629-588",
  resources: [
    requestCpu: '1',
    limitCpu: '2',
    requestMemory: '6Gi',
    limitMemory: '12Gi',
  ]
) {
  def application = "playbook"
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

  // This cluster MUST be the same as the cluster passed to `app.build` or weird shit
  // will happen. Deploy using Milano instead.
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
