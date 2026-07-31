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
  tags = ["playbook-mcp:local"]
}
