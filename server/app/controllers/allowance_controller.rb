class AllowanceController < ApplicationController
    before_action :authenticate_user!

  
    def index
      render json: { 'stat' => current_user.stat.order(created_at: :desc).limit(1), 'exercise' => current_user.exercise.where("created_at >= ?",DateTime.now.at_beginning_of_day.utc), 'food' => current_user.food.where("created_at >= ?", DateTime.now.at_beginning_of_day.utc) }
    end
    end