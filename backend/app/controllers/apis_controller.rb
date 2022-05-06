class ApisController < ApplicationController
  # GET /apis
  def index
    # @contests = Contest.all
    @problems = Api.all
    render json: @problems
  end
end
