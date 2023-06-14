group "default" {
  targets = ["playbook"]
}

target "playbook" {
  inherits = ["web"]
  secret = ["id=yarnenv,src=yarn.secrets.dec.env"]
}
