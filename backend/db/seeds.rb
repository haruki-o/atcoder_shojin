# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Contest.create([
  {
    contest_name: 'test_contest',
    user_name: 'ogawakun_test', 
    password: 'test_password',
    perf_system: 1
  },
  {
    contest_name: 'test2_contest',
    user_name: 'ogawakun2_test', 
    password: 'test2_password',
    perf_system: 2
  }
]
)