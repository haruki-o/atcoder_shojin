require 'net/http'
require 'uri'
require 'time'

namespace :atcoder_problem do
  desc "get submission data"
  task user_submission: :environment do
    # UserSubmission.get(Time.now.to_i-30)
    uri = URI("https://kenkoooo.com/atcoder/resources/problem-models.json")
    item = Net::HTTP.get_response(uri)
    puts Time.now
    puts Time.now.to_i

    JSON.load(item.body).each {|key, value|
      if value["difficulty"] != nil then
        puts "contestId: #{key}, diff: #{value["difficulty"]}"
        @contest = Api.create(
          contestId: key,
          diff: value["difficulty"]
        )
      end
    }
  end
end
