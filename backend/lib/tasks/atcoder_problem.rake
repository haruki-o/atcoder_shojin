require 'net/http'
require 'uri'
require 'time'

namespace :atcoder_problem do
  desc "get submission data"
  task user_submission: :environment do
    UserSubmission.get(Time.now.to_i-30)
  end
end
