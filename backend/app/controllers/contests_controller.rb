class ContestsController < ApplicationController
  before_action :set_contest, only: [:show, :destroy]

  # GET /contests
  def index
    @contests = Contest.all
    render json: @contests
  end
  
  # POST /contests
  def create
    puts contest_params
    @contest = Contest.new(contest_params)
    if @contest.save
      render json: @contest
    else
      render json: @contest.errors, status: :unprocessable_entity
    end
  end

  #PATCH/PUT /contest_page/:contest
  def update
    @contest = Contest.find_by(contest_name: params.keys[0])
    # @contest.increment(:time, 1)
    puts json: @contest
    puts @contest[:time]
    puts '-----------------'
    if @contest.update(time: @contest[:time] + 1)
      render json: @contest
    else
      render json: @contest.errors
    end
  end

  # DELETE /contests/1
  def destroy
    @contest.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contest
      @contest = Contest.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def contest_params
      params.require(:contest).permit(:contest_name, :user_name, :password, :perf_system, :time)
    end
end
