group "default" {
  targets = ["playbook"]
}

target "playbook" {
  inherits = ["web"]
  target = "prod"
  secret = ["id=yarnenv,src=yarn.secrets.dec.env"]
}
