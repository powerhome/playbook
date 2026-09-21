#!/usr/bin/env groovy

library 'github.com/powerhome/ci-kubed@v10.6.0'

app.build(
  buildCacheVolumeSize: '20Gi',
  resources: [
    requestCpu: '2',
    requestMemory: '10Gi',
    limitMemory: '10Gi',
  ],
  timeout: 40,
) {
  app.composeBuild(
    appRepo: "image-registry.powerapp.cloud/playbook/playbook",
    files: ["docker-compose.yml", "docker-compose.ci.yml"]
  ) { compose ->
    stage('Image Build') {
      // Website image via compose bake (pushed). MCP prod + test images stay
      // local until Test passes — do not push playbook-mcp:${GIT_COMMIT} here.
      compose.bake(bakeFiles: ['docker-bake.hcl'])
      shell """
        docker build -f playbook-mcp/Dockerfile \
          -t image-registry.powerapp.cloud/playbook/playbook-mcp:${env.GIT_COMMIT} \
          -t image-registry.powerapp.cloud/playbook/playbook-mcp:local \
          .
        docker build -f playbook-mcp/Dockerfile --target test \
          -t image-registry.powerapp.cloud/playbook/playbook-mcp:test \
          .
      """
    }

    stage('Test') {
      shell "docker compose run --workdir /home/app/src/playbook web ./test.sh"
      shell "docker compose run --no-deps --rm mcp ./test.sh"
    }

    stage('Push') {
      shell "docker push image-registry.powerapp.cloud/playbook/playbook-mcp:${env.GIT_COMMIT}"
    }
  }
}
