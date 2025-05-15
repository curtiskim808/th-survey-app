namespace :db do
  desc "Reset and seed the database with default values"
  task reset_and_seed: :environment do
    Rake::Task["db:drop"].invoke
    Rake::Task["db:create"].invoke
    Rake::Task["db:migrate"].invoke
    Rake::Task["db:seed"].invoke
    puts "Database reset and seeded successfully!"
  end
end
