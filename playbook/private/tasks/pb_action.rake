# frozen_string_literal: true

namespace :pb_release do
    desc "Update the version number in preparation to release"
    task :action, [:new_version] do |task, args|
        new_version = args[:new_version]
        old_version = Playbook::VERSION
        version_rb = File.read("lib/playbook/version.rb")
        old_version_rb = version_rb.gsub(/PREVIOUS_VERSION\s=\s"\w{1,3}.\w{1,3}.\w{1,3}"/, "PREVIOUS_VERSION = \"#{old_version}\"")
        new_version_rb = old_version_rb.gsub(/\sVERSION\s=\s"\w{1,3}.\w{1,3}.\w{1,3}"/, " VERSION = \"#{new_version}\"")
        puts new_version_rb
        puts "Updated lib/playbook/version.rb"
    end
end
