namespace :db do
  task exists: :environment do
    ActiveRecord::Base.connection
    exit 0
  rescue ActiveRecord::NoDatabaseError
    exit 1
  end
end
