class UsersController < ApplicationController
  def all
    @user = User.where(contest_name: params[:contest_name], user_name: params[:user_name])
    render json: @user
  end
  
  def index 
    @user = User.where(contest_name: params[:contest_name], time: params[:time])
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

  def update 
    puts params["user"]
    puts params["user"]["contest_name"], params["user"]["time"]
    @user = User.find_by(
      contest_name: params["user"]["contest_name"],
      time: params["user"]["time"],
      user_name: params["user"]["user_name"] 
    )
    puts params["problem"]
    puts params["user"]["performance"]
    puts "--------"
    # for i in User.column_names do
    #   if i === params["problem"]
    #     puts i
    #     if @user.update(${i}: params["ACDate"], performance: params["user"]["performance"])
    #       render json: @user
    #     else
    #       render json: @user.errors
    #     end
    #   end
    # end
    if params["problem"] === "ProblemA"
      puts "problemA"
      if @user.update(ProblemA: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemB"
      if @user.update(ProblemB: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemC"
      if @user.update(ProblemC: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemD"
      if @user.update(ProblemD: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemE"
      if @user.update(ProblemE: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemF"
      if @user.update(ProblemF: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemG"
      if @user.update(ProblemG: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemH"
      if @user.update(ProblemH: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemI"
      if @user.update(ProblemI: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
    if params["problem"] === "ProblemJ"
      if @user.update(ProblemJ: params["ACDate"], performance: params["user"]["performance"])
        render json: @user
      else
        render json: @user.errors
      end
    end
  end
  private

  # Only allow a list of trusted parameters through.
  def user_min_params
    params.require(:user).permit(:contest_name, :time, :user_name, :performance)
  end
end
