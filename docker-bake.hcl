variable "TAG" {
  default = "local"
}

group "default" {
  targets = ["playbook"]
}

target "playbook" {
  inherits = ["web"]
  target = "prod"
}

target "playbook-mcp" {
  context = "."
  dockerfile = "playbook-mcp/Dockerfile"
  tags = [
    "image-registry.powerapp.cloud/playbook/playbook-mcp:${TAG}",
  ]
}
