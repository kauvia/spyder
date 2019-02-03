class StatsController < ApplicationController
    before_action :authenticate_user!

    def index
      p current_user.food
      p current_user.stat
      render :json => {
        "hello"=>"world",
        "exercise"=>current_user.exercise,
        "food"=>current_user.food
    }
    end

end