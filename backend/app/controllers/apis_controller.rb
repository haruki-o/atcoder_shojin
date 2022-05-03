class ApisController < ApplicationController
  # GET /apis
  def index
    # @contests = Contest.all
    @problems = ProblemApi.all
    render json: @problems
  end
end
