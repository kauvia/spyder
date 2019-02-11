class ExercisesController < ApplicationController
    before_action :authenticate_user!

    def index
      p current_user.id
      p current_user.stat
      render :json => {
        "exercise"=>current_user.exercise.order(created_at: :desc)
    }
    end

    def new
      render :json => {
        "user info"=>current_user.id,
        "exercise"=>current_user.exercise
    }
    end

    def create
      
        item=current_user.exercise.create(name: params[:exercise][:name], reps: params[:exercise][:reps], duration: params[:exercise][:duration], calories_burnt: params[:exercise][:calories_burnt])
        item.update_attribute :created_at, params[:date]
    end

    def update
        if exercise.update(exercise_params)
            redirect_to @exercise
        else
            render 'edit'
        end

        render :json => {"exercise"=>current_user.exercise}
    end

    def destroy
        current_user.exercise.destroy(params[:id])

    end

  private

    def exercise_params
      params.require(:exercise).permit(:name, :reps, :duration, :calories_burnt, :exercise_ids => [])
    end

end