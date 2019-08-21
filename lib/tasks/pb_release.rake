namespace :pb_release do

  desc "Update the version number in preparation to release"
  task version: :environment do
    old_version = Playbook::VERSION
    new_version = ''
    STDOUT.puts "What would you like the next release number to be? Currently #{old_version}"
    new_version = STDIN.gets.chomp

    puts "Ok great, let's make version #{new_version}"
    puts "\n\n"

    # Update package.json
    puts "Opening package.json"
    package = File.read("package.json")
    new_package = package.gsub(/"version": "#{old_version}",/, "\"version\": \"#{new_version}\",")
    File.open("package.json", "w") {|file| file.puts new_package }
    puts "Updated package.json"

    # Update version.rb
    puts "Opening lib/playbook/version.rb"
    version_rb = File.read("lib/playbook/version.rb")
    new_version_rb = version_rb.gsub(/VERSION = "#{old_version}".freeze/, "VERSION = \"#{new_version}\".freeze")
    File.open("lib/playbook/version.rb", "w") {|file| file.puts new_version_rb }
    puts "Updated lib/playbook/version.rb"

    # Update gemfile.lock
    puts "Opening gemfile.lock"
    gemfile = File.read("gemfile.lock")
    new_gemfile = gemfile.gsub(/playbook_ui (#{Regexp.escape(old_version)})/, "playbook_ui (#{Regexp.escape(new_version)})")
    File.open("gemfile.lock", "w") {|file| file.puts new_gemfile }
    puts "Updated gemfile.lock"
    puts "\n\n"

    puts "Commit your changes and create a PR to merge to master"
  end

  desc "TODO"
  task push: :environment do
  end

end
