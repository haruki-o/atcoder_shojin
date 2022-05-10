class UsersController < ApplicationController
  def index 
    @user = User.find(contest_name: params[:contest_name], time: params[:time])
    render json: @user
  end
  
  def create
    @user = User.new(user_min_params)
    puts @user
    if @user.save
      puts "success"
      render json: @user
    else
      puts "failed"
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def user_min_params
    params.require(:user).permit(:contest_name, :time, :user_name)
  end
end
