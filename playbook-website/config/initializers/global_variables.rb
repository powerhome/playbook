# frozen_string_literal: true

MENU = YAML.load_file(Playbook::Engine.root.join("app/pb_kits/playbook/data/menu.yml"))
SAMPLES = YAML.load_file(Rails.root.join("config/samples.yml"))
