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
        current_user.exercise.create(name: params.name, reps: params.reps, duration: params.duration, calories_burnt: params.calories_burnt)
    end

    def show
        render :json => {"exercise"=>current_user.exercise}
    end

    def edit
        render :json => {"exercise"=>current_user.exercise}
    end

    def update
        render :json => {"exercise"=>current_user.exercise}

        if exercise.update(exercise_params)
            redirect_to @exercise
        else
            render 'edit'
    end

    def destroy
        render :json => {"exercise"=>current_user.exercise}
        exercise.destroy

        redirect_to exercise_path
    end

  private

    def exercise_params
      params.require(:exercise).permit(:name, :exercise_ids => [])
    end

end