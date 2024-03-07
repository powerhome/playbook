group "default" {
  targets = ["playbook"]
}

target "playbook" {
  inherits = ["web"]
  target = "prod"
}
