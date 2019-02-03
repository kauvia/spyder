class ExercisesController < ApplicationController
    before_action :authenticate_user!

    def index
      p current_user.id
      p current_user.stat
      render :json => {
        "user info"=>current_user.id,
        "exercise"=>current_user.exercise
    }
    end

end