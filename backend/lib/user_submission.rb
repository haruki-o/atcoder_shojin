module UserSubmission extend self
  def get(unix_time_second)
    uri =URI("https://kenkoooo.com/atcoder/atcoder-api/v3/from/#{unix_time_second}")
    item = Net::HTTP.get_response(uri)
    puts Time.now
    puts Time.now.to_i
    puts item.header
    puts JSON.load(item.body)
  end
end