class HistoriesController < ApplicationController
  def index
    @contest = History.find_by(
      contest_name: params[:contest_name], 
      time: params[:time].to_i)
    render json: @contest
  end

  def find 
    @contest = History.where(contest_name: params[:contest_name])
    render json: @contest
  end

  # POST /history
  def create
    @contest = History.new({
      contest_name: params[:contest_info][:contest_name],
      time: params[:contest_info][:time],
      problemA: params[:problems][0][:contest_id],
      problemB: params[:problems][1][:contest_id],
      problemC: params[:problems][2][:contest_id],
      problemD: params[:problems][3][:contest_id],
      problemE: params[:problems][4][:contest_id],
      problemF: params[:problems][5][:contest_id],
      problemG: params[:problems][6][:contest_id],
      problemH: params[:problems][7][:contest_id],
      problemI: params[:problems][8][:contest_id],
      problemJ: params[:problems][9][:contest_id],
      start_date: "#{params[:contest_info][:startDate]} #{params[:contest_info][:startHour]}:#{params[:contest_info][:startMinute]}:00",
      end_date: "#{params[:contest_info][:endDate]} #{params[:contest_info][:endHour]}:#{params[:contest_info][:endMinute]}:00"
    })
    if @contest.save
      render json: @contest, status: :created, location: @contest
    else
      render json: @contest.errors, status: :unprocessable_entity
    end
  end

  def all 
    @contest = History.all
    render json: @contest
  end
  private
    # Only allow a list of trusted parameters through.
    def contest_params
      params.require(:contest).permit(:contest_name, :user_name, :password, :perf_system)
    end
    def history_params
      params.require(:contest_info).permit(:contest_name, :time)
    end
end
