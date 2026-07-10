# frozen_string_literal: true

require "playbook/connect_message_generator"

desc "Format the latest CHANGELOG.md release into a Connect message markdown file"
task :connect do
  Playbook::ConnectMessageGenerator.run!
end
