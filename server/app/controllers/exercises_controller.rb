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

    def new
      render :json => {
        "user info"=>current_user.id,
        "exercise"=>current_user.exercise
    }
    end

    def create
    end

    def edit
    end

    def update
    end

    def destroy
    end

  private

    def exercise_params
      params.require(:exercise).permit(:name, :exercise_ids => [])
    end

end